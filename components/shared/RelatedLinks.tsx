import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface RelatedLink {
  href: string;
  title: string;
  desc?: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

export function RelatedLinks({ links, title = "Læs også" }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-3 p-4 bg-card border border-border rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
          >
            <div className="min-w-0">
              <p className="font-semibold text-sm group-hover:text-navy-900 transition-colors">
                {link.title}
              </p>
              {link.desc && (
                <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-navy-900 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
