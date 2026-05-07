import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Resend API key missing");
  return new Resend(key);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    typeof (body as Record<string, unknown>).email !== "string"
  ) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { email, locale = "en" } = body as { email: string; locale?: string };

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const sanitizedLocale =
    locale === "fr" || locale === "en" ? locale : "en";

  try {
    const supabase = getSupabase();
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim(), locale: sanitizedLocale });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "Already on the waitlist" },
          { status: 409 }
        );
      }
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Could not save your email" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Supabase connection error:", err);
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }

  try {
    const resend = getResend();
    const isFr = sanitizedLocale === "fr";

    await resend.emails.send({
      from: "Noteship <hello@noteship.app>",
      to: email,
      subject: isFr
        ? "Vous êtes sur la liste Noteship ✦"
        : "You're on the Noteship waitlist ✦",
      html: `
<!DOCTYPE html>
<html lang="${sanitizedLocale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isFr ? "Bienvenue sur Noteship" : "Welcome to Noteship"}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;max-width:560px;">
          <tr>
            <td style="padding:40px 40px 0;">
              <p style="margin:0 0 32px;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">Noteship</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;color:#FFFFFF;line-height:1.2;letter-spacing:-0.03em;">
                ${isFr ? "Vous êtes sur la liste ✦" : "You're on the list ✦"}
              </h1>
              <p style="margin:0 0 24px;font-size:16px;color:#A0A0A0;line-height:1.6;">
                ${
                  isFr
                    ? "Merci de rejoindre Noteship en tant que membre fondateur. Vous serez parmi les premiers à découvrir notre outil changelog pour les makers indépendants."
                    : "Thanks for joining Noteship as a founding member. You'll be among the first to experience the simplest changelog tool for indie makers."
                }
              </p>
              <div style="background:#1A1A1A;border:1px solid rgba(255,107,0,0.2);border-radius:12px;padding:24px;margin-bottom:24px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#FF6B00;text-transform:uppercase;letter-spacing:0.08em;">
                  ${isFr ? "Vos avantages fondateurs" : "Your founding perks"}
                </p>
                <ul style="margin:0;padding:0;list-style:none;">
                  ${[
                    isFr ? "1 mois Pro offert, sans condition" : "1 month Pro free, no questions asked",
                    isFr ? "Accès direct au créateur" : "Direct access to the builder (that's me)",
                    isFr ? "Vos retours intégrés en jours" : "Your feedback ships in days, not quarters",
                    isFr ? 'Badge "Membre Fondateur" à vie' : '"Founding Member" badge forever',
                  ]
                    .map(
                      (perk) =>
                        `<li style="padding:6px 0;font-size:14px;color:#A0A0A0;"><span style="color:#FF6B00;margin-right:8px;">✦</span>${perk}</li>`
                    )
                    .join("")}
                </ul>
              </div>
              <p style="margin:0;font-size:14px;color:#555555;line-height:1.6;">
                ${isFr ? "Je vous contacterai directement dès que Noteship sera prêt.<br>— Martin" : "I'll reach out personally when Noteship is ready.<br>— Martin"}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;border-top:1px solid #222222;margin-top:32px;">
              <p style="margin:0;font-size:12px;color:#333333;">
                ${isFr ? "Pas de spam. Uniquement les actualités de Noteship." : "No spam. Just Noteship updates."}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });
  } catch (err) {
    console.error("Email send error:", err);
  }

  return NextResponse.json({ success: true });
}
