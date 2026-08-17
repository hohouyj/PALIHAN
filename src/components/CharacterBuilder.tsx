"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  cultures,
  folk,
  background,
  disciplines,
  techniquesForDiscipline,
  legendArc,
  ATTRIBUTE_MAX,
  ALIGNMENT_MAX,
  MAX_EQUIPPED_TECHNIQUES,
} from "@/lib/data";
import { ELEMENTS, type Character, type Element } from "@/lib/types";
import { emptyCharacter, upsertCharacter } from "@/lib/storage";

const STEPS = [
  "Identity",
  "Folk",
  "Culture",
  "Background",
  "Discipline",
  "Techniques",
  "Alignments & Abilities",
  "Warband & Gear",
] as const;

const ATTR_KEYS: { key: keyof Character["attributes"]; label: string }[] = [
  { key: "brv", label: "BRV" },
  { key: "fth", label: "FTH" },
  { key: "pos", label: "POS" },
  { key: "res", label: "RES" },
  { key: "spd", label: "SPD" },
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border-2 border-maroon/30 bg-white px-3 py-2">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-6 w-6 rounded bg-maroon/10 text-maroon hover:bg-maroon/20"
        >
          −
        </button>
        <span className="w-6 text-center font-bold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-6 w-6 rounded bg-maroon/10 text-maroon hover:bg-maroon/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

function ChooseOrRoll({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  function roll() {
    onChange(options[Math.floor(Math.random() * options.length)]);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="field-label">{label}</label>
        <button type="button" onClick={roll} className="text-xs text-gold-dark hover:underline">
          🎲 Roll
        </button>
      </div>
      {hint && <p className="mb-1 text-xs text-ink/60">{hint}</p>}
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="field-input"
        placeholder="Choose from the list, roll, or write your own…"
      />
      <details className="mt-1">
        <summary className="cursor-pointer text-xs text-maroon">Browse {options.length} options</summary>
        <div className="mt-1 max-h-40 overflow-auto rounded border border-maroon/20 bg-white/60 p-2 text-xs">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(o)}
              className="block w-full rounded px-1 py-0.5 text-left hover:bg-gold/20"
            >
              {o}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}

export default function CharacterBuilder({ initial }: { initial?: Character }) {
  const router = useRouter();
  const [char, setChar] = useState<Character>(() => initial ?? emptyCharacter());
  const [step, setStep] = useState(0);

  function patch(p: Partial<Character>) {
    setChar((c) => ({ ...c, ...p }));
  }

  const selectedCulture = cultures.find(
    (c) => c.name === char.culture?.name,
  );

  const chosenDiscipline = disciplines.find((d) => char.disciplines[0] === d.name);
  const availableTechniques = useMemo(
    () => (chosenDiscipline ? techniquesForDiscipline(chosenDiscipline.name) : []),
    [chosenDiscipline],
  );

  const alignmentTotal =
    char.alignments.fire +
    char.alignments.water +
    char.alignments.metal +
    char.alignments.air +
    char.alignments.earth;
  const attrTotal =
    char.attributes.brv +
    char.attributes.fth +
    char.attributes.pos +
    char.attributes.res +
    char.attributes.spd;
  const arc = legendArc(char.legend);

  function save() {
    const saved = upsertCharacter({ ...char, name: char.name.trim() || "Unnamed Kadungganan" });
    router.push(`/characters/${saved.id}`);
  }

  function handlePortrait(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch({ portrait: reader.result as string });
    reader.readAsDataURL(file);
  }

  function toggleTechnique(name: string) {
    setChar((c) => {
      const has = c.techniques.includes(name);
      return {
        ...c,
        techniques: has
          ? c.techniques.filter((t) => t !== name)
          : [...c.techniques, name],
      };
    });
  }

  function setAlignmentRole(role: "sword" | "crown" | "mask", el: Element) {
    setChar((c) => ({
      ...c,
      alignmentRoles: { ...c.alignmentRoles, [role]: el },
    }));
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="no-print flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i)}
            className={`tag border-2 transition ${
              i === step
                ? "border-maroon bg-maroon text-parchment"
                : "border-maroon/30 bg-white text-maroon hover:border-maroon"
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="sheet-box p-5">
        <h2 className="mb-4 font-display text-2xl font-bold text-maroon">
          {step + 1}. {STEPS[step]}
        </h2>

        {/* STEP 0: Identity */}
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label">Name</label>
              <input
                className="field-input"
                value={char.name}
                onChange={(e) => patch({ name: e.target.value })}
                placeholder="Your Kadungganan's name"
              />
            </div>
            <div>
              <label className="field-label">Pronouns</label>
              <input
                className="field-input"
                value={char.pronouns ?? ""}
                onChange={(e) => patch({ pronouns: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Player</label>
              <input
                className="field-input"
                value={char.player ?? ""}
                onChange={(e) => patch({ player: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Player Pronouns</label>
              <input
                className="field-input"
                value={char.playerPronouns ?? ""}
                onChange={(e) => patch({ playerPronouns: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label">Portrait (optional)</label>
              <div className="flex items-center gap-4">
                {char.portrait && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={char.portrait}
                    alt="portrait"
                    className="h-20 w-20 rounded-md border-2 border-maroon object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePortrait(e.target.files?.[0])}
                  className="text-sm"
                />
                {char.portrait && (
                  <button
                    type="button"
                    onClick={() => patch({ portrait: undefined })}
                    className="text-xs text-maroon hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Folk */}
        {step === 1 && (
          <div>
            <p className="mb-3 text-sm text-ink/70">
              Folk are a cosmetic choice — all kinds are found across the Isles.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {folk.map((f) => (
                <label
                  key={f.name}
                  className={`cursor-pointer rounded-md border-2 p-3 transition ${
                    char.folk === f.name
                      ? "border-maroon bg-gold/10"
                      : "border-maroon/20 hover:border-maroon"
                  }`}
                >
                  <input
                    type="radio"
                    name="folk"
                    className="sr-only"
                    checked={char.folk === f.name}
                    onChange={() => patch({ folk: f.name })}
                  />
                  <p className="font-display font-bold text-maroon">{f.name}</p>
                  <p className="mt-1 line-clamp-3 text-xs text-ink/70">
                    {f.description[0]}
                  </p>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Culture */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="field-label">Culture</label>
              <select
                className="field-input"
                value={char.culture?.name ?? ""}
                onChange={(e) =>
                  patch({
                    culture: { name: e.target.value },
                  })
                }
              >
                <option value="">Choose a culture…</option>
                {cultures.map((c) => (
                  <option key={c.name} value={c.name}>
                    {cap(c.name)}
                  </option>
                ))}
              </select>
            </div>

            {selectedCulture && (
              <div className="grid gap-4 sm:grid-cols-3">
                <SubSelect
                  label="Subculture"
                  options={selectedCulture.subculture.map((s) => s.name)}
                  value={char.culture?.subculture}
                  onChange={(v) =>
                    patch({ culture: { ...char.culture!, subculture: v } })
                  }
                />
                <SubSelect
                  label="Lineage"
                  options={selectedCulture.lineage.map((s) => s.name)}
                  value={char.culture?.lineage}
                  onChange={(v) =>
                    patch({ culture: { ...char.culture!, lineage: v } })
                  }
                />
                <SubSelect
                  label="Social Standing"
                  options={selectedCulture.socialStanding.map((s) => s.name)}
                  value={char.culture?.socialStanding}
                  onChange={(v) =>
                    patch({ culture: { ...char.culture!, socialStanding: v } })
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Background */}
        {step === 3 && (
          <div className="space-y-4">
            <ChooseOrRoll
              label="Conviction"
              hint="The main ideal your Kadungganan fights for."
              options={background.conviction}
              value={char.background?.conviction}
              onChange={(v) => patch({ background: { ...char.background, conviction: v } })}
            />
            <ChooseOrRoll
              label="Conjuncture"
              hint="Something that happened to you in the past."
              options={background.conjunctures}
              value={char.background?.conjuncture}
              onChange={(v) => patch({ background: { ...char.background, conjuncture: v } })}
            />
            <ChooseOrRoll
              label="Complication"
              hint="Something you share with your bandmates that makes things complex."
              options={background.complications}
              value={char.background?.complications}
              onChange={(v) => patch({ background: { ...char.background, complications: v } })}
            />
            <ChooseOrRoll
              label="Debt"
              hint="Someone you owe something to because of what you did."
              options={background.debts}
              value={char.background?.debts}
              onChange={(v) => patch({ background: { ...char.background, debts: v } })}
            />
          </div>
        )}

        {/* STEP 4: Discipline */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="field-label">Discipline</label>
              <select
                className="field-input"
                value={char.disciplines[0] ?? ""}
                onChange={(e) => {
                  const d = disciplines.find((x) => x.name === e.target.value);
                  patch({
                    disciplines: d ? [d.name] : [],
                    style: d?.style,
                    hp: d ? { current: d.hp, max: d.hp } : char.hp,
                    // reset techniques when discipline changes
                    techniques: [],
                  });
                }}
              >
                <option value="">Choose a discipline…</option>
                {[...disciplines]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} · {d.style} · {d.hp} HP
                    </option>
                  ))}
              </select>
            </div>

            {chosenDiscipline && (
              <div className="space-y-3 rounded-md bg-gold/5 p-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <span className="tag bg-maroon/10 text-maroon">{chosenDiscipline.hp} HP</span>
                  <span className="tag bg-gold/20 text-gold-dark">{chosenDiscipline.style} Style</span>
                  <span className="tag bg-ink/10 text-ink/70">{chosenDiscipline.faction}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="field-label">Weapon (choose 1)</label>
                    <input
                      className="field-input"
                      value={char.weapon ?? ""}
                      onChange={(e) => patch({ weapon: e.target.value })}
                      placeholder={chosenDiscipline.weaponSuggestions}
                    />
                    <p className="mt-1 text-xs text-ink/60">
                      Suggested: {chosenDiscipline.weaponSuggestions}
                    </p>
                  </div>
                  <div>
                    <label className="field-label">Armor (choose 2)</label>
                    <input
                      className="field-input"
                      value={char.armor ?? ""}
                      onChange={(e) => patch({ armor: e.target.value })}
                      placeholder={chosenDiscipline.armorSuggestions}
                    />
                    <p className="mt-1 text-xs text-ink/60">
                      Suggested: {chosenDiscipline.armorSuggestions}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Techniques */}
        {step === 5 && (
          <div className="space-y-3">
            {!chosenDiscipline && (
              <p className="text-sm text-ink/70">
                Choose a Discipline first (step 5) to see its Techniques.
              </p>
            )}
            {chosenDiscipline && (
              <>
                <p className="text-sm text-ink/70">
                  At creation, choose <strong>2 Techniques</strong> from your
                  Discipline (respect prerequisites). You may equip up to{" "}
                  {MAX_EQUIPPED_TECHNIQUES} in Violence.
                </p>
                <p className="text-sm font-semibold text-maroon">
                  Selected: {char.techniques.length}
                </p>
                <div className="grid gap-2">
                  {availableTechniques.map((t) => {
                    const checked = char.techniques.includes(t.name);
                    const missingPrereq = t.prereqNames.filter(
                      (p) => !char.techniques.some((sel) => sel.toLowerCase().includes(p.toLowerCase())),
                    );
                    return (
                      <label
                        key={t.name}
                        className={`cursor-pointer rounded-md border-2 p-3 transition ${
                          checked ? "border-gold bg-gold/10" : "border-maroon/20 hover:border-maroon"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTechnique(t.name)}
                            className="mt-1 h-4 w-4 accent-gold"
                          />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-display font-bold text-maroon">{t.name}</span>
                              {t.isEnlightenment && (
                                <span className="tag bg-gold text-white">Enlightenment</span>
                              )}
                              {t.prereqNames.length > 0 && (
                                <span className="text-xs text-ink/60">
                                  Requires: {t.prereqNames.join(", ")}
                                </span>
                              )}
                            </div>
                            {!checked && missingPrereq.length > 0 && (
                              <p className="mt-0.5 text-xs text-maroon">
                                ⚠ Missing prerequisite: {missingPrereq.join(", ")}
                              </p>
                            )}
                            <ul className="mt-1 list-disc pl-5 text-xs text-ink/80">
                              {t.description.map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 6: Alignments & Abilities */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="field-label">Alignments</label>
                <span
                  className={`text-xs font-semibold ${
                    alignmentTotal === 14 ? "text-green-700" : "text-maroon"
                  }`}
                >
                  Total {alignmentTotal} / 14 (spread 4,3,3,2,2)
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-5">
                {ELEMENTS.map((el) => (
                  <Stepper
                    key={el}
                    label={cap(el)}
                    value={char.alignments[el]}
                    min={0}
                    max={ALIGNMENT_MAX}
                    onChange={(v) =>
                      patch({ alignments: { ...char.alignments, [el]: v } })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {(["sword", "crown", "mask"] as const).map((role) => (
                <div key={role}>
                  <label className="field-label">
                    {cap(role)}{" "}
                    <span className="font-normal normal-case text-ink/50">
                      ({role === "sword" ? "Natural" : role === "crown" ? "Tender/Vuln." : "Barrier/Cond."})
                    </span>
                  </label>
                  <select
                    className="field-input"
                    value={char.alignmentRoles?.[role] ?? ""}
                    onChange={(e) => setAlignmentRole(role, e.target.value as Element)}
                  >
                    <option value="">—</option>
                    {ELEMENTS.map((el) => (
                      <option key={el} value={el}>
                        {cap(el)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="field-label">Martial Abilities</label>
                <span className="text-xs font-semibold text-maroon">
                  Total {attrTotal} (base 15 + distribute 2)
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-5">
                {ATTR_KEYS.map((a) => (
                  <Stepper
                    key={a.key}
                    label={a.label}
                    value={char.attributes[a.key]}
                    min={0}
                    max={ATTRIBUTE_MAX}
                    onChange={(v) =>
                      patch({ attributes: { ...char.attributes, [a.key]: v } })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <Stepper
                label="HP (max)"
                value={char.hp.max}
                min={0}
                max={99}
                onChange={(v) => patch({ hp: { current: v, max: v } })}
              />
              <Stepper
                label="Legend"
                value={char.legend}
                min={0}
                max={12}
                onChange={(v) => patch({ legend: v })}
              />
              <Stepper
                label="Honor"
                value={char.honor}
                min={0}
                max={20}
                onChange={(v) => patch({ honor: v })}
              />
              <div className="flex flex-col justify-center rounded-md border-2 border-gold/40 bg-gold/5 px-3 py-2 text-sm">
                <span className="text-xs font-bold uppercase text-gold-dark">Arc {arc.arc} · {arc.name}</span>
                <span>{arc.antingSlots} Anting-Anting slots</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Warband & Gear */}
        {step === 7 && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="field-label">Warband Name</label>
                <input
                  className="field-input"
                  value={char.warband?.name ?? ""}
                  onChange={(e) => patch({ warband: { ...char.warband, name: e.target.value } })}
                />
              </div>
              <div>
                <label className="field-label">Warband Nature</label>
                <input
                  className="field-input"
                  value={char.warband?.nature ?? ""}
                  onChange={(e) => patch({ warband: { ...char.warband, nature: e.target.value } })}
                />
              </div>
              <div>
                <label className="field-label">Warband Conviction</label>
                <input
                  className="field-input"
                  value={char.warband?.conviction ?? ""}
                  onChange={(e) => patch({ warband: { ...char.warband, conviction: e.target.value } })}
                />
              </div>
              <div>
                <label className="field-label">How you met</label>
                <input
                  className="field-input"
                  value={char.warband?.howMet ?? ""}
                  onChange={(e) => patch({ warband: { ...char.warband, howMet: e.target.value } })}
                />
              </div>
            </div>
            <div>
              <label className="field-label">Anting-Anting ({arc.antingSlots} slots at Arc {arc.arc})</label>
              <textarea
                className="field-input"
                rows={2}
                value={char.antingAnting ?? ""}
                onChange={(e) => patch({ antingAnting: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Items</label>
              <textarea
                className="field-input"
                rows={3}
                value={char.items ?? ""}
                onChange={(e) => patch({ items: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Notes</label>
              <textarea
                className="field-input"
                rows={3}
                value={char.notes ?? ""}
                onChange={(e) => patch({ notes: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Nav / Save */}
      <div className="no-print sticky bottom-0 flex items-center justify-between gap-3 rounded-lg border-2 border-maroon bg-parchment/95 p-3 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-outline"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={save} className="btn-gold">
            Save Character
          </button>
          {step < STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="btn-primary"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SubSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <select
        className="field-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
