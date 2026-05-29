import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "beregner@dyrebudget.dk";

export async function POST(req: NextRequest) {
  try {
    const { email, breedName, monthlyCost, shareUrl } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Ugyldig e-mail" }, { status: 400 });
    }

    const monthlyFormatted = monthlyCost
      ? `${Math.round(monthlyCost).toLocaleString("da-DK")} kr.`
      : null;

    await resend.emails.send({
      from: `DyreBudget.dk <${FROM_EMAIL}>`,
      to: email,
      subject: breedName
        ? `Din ${breedName}-beregning fra DyreBudget.dk`
        : "Din kæledyrsberegning fra DyreBudget.dk",
      html: `
<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#0f172a;padding:32px 40px;">
      <p style="margin:0 0 4px;color:#34d399;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">DyreBudget.dk</p>
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
        ${breedName ? `Din ${breedName}-beregning` : "Din kæledyrsberegning"}
      </h1>
    </div>
    <!-- Content -->
    <div style="padding:32px 40px;">
      ${monthlyFormatted ? `
      <div style="background:#f1f5f9;border-radius:12px;padding:20px 24px;margin-bottom:24px;text-align:center;">
        <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Estimeret månedspris</p>
        <p style="margin:0;color:#0f172a;font-size:36px;font-weight:700;">${monthlyFormatted}</p>
        ${breedName ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px;">${breedName} · medium-niveau</p>` : ""}
      </div>
      ` : ""}
      <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
        Her er dit kæledyrsbudget fra DyreBudget.dk. Beregningen inkluderer foder, forsikring, dyrlæge, grooming og alle løbende udgifter.
      </p>
      ${shareUrl ? `
      <a href="${shareUrl}" style="display:block;text-align:center;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:600;font-size:14px;margin-bottom:24px;">
        Se fuld beregning med breakdown →
      </a>
      ` : `
      <a href="https://dyrebudget.dk/beregner" style="display:block;text-align:center;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:600;font-size:14px;margin-bottom:24px;">
        Åbn beregneren →
      </a>
      `}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
        Du modtager denne e-mail fordi du bad om det på DyreBudget.dk.
        Alle tal er vejledende estimater baseret på aktuelle markedsdata.
        <br />Ingen spam — du afmelder dig når som helst ved at svare på denne e-mail.
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kunne ikke sende e-mail" }, { status: 500 });
  }
}
