import { randomInt } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { contactMessageSchema, quoteInquirySchema } from "@/lib/validation";
import {
  contactEmailSubject,
  quoteEmailBody,
  quoteEmailSubject,
} from "@/lib/inquiries";

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

async function persistRecord(record: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "inquiries.jsonl"),
      JSON.stringify({ receivedAt: new Date().toISOString(), ...record }) + "\n",
      "utf8",
    );
    return true;
  } catch (err) {
    console.error("HB33: failed to persist inquiry", err);
    return false;
  }
}

async function sendEmailNotification(to: string, subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { attempted: false, sent: false };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "HB33 Website <website@hb33.com>",
        to: [to],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("HB33: email provider error", await res.text());
      return { attempted: true, sent: false };
    }
    return { attempted: true, sent: true };
  } catch (err) {
    console.error("HB33: email send failed", err);
    return { attempted: true, sent: false };
  }
}

async function forwardWebhook(record: Record<string, unknown>) {
  const url = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.error("HB33: webhook forward failed", err);
  }
}

export async function POST(request: Request) {
  // Spam protection: sliding-window rate limit per client IP. Note this is
  // per server instance — put a shared store / WAF rule in front for
  // multi-instance production deployments (see README).
  if (!checkRateLimit(clientIp(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const kind = (body as { kind?: unknown })?.kind;

  if (isSpam(body)) {
    return NextResponse.json({ ok: false, message: "Validation failed." }, { status: 422 });
  }

  if (kind === "contact") {
    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Validation failed." }, { status: 422 });
    }
    const data = parsed.data;
    const reference = generateReference();
    const stored = await persistRecord({ reference, ...data });
    if (!stored) {
      return NextResponse.json({ ok: false, message: "Could not record message." }, { status: 500 });
    }
    const to = process.env.INQUIRY_TO_EMAIL?.trim();
    let emailed = false;
    if (to) {
      const result = await sendEmailNotification(
        to,
        contactEmailSubject(data),
        `Reference: ${reference}\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
      );
      emailed = result.sent;
    }
    await forwardWebhook({ reference, ...data, emailed });
    return NextResponse.json({ ok: true, reference, emailed });
  }

  // Default: bulk quote inquiry.
  const parsed = quoteInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Validation failed." }, { status: 422 });
  }
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
      { ok: false, message: "Minimum order is 1 shipping container per product." },
      { status: 422 },
    );
  }

  const reference = generateReference();
  const stored = await persistRecord({ reference, ...data });
  if (!stored) {
    return NextResponse.json({ ok: false, message: "Could not record inquiry." }, { status: 500 });
  }

  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  let emailed = false;
  if (to) {
    const result = await sendEmailNotification(to, quoteEmailSubject(reference, data), quoteEmailBody(reference, data));
    emailed = result.sent;
  }
  await forwardWebhook({ reference, ...data, emailed });

  return NextResponse.json({ ok: true, reference, emailed });
}

