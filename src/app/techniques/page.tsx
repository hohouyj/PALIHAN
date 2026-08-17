"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { techniques, disciplines } from "@/lib/data";
import SearchInput from "@/components/SearchInput";

// canonical discipline names for the dropdown
const disciplineOptions = disciplines
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b));

function TechniquesInner() {
  const params = useSearchParams();
  const initialDiscipline = params.get("discipline") ?? "";

  const [q, setQ] = useState("");
  const [discipline, setDiscipline] = useState(initialDiscipline);
  const [onlyEnlightenment, setOnlyEnlightenment] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const disc = discipline.trim().toLowerCase();
    return techniques.filter((t) => {
      if (disc && t.disciplineName.toLowerCase() !== disc) return false;
      if (onlyEnlightenment && !t.isEnlightenment) return false;
      if (query) {
        const hay = (
          t.name +
          " " +
          t.lore +
          " " +
          t.description.join(" ")
        ).toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [q, discipline, onlyEnlightenment]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Techniques</h1>
        <p className="mt-1 text-ink/70">
          {techniques.length} techniques and Enlightenments across all disciplines.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <SearchInput value={q} onChange={setQ} placeholder="Search techniques…" />
        <select
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          className="field-input"
        >
          <option value="">All disciplines</option>
          {disciplineOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={onlyEnlightenment}
          onChange={(e) => setOnlyEnlightenment(e.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        Enlightenments only
      </label>

      <p className="text-sm text-ink/60">{filtered.length} shown</p>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <div key={t.name} className="sheet-box p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-maroon">{t.name}</h2>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="tag bg-ink/10 text-ink/70">{t.disciplineName}</span>
                {t.isEnlightenment && (
                  <span className="tag bg-gold text-white">Enlightenment</span>
                )}
              </div>
            </div>
            {t.prereqNames.length > 0 && (
              <p className="mt-1 text-xs text-ink/60">
                Requires: {t.prereqNames.join(", ")}
              </p>
            )}
            {t.lore && <p className="mt-1 text-sm italic text-ink/60">{t.lore}</p>}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {t.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechniquesPage() {
  return (
    <Suspense fallback={<p className="text-ink/60">Loading techniques…</p>}>
      <TechniquesInner />
    </Suspense>
  );
}
