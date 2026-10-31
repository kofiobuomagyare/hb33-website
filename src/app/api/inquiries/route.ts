import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { contactMessageSchema, quoteInquirySchema } from "@/lib/validation";
import {
  contactEmailSubject,
  quoteEmailBody,
  quoteEmailSubject,
} from "@/lib/inquiries";
import { deliverInquiry } from "@/lib/inquiry-store";
import { site } from "@/lib/site";

function generateReference(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += alphabet[randomInt(alphabet.length)];
  return `HB33-${suffix}`;
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 8;
const rateBuckets = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateBuckets.set(ip, hits);
  if (rateBuckets.size > 5000) {
    const oldest = [...rateBuckets.keys()].slice(0, 1000);
    for (const key of oldest) rateBuckets.delete(key);
  }
  return hits.length <= RATE_MAX_REQUESTS;
}

/** Reject honeypot submissions without revealing the mechanism. */
function isSpam(payload: unknown): boolean {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "website" in payload &&
    typeof (payload as Record<string, unknown>).website === "string" &&
    ((payload as Record<string, unknown>).website as string).length > 0
  );
}

function validationIssues(error: ZodError) {
  return error.issues.slice(0, 12).map((issue) => ({
    field: issue.path.map(String).join(".") || "form",
    code: issue.message,
  }));
}

function validationResponse(error: ZodError) {
  return NextResponse.json(
    {
      ok: false,
      code: "validation",
      message: "Some details need attention. Please check the highlighted fields.",
      issues: validationIssues(error),
    },
    { status: 422 },
  );
}

function deliveryUnavailable() {
  return NextResponse.json(
    {
      ok: false,
      code: "delivery-unavailable",
      message:
        "We could not record your inquiry right now. Please try again in a moment, or send it directly by email or WhatsApp so it is not lost.",
      fallback: { email: site.email },
    },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  // Spam protection: sliding-window rate limit per client IP. Note this is
  // per server instance — put a shared store / WAF rule in front for
  // multi-instance production deployments (see README).
  if (!checkRateLimit(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate-limited",
        message: "Too many requests. Please wait a minute and try again.",
      },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid-json", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const kind = (body as { kind?: unknown })?.kind;

  if (isSpam(body)) {
    return NextResponse.json(
      { ok: false, code: "validation", message: "Validation failed." },
      { status: 422 },
    );
  }

  if (kind === "contact") {
    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) return validationResponse(parsed.error);

    const data = parsed.data;
    const reference = generateReference();
    const result = await deliverInquiry({
      record: { reference, ...data },
      subject: contactEmailSubject(data),
      text: [
        `New website message ${reference}.`,
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        "",
        data.message,
      ].join("\n"),
      replyTo: data.email,
    });

    if (!result.stored) return deliveryUnavailable();

    return NextResponse.json({
      ok: true,
      reference,
      emailed: result.emailed,
      channels: result.channels,
    });
  }

  // Default: bulk quote inquiry.
  const parsed = quoteInquirySchema.safeParse(body);
  if (!parsed.success) return validationResponse(parsed.error);
  const parsedData = parsed.data;

  // Guarantee a complete international number even if a client posts the
  // local part and dialing code separately.
  const fullPhone =
    parsedData.countryCode && !parsedData.phone.trim().startsWith("+")
      ? `${parsedData.countryCode} ${parsedData.phone.trim()}`
      : parsedData.phone;
  const data = { ...parsedData, phone: fullPhone };

  // Server-side MOQ enforcement: every line item must be >= 1 container.
  const belowMoq = data.items.some((i) => !Number.isInteger(i.containers) || i.containers < 1);
  if (belowMoq) {
    return NextResponse.json(
      {
        ok: false,
        code: "moq",
        message: "Minimum order is 1 shipping container per product.",
        issues: [{ field: "items", code: "min-containers" }],
      },
      { status: 422 },
    );
  }

  const reference = generateReference();
  const result = await deliverInquiry({
    record: { reference, ...data },
    subject: quoteEmailSubject(reference, data),
    text: quoteEmailBody(reference, data),
    replyTo: data.email,
  });

  if (!result.stored) return deliveryUnavailable();

  return NextResponse.json({
    ok: true,
    reference,
    emailed: result.emailed,
    channels: result.channels,
  });
}
