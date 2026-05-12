import { z } from "zod";
import { createSupabaseClient } from "@/lib/supabase";
import { createResendClient } from "@/lib/resend";

const bodySchema = z.object({
  email: z.string().email(),
  locale: z.enum(["en", "fr"]).default("en"),
});

function buildEmailHtml(locale: "en" | "fr"): string {
  const isFr = locale === "fr";

  const content = isFr
    ? `Tu es bien inscrit sur la waitlist ! On te tient au courant dès que Noteship est disponible. Merci beaucoup pour ton soutien — n'hésite pas à nous faire des retours ici : <a href="mailto:martin@noteship.app" style="color:#FF6B00;">martin@noteship.app</a>`
    : `You're on the list! We'll let you know as soon as Noteship is ready to launch. Thank you so much for your support — feel free to share feedback anytime at <a href="mailto:martin@noteship.app" style="color:#FF6B00;">martin@noteship.app</a>`;

  const footer = isFr
    ? "Tu reçois cet email car tu t'es inscrit sur noteship.app"
    : "You received this email because you signed up at noteship.app";

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0A0A0A;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 32px;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">Noteship</p>
              <h1 style="margin:0 0 20px;font-size:26px;font-weight:800;color:#FFFFFF;line-height:1.25;letter-spacing:-0.03em;">
                ${isFr ? "Tu es sur la waitlist ✦" : "You're on the waitlist ✦"}
              </h1>
              <p style="margin:0;font-size:15px;color:#A0A0A0;line-height:1.65;">
                ${content}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #1E1E1E;">
              <p style="margin:0;font-size:12px;color:#444444;line-height:1.5;">
                ${footer}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request): Promise<Response> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { email, locale } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const supabase = createSupabaseClient();

  // Insert — catch unique constraint violation
  const { error: insertError } = await supabase
    .from("waitlist")
    .insert({ email: normalizedEmail, locale });

  if (insertError) {
    if (insertError.code === "23505") {
      return Response.json({ message: "already_registered" }, { status: 200 });
    }
    console.error("[waitlist] Supabase insert error:", insertError);
    return Response.json(
      { error: "Could not save your email" },
      { status: 500 },
    );
  }

  // Get position (total count after insert)
  const { count, error: countError } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("[waitlist] Supabase count error:", countError);
  }

  const position = count ?? 1;

  // Send confirmation email — non-blocking on failure
  try {
    const resend = createResendClient();
    await resend.emails.send({
      from: "Noteship <onboarding@resend.dev>",
      to: normalizedEmail,
      subject:
        locale === "fr"
          ? "Tu es sur la waitlist Noteship "
          : "You're on the Noteship waitlist ",
      html: buildEmailHtml(locale),
    });
  } catch (emailErr) {
    console.error("[waitlist] Resend error:", emailErr);
  }

  return Response.json({ success: true, position });
}
