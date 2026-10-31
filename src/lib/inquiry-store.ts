import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Durable delivery for website inquiries.
 *
 * The site may be deployed to a read-only serverless filesystem (Vercel),
 * where writing `data/inquiries.jsonl` fails. Instead of treating that local
 * write as the only persistence path — which produced a 500 for every real
 * visitor — we try every configured durable channel and only fail when none
 * of them accepted the record.
 *
 * Configure one or more of:
 *   - KV_REST_API_URL / KV_REST_API_TOKEN          (Vercel KV)
 *   - UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 *   - INQUIRY_WEBHOOK_URL
 *   - RESEND_API_KEY + INQUIRY_TO_EMAIL
 * A writable local file is used in development / self-hosted environments.
 */

export type DeliveryChannel = "redis" | "webhook" | "email" | "file";

export interface DeliveryResult {
  stored: boolean;
  channels: DeliveryChannel[];
  emailed: boolean;
  failures: string[];
}

interface DeliverOptions {
  record: Record<string, unknown>;
  subject: string;
  text: string;
  /** Visitor email, used as Reply-To when the provider supports it. */
  replyTo?: string;
}

const REQUEST_TIMEOUT_MS = 8_000;

/** Serverless hosts mount a read-only filesystem outside /tmp. */
function isServerless(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY ||
      process.env.CF_PAGES,
  );
}

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function storeKey(): string {
  return env("INQUIRY_STORE_KEY") || "hb33:inquiries";
}

async function storeInRedis(record: Record<string, unknown>): Promise<boolean> {
  const url = (env("KV_REST_API_URL") || env("UPSTASH_REDIS_REST_URL")).replace(/\/$/, "");
  const token = env("KV_REST_API_TOKEN") || env("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return false;

  try {
    // Upstash's REST API accepts a JSON command array at the root endpoint.
    // RPUSH keeps a bounded, append-only history that is easy to export.
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "RPUSH",
        storeKey(),
        JSON.stringify({ receivedAt: new Date().toISOString(), ...record }),
      ]),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("HB33: Redis store rejected inquiry", res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (err) {
    console.error("HB33: Redis store failed", err);
    return false;
  }
}

async function forwardWebhook(record: Record<string, unknown>): Promise<boolean> {
  const url = env("INQUIRY_WEBHOOK_URL");
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-HB33-Event": "inquiry",
      },
      body: JSON.stringify({ receivedAt: new Date().toISOString(), ...record }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("HB33: webhook rejected inquiry", res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (err) {
    console.error("HB33: webhook forward failed", err);
    return false;
  }
}

async function sendEmail(
  subject: string,
  text: string,
  replyTo?: string,
): Promise<boolean> {
  const apiKey = env("RESEND_API_KEY");
  const to = env("INQUIRY_TO_EMAIL");
  if (!apiKey || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env("INQUIRY_FROM_EMAIL") || "HB33 Website <website@hb33.com>",
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("HB33: email provider error", res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (err) {
    console.error("HB33: email send failed", err);
    return false;
  }
}

async function storeInFile(record: Record<string, unknown>): Promise<boolean> {
  // Vercel / Netlify / Workers have no durable writable project directory.
  if (isServerless()) return false;

  const target = path.join(process.cwd(), "data", "inquiries.jsonl");
  try {
    await mkdir(path.dirname(target), { recursive: true });
    await appendFile(
      target,
      JSON.stringify({ receivedAt: new Date().toISOString(), ...record }) + "\n",
      "utf8",
    );
    return true;
  } catch (err) {
    console.error("HB33: local file store failed", err);
    return false;
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return "";
  }
}

/**
 * Deliver an inquiry through all configured channels concurrently.
 * A channel is successful only when the remote side acknowledges it.
 */
export async function deliverInquiry({
  record,
  subject,
  text,
  replyTo,
}: DeliverOptions): Promise<DeliveryResult> {
  const attempts = await Promise.allSettled([
    storeInRedis(record),
    forwardWebhook(record),
    sendEmail(subject, text, replyTo),
    storeInFile(record),
  ]);

  const names: DeliveryChannel[] = ["redis", "webhook", "email", "file"];
  const channels: DeliveryChannel[] = [];
  const failures: string[] = [];

  attempts.forEach((attempt, index) => {
    const name = names[index];
    if (attempt.status === "fulfilled" && attempt.value) {
      channels.push(name);
    } else {
      failures.push(name);
    }
  });

  return {
    stored: channels.length > 0,
    channels,
    emailed: channels.includes("email"),
    failures,
  };
}
