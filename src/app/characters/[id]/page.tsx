"use client";

import { use } from "react";
import Link from "next/link";
import { useCharacter } from "@/lib/storage";
import {
  disciplines,
  techniques as allTechniques,
  legendArc,
} from "@/lib/data";
import type { Character } from "@/lib/types";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Panel({
  title,
  gold,
  children,
  className = "",
}: {
  title: string;
  gold?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-md ${className}`}>
      <div className={gold ? "sheet-header-gold" : "sheet-header"}>{title}</div>
      <div
        className={`rounded-b-md border-2 border-t-0 ${
          gold ? "border-gold" : "border-maroon"
        } bg-white/70 p-3 text-sm`}
      >
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2 border-b border-maroon/10 py-1">
      <span className="w-28 shrink-0 text-xs font-bold uppercase text-maroon">
        {label}
      </span>
      <span className="text-sm">{value || "—"}</span>
    </div>
  );
}

export default function CharacterSheetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { character, ready } = useCharacter(id);

  if (!ready) return <p className="text-ink/60">Loading…</p>;
  if (!character)
    return (
      <div className="sheet-box p-8 text-center">
        <p className="text-ink/70">Character not found in this browser.</p>
        <Link href="/characters" className="btn-primary mt-4">
          Back to characters
        </Link>
      </div>
    );

  const c = character;
  const arc = legendArc(c.legend);
  const disc = disciplines.find((d) => d.name === c.disciplines[0]);
  const chosenTechs = allTechniques.filter((t) => c.techniques.includes(t.name));

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Link href="/characters" className="text-sm text-maroon hover:underline">
          ← All characters
        </Link>
        <div className="flex gap-2">
          <Link href={`/characters/${c.id}/edit`} className="btn-outline">
            Edit
          </Link>
          <button type="button" onClick={() => window.print()} className="btn-primary">
            Print
          </button>
        </div>
      </div>

      {/* PAGE 1 — Identity */}
      <div className="print-page grid gap-4 lg:grid-cols-3">
        {/* left column */}
        <div className="space-y-4">
          <Panel title="Portrait">
            {c.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.portrait} alt="" className="mx-auto max-h-64 rounded object-contain" />
            ) : (
              <div className="flex h-48 items-center justify-center font-display text-6xl text-maroon/20">
                {(c.name || "?").charAt(0)}
              </div>
            )}
          </Panel>
          <Panel title="Alignments">
            <p className="mb-2 text-xs text-ink/60">
              Sword: {c.alignmentRoles?.sword ? cap(c.alignmentRoles.sword) : "—"} ·
              Crown: {c.alignmentRoles?.crown ? cap(c.alignmentRoles.crown) : "—"} ·
              Mask: {c.alignmentRoles?.mask ? cap(c.alignmentRoles.mask) : "—"}
            </p>
            <div className="space-y-1">
              {(["fire", "water", "metal", "air", "earth"] as const).map((el) => (
                <div key={el} className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-maroon">{el}</span>
                  <span className="font-display text-lg font-bold">{c.alignments[el]}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Items">
            <p className="whitespace-pre-line">{c.items || "—"}</p>
          </Panel>
        </div>

        {/* middle column */}
        <div className="space-y-4">
          <Panel title="Name & Pronouns">
            <p className="font-display text-2xl font-bold text-maroon">{c.name || "Unnamed"}</p>
            {c.pronouns && <p className="text-sm text-ink/70">{c.pronouns}</p>}
          </Panel>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border-2 border-maroon bg-white/70 p-2 text-center">
              <p className="text-xs font-bold uppercase text-maroon">Legend</p>
              <p className="font-display text-2xl font-bold">{c.legend}</p>
              <p className="text-xs text-ink/60">Arc {arc.arc} · {arc.name}</p>
            </div>
            <div className="rounded-md border-2 border-maroon bg-white/70 p-2 text-center">
              <p className="text-xs font-bold uppercase text-maroon">Honor</p>
              <p className="font-display text-2xl font-bold">{c.honor}</p>
            </div>
          </div>
          <Panel title="Player">
            <Field label="Player" value={c.player} />
            <Field label="Pronouns" value={c.playerPronouns} />
            <Field label="Folk" value={c.folk} />
          </Panel>
          <Panel title="Culture">
            <Field label="Culture" value={c.culture?.name ? cap(c.culture.name) : undefined} />
          </Panel>
          <Panel title="Conviction">
            <p className="whitespace-pre-line">{c.background?.conviction || "—"}</p>
          </Panel>
        </div>

        {/* right column */}
        <div className="space-y-4">
          <Panel title="Subculture">
            <p>{c.culture?.subculture || "—"}</p>
          </Panel>
          <Panel title="Lineage">
            <p>{c.culture?.lineage || "—"}</p>
          </Panel>
          <Panel title="Social Standing">
            <p>{c.culture?.socialStanding || "—"}</p>
          </Panel>
          <Panel title="Conjuncture">
            <p className="whitespace-pre-line">{c.background?.conjuncture || "—"}</p>
          </Panel>
          <Panel title="Debts">
            <p className="whitespace-pre-line">{c.background?.debts || "—"}</p>
          </Panel>
          <Panel title="Complications">
            <p className="whitespace-pre-line">{c.background?.complications || "—"}</p>
          </Panel>
        </div>
      </div>

      {/* PAGE 2 — Violence */}
      <div className="print-page grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Panel title="Violence">
            <Field label="Discipline" value={c.disciplines[0]} />
            <Field label="Style" value={c.style} />
            <Field label="Weapon" value={c.weapon} />
            <Field label="Armor" value={c.armor} />
          </Panel>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border-2 border-maroon bg-white/70 p-2 text-center">
              <p className="text-xs font-bold uppercase text-maroon">HP</p>
              <p className="font-display text-2xl font-bold">
                {c.hp.current}
                <span className="text-base text-ink/50"> / {c.hp.max}</span>
              </p>
            </div>
            <div className="rounded-md border-2 border-gold bg-gold/5 p-2 text-center">
              <p className="text-xs font-bold uppercase text-gold-dark">Anting Slots</p>
              <p className="font-display text-2xl font-bold">{arc.antingSlots}</p>
            </div>
          </div>

          <Panel title="Martial Abilities">
            <div className="grid grid-cols-5 gap-1 text-center">
              {([
                ["BRV", c.attributes.brv],
                ["FTH", c.attributes.fth],
                ["POS", c.attributes.pos],
                ["RES", c.attributes.res],
                ["SPD", c.attributes.spd],
              ] as const).map(([k, v]) => (
                <div key={k} className="rounded bg-maroon/5 py-1">
                  <p className="text-xs font-bold text-maroon">{k}</p>
                  <p className="font-display text-lg font-bold">{v}</p>
                </div>
              ))}
            </div>
          </Panel>

          {disc && (
            <Panel title="Discipline Traits">
              <div className="space-y-2">
                {disc.traits.map((t) => (
                  <div key={t.name}>
                    <p className="font-semibold text-maroon">{t.name}</p>
                    <p className="text-xs text-ink/80">{t.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {disc && disc.violence?.length > 0 && (
            <Panel title="Inflict Violences">
              <div className="space-y-2">
                {disc.violence.map((v) => (
                  <div key={v.name}>
                    <p className="font-semibold text-maroon">
                      {v.name}{" "}
                      <span className="text-xs font-normal text-ink/60">
                        ({v.actionCost} Beat)
                      </span>
                    </p>
                    <p className="text-xs text-ink/80">{v.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Panel title="Techniques & Enlightenment" gold>
            {chosenTechs.length === 0 ? (
              <p className="text-ink/60">No techniques selected.</p>
            ) : (
              <div className="space-y-3">
                {chosenTechs.map((t) => (
                  <div key={t.name} className="border-b border-gold/20 pb-2 last:border-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display font-bold text-maroon">{t.name}</span>
                      {t.isEnlightenment && (
                        <span className="tag bg-gold text-white">Enlightenment</span>
                      )}
                    </div>
                    <ul className="mt-1 list-disc pl-5 text-xs">
                      {t.description.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Anting-Anting" gold>
            <p className="whitespace-pre-line">{c.antingAnting || "—"}</p>
          </Panel>

          {c.warband && (c.warband.name || c.warband.nature || c.warband.conviction || c.warband.howMet) && (
            <Panel title="Warband">
              <Field label="Name" value={c.warband.name} />
              <Field label="Nature" value={c.warband.nature} />
              <Field label="Conviction" value={c.warband.conviction} />
              <Field label="How you met" value={c.warband.howMet} />
            </Panel>
          )}

          {c.notes && (
            <Panel title="Notes">
              <p className="whitespace-pre-line">{c.notes}</p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
