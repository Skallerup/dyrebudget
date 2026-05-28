"use client";

import { useState, useRef, useEffect } from "react";
import type { Breed } from "@/types";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreedComboboxProps {
  breeds: Breed[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BreedCombobox({
  breeds,
  value,
  onChange,
  placeholder = "Vælg race...",
}: BreedComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedBreed = breeds.find((b) => b.id === value);

  const filtered = breeds.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSelect(breedId: string) {
    onChange(breedId);
    setOpen(false);
    setSearch("");
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("");
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          open && "ring-2 ring-ring"
        )}
      >
        <span className={selectedBreed ? "text-foreground" : "text-muted-foreground"}>
          {selectedBreed ? selectedBreed.name : placeholder}
        </span>
        <span className="flex items-center gap-1">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
              className="rounded p-0.5 hover:bg-accent/20 text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Søg race..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="py-3 text-center text-sm text-muted-foreground">Ingen racer fundet</p>
            ) : (
              filtered.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelect(b.id)}
                  className={cn(
                    "w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent/10",
                    value === b.id
                      ? "font-medium text-mint-600"
                      : "text-foreground"
                  )}
                >
                  {b.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
