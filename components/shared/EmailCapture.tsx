"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";
import { Mail, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Ugyldig e-mailadresse"),
});

type FormData = z.infer<typeof schema>;

interface EmailCaptureProps {
  breedName?: string;
  monthlyCost?: number;
  variant?: "inline" | "banner";
}

export function EmailCapture({ breedName, monthlyCost, variant = "banner" }: EmailCaptureProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      await supabase.from("email_leads").insert({
        email: data.email,
        breed_name: breedName,
        estimated_monthly_cost: monthlyCost,
        source: typeof window !== "undefined" ? window.location.pathname : "",
      });
      trackEvent("email_capture", { email: data.email, breedName });
      setSubmitted(true);
    } catch {
      // silently fail — don't block UX
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-5 bg-mint-50 border border-mint-200 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-mint-600 shrink-0" />
        <div>
          <p className="font-semibold text-mint-800">Tak! Tjek din indbakke.</p>
          <p className="text-sm text-mint-600">Vi sender din beregning med det samme.</p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          {...register("email")}
          type="email"
          placeholder="din@email.dk"
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="shrink-0">
          {loading ? "..." : "Send"}
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-navy-900 text-white rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-mint-400" />
        <span className="text-mint-400 text-sm font-medium">Gem din beregning</span>
      </div>
      <h3 className="text-xl font-bold mb-2">
        Få{breedName ? ` ${breedName}-beregningen` : " din beregning"} sendt
      </h3>
      <p className="text-navy-300 text-sm mb-5">
        Vi sender dit komplette budget på e-mail så du har det til rådighed.
        {monthlyCost ? ` Estimeret månedspris: ${monthlyCost.toLocaleString("da-DK")} kr.` : ""}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-col sm:flex-row">
        <Input
          {...register("email")}
          type="email"
          placeholder="din@email.dk"
          className="flex-1 bg-navy-800 border-navy-700 text-white placeholder:text-navy-400"
        />
        <Button type="submit" disabled={loading} variant="mint" className="shrink-0">
          {loading ? "Sender..." : "Send beregning"}
        </Button>
      </form>
      {errors.email && (
        <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
      )}
      <p className="text-navy-500 text-xs mt-3">
        Ingen spam. Du afmelder dig når som helst.
      </p>
    </div>
  );
}
