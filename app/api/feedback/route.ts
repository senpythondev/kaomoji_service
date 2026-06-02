import { NextResponse } from "next/server";
import { OPERATOR, SITE } from "@/lib/site";

/**
 * Feedback intake — emails the operator on each valid submission. No database.
 *
 * EMAIL DELIVERY (Resend, called via its REST API so we add no dependency):
 *   Set these environment variables on Vercel (Project → Settings → Environment
 *   Variables). Never hardcode the key.
 *     - RESEND_API_KEY      (required to actually send) — your Resend API key.
 *     - FEEDBACK_TO_EMAIL   (optional) — recipient; defaults to the operator
 *                           address in lib/site.ts (tk.kaze.yozakura@gmail.com → 風).
 *     - FEEDBACK_FROM_EMAIL (optional) — sender; defaults to Resend's shared
 *                           "onboarding@resend.dev". For production use a sender on
 *                           a domain verified in Resend, e.g.
 *                           "Kaomoji Palette <feedback@kaomoji-palette.com>".
 *
 *   If RESEND_API_KEY is unset (e.g. local dev), the submission still returns ok
 *   to the user and the message is logged with a clear warning — nothing breaks.
 *
 * ABUSE PROTECTION (appropriate for a public, no-account form):
 *   - message is trimmed and length-limited (1–2000 chars)
 *   - a hidden honeypot field ("website") — if filled, it's a bot: we silently
 *     accept (return ok) without sending
 *   - a best-effort in-memory per-IP rate limit (resets on cold start; good
 *     enough without a database)
 */

const MAX_LEN = 2000;
const TO_EMAIL = process.env.FEEDBACK_TO_EMAIL ?? OPERATOR.email;
const FROM_EMAIL =
  process.env.FEEDBACK_FROM_EMAIL ?? `${SITE.name} <onboarding@resend.dev>`;

// Best-effort in-memory rate limit: max RATE_MAX submissions per RATE_WINDOW_MS
// per IP. Survives only within a warm serverless instance — a lightweight
// deterrent, not a guarantee (that would need a shared store / DB).
const RATE_MAX = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory cap
  return recent.length > RATE_MAX;
}

async function sendToOperator(message: string, isoTimestamp: string) {
  const oneLine = message.replace(/\s+/g, " ").slice(0, 500);
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.warn(
      `[feedback] RESEND_API_KEY is not set — email NOT sent. Set it on Vercel to deliver feedback to ${TO_EMAIL}. Message logged below:`,
    );
    console.warn(`[feedback] ${isoTimestamp} :: ${oneLine}`);
    return;
  }

  const jst = new Date(isoTimestamp).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: "Kaomoji Palette フィードバック",
        text: `新しいフィードバックが届きました。\n\n日時: ${jst}（JST） / ${isoTimestamp}\n\n----------------------------------------\n${message}\n----------------------------------------`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      // Log the full message so it isn't lost if delivery fails (no DB fallback).
      console.error(
        `[feedback] email send failed (${res.status}): ${detail} :: ${oneLine}`,
      );
    }
  } catch (err) {
    console.error(`[feedback] email send threw: ${String(err)} :: ${oneLine}`);
  }
}

export async function POST(request: Request) {
  let message = "";
  let honeypot = "";
  try {
    const body = (await request.json()) as {
      message?: unknown;
      website?: unknown;
    };
    message = typeof body.message === "string" ? body.message.trim() : "";
    honeypot = typeof body.website === "string" ? body.website.trim() : "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill this. Pretend success so bots learn nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "empty_message" },
      { status: 400 },
    );
  }
  if (message.length > MAX_LEN) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  await sendToOperator(message, new Date().toISOString());

  return NextResponse.json({ ok: true });
}
