"use client";

import { useState } from "react";
import Image from "next/image";

interface BreedImageProps {
  /** Breed slug — maps to /public/breeds/{slug}.jpg */
  slug: string;
  alt: string;
  petType: "dog" | "cat";
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders a locally hosted breed photo from /public/breeds/{slug}.jpg.
 * If the file is missing (not yet uploaded) the optimizer errors and we
 * fall back to a clean emoji placeholder, so the layout is never broken.
 */
export function BreedImage({
  slug,
  alt,
  petType,
  sizes,
  className = "object-cover",
  priority,
}: BreedImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-mint-50 text-4xl select-none">
        <span aria-hidden>{petType === "dog" ? "🐕" : "🐈"}</span>
      </div>
    );
  }

  return (
    <Image
      src={`/breeds/${slug}.jpg`}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => setErrored(true)}
    />
  );
}
