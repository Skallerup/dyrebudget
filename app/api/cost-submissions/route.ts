import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const REGIONS = [
  "Hovedstaden",
  "Sjælland",
  "Syddanmark",
  "Midtjylland",
  "Nordjylland",
] as const;

const submissionSchema = z.object({
  breedSlug: z.string().min(1).max(80),
  petType: z.enum(["dog", "cat"]),
  monthlyCost: z.number().int().min(100).max(100000),
  hasInsurance: z.boolean().optional(),
  region: z.enum(REGIONS).optional(),
});

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

// POST — record a real-cost submission
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database utilgængelig" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig anmodning" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldige data" }, { status: 422 });
  }

  const { breedSlug, petType, monthlyCost, hasInsurance, region } = parsed.data;

  const { error } = await supabaseAdmin.from("cost_submissions").insert({
    breed_slug: breedSlug,
    pet_type: petType,
    monthly_cost: monthlyCost,
    has_insurance: hasInsurance ?? null,
    region: region ?? null,
  });

  if (error) {
    return NextResponse.json({ error: "Kunne ikke gemme" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// GET ?breed=slug — aggregated community stats for a breed
export async function GET(req: NextRequest) {
  const breed = new URL(req.url).searchParams.get("breed");
  if (!breed) {
    return NextResponse.json({ error: "Mangler breed-parameter" }, { status: 400 });
  }

  // Empty state if DB is unavailable — never break the page.
  if (!supabaseAdmin) {
    return NextResponse.json({ count: 0 });
  }

  const { data, error } = await supabaseAdmin
    .from("cost_submissions")
    .select("monthly_cost, has_insurance")
    .eq("breed_slug", breed)
    .eq("approved", true);

  if (error || !data) {
    return NextResponse.json({ count: 0 });
  }

  const costs = data.map((r) => Number(r.monthly_cost)).filter((n) => n > 0);
  const count = costs.length;

  if (count === 0) {
    return NextResponse.json({ count: 0 });
  }

  const sum = costs.reduce((a, b) => a + b, 0);
  const withInsurance = data.filter((r) => r.has_insurance === true).length;

  return NextResponse.json({
    count,
    avg: Math.round(sum / count),
    median: median(costs),
    min: Math.min(...costs),
    max: Math.max(...costs),
    insuredShare: Math.round((withInsurance / count) * 100),
  });
}
