import { NextResponse } from "next/server";

/**
 * Feedback intake (v1).
 *
 * For now this simply validates and logs the submission to the server console.
 * The charter calls for a single hosted destination later (a free-tier store
 * or an email to the operator) — that swap happens here without touching the UI.
 */
export async function POST(request: Request) {
  let message = "";
  try {
    const body = (await request.json()) as { message?: unknown };
    message = typeof body.message === "string" ? body.message.trim() : "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "empty_message" },
      { status: 400 },
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "too_long" },
      { status: 413 },
    );
  }

  const oneLine = message.replace(/\s+/g, " ").slice(0, 500);
  console.log(`[feedback] ${new Date().toISOString()} :: ${oneLine}`);

  return NextResponse.json({ ok: true });
}
