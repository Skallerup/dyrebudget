import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Holder Supabase-projektet vågent: free-tier pauses efter 7 dages
// inaktivitet (= ingen DB-kald). Et trivielt query her tæller som aktivitet.
// Kaldes dagligt af Vercel Cron (se vercel.json).
export async function GET(req: NextRequest) {
  // Hvis CRON_SECRET er sat, kræv den (Vercel sender den som Bearer-token).
  // Er den ikke sat, er routen åben — men laver kun et harmløst count-query.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { ok: false, error: "Database utilgængelig" },
      { status: 503 },
    );
  }

  // Letvægts-query: henter ingen rækker, kun et count — nok til at tælle
  // som aktivitet og holde projektet vågent.
  const { error } = await supabaseAdmin
    .from("cost_submissions")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
