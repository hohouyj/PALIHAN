"use client";

import { useState } from "react";
import { background } from "@/lib/data";

const TABLES: { key: keyof typeof background; title: string; blurb: string }[] = [
  {
    key: "conviction",
    title: "Convictions",
    blurb: "The main ideal your Kadungganan fights for.",
  },
  {
    key: "conjunctures",
    title: "Conjunctures",
    blurb: "Something that happened to you in the past.",
  },
  {
    key: "complications",
    title: "Complications",
    blurb: "Something you share with your bandmates that makes things complex.",
  },
  {
    key: "debts",
    title: "Debts",
    blurb: "Someone you owe something to because of what you did.",
  },
];

function Table({
  title,
  blurb,
  entries,
}: {
  title: string;
  blurb: string;
  entries: string[];
}) {
  const [rolled, setRolled] = useState<number | null>(null);

  function roll() {
    // Only runs on user click — safe from hydration mismatch
    setRolled(Math.floor(Math.random() * entries.length));
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-maroon">{title}</h2>
          <p className="text-sm text-ink/70">{blurb}</p>
        </div>
        <button type="button" onClick={roll} className="btn-gold no-print">
          🎲 Roll ({entries.length})
        </button>
      </div>

      {rolled !== null && (
        <div className="sheet-box-gold p-4">
          <p className="field-label">Rolled #{rolled + 1}</p>
          <p className="text-sm">{entries[rolled]}</p>
        </div>
      )}

      <ol className="grid gap-1.5 rounded-md border-2 border-maroon/15 bg-white/60 p-4 text-sm sm:grid-cols-2">
        {entries.map((e, i) => (
          <li
            key={i}
            className={`flex gap-2 rounded px-1 ${
              rolled === i ? "bg-gold/25 font-semibold" : ""
            }`}
          >
            <span className="shrink-0 text-ink/40">{i + 1}.</span>
            <span>{e}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function BackgroundsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Backgrounds</h1>
        <p className="mt-1 text-ink/70">
          Roll or choose your Path: convictions, conjunctures, complications,
          and debts.
        </p>
      </div>

      {TABLES.map((t) => (
        <Table
          key={t.key}
          title={t.title}
          blurb={t.blurb}
          entries={background[t.key]}
        />
      ))}
    </div>
  );
}
