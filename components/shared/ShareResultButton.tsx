"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareResultButtonProps {
  /** Encoded share config (se lib/shareConfig) */
  config: string;
  breedName: string;
}

export function ShareResultButton({ config, breedName }: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/resultat/${config}`
        : `/resultat/${config}`;
    const shareData = {
      title: `Hvad koster en ${breedName}?`,
      text: `Se hvad en ${breedName} koster — beregnet på DyreBudget.dk`,
      url,
    };
    trackEvent("calculator_completed", { breedName, placement: "share_result" });

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* bruger annullerede deling — fald tilbage til kopiering */
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard utilgængelig — ignorér stille */
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-navy-700 bg-navy-50 border border-navy-200 rounded-lg hover:border-navy-400 hover:bg-navy-100 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-mint-600" />
          Link kopieret!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Del dit resultat
        </>
      )}
    </button>
  );
}
