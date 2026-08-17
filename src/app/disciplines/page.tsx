"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { disciplines, styles, factions, slugify } from "@/lib/data";
import SearchInput from "@/components/SearchInput";
import FilterChips from "@/components/FilterChips";

export default function DisciplinesPage() {
  const [q, setQ] = useState("");
  const [style, setStyle] = useState<string | null>(null);
  const [faction, setFaction] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return disciplines.filter((d) => {
      if (style && d.style !== style) return false;
      if (faction && d.faction !== faction) return false;
      if (query && !d.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [q, style, faction]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Disciplines</h1>
        <p className="mt-1 text-ink/70">
          The {disciplines.length} martial paths of the Kadungganan.
        </p>
      </div>

      <div className="space-y-3">
        <SearchInput value={q} onChange={setQ} placeholder="Search disciplines…" />
        <div>
          <p className="field-label">Style</p>
          <FilterChips options={styles} selected={style} onSelect={setStyle} />
        </div>
        <div>
          <p className="field-label">Faction</p>
          <FilterChips options={factions} selected={faction} onSelect={setFaction} />
        </div>
      </div>

      <p className="text-sm text-ink/60">{filtered.length} shown</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <Link key={d.name} href={`/disciplines/${slugify(d.name)}`} className="card group">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-maroon group-hover:text-maroon-dark">
                {d.name}
              </h2>
              <span className="tag shrink-0 bg-maroon/10 text-maroon">
                {d.hp} HP
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="tag bg-gold/20 text-gold-dark">{d.style}</span>
              {d.faction && (
                <span className="tag bg-ink/10 text-ink/70">{d.faction}</span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-ink/70">
              {d.weaponSuggestions}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
