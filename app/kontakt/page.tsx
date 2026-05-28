"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Navn er for kort"),
  email: z.string().email("Ugyldig e-mailadresse"),
  message: z.string().min(10, "Besked er for kort"),
});

type FormData = z.infer<typeof schema>;

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    console.log("Contact form:", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 p-6 bg-mint-50 border border-mint-200 rounded-2xl">
          <CheckCircle2 className="w-8 h-8 text-mint-600" />
          <div>
            <p className="font-bold text-mint-800">Tak for din besked!</p>
            <p className="text-mint-700 text-sm">Vi svarer typisk inden for 1-2 hverdage.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <h1 className="text-3xl font-bold mb-2">Kontakt os</h1>
      <p className="text-muted-foreground mb-8">Spørgsmål, samarbejde eller datafeedback?</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Navn</label>
          <Input {...register("name")} placeholder="Dit navn" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">E-mail</label>
          <Input {...register("email")} type="email" placeholder="din@email.dk" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Besked</label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Skriv din besked..."
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
        </div>
        <Button type="submit" size="lg">Send besked</Button>
      </form>
    </div>
  );
}
