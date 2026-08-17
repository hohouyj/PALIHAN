const ARCS = [
  {
    arc: "Arc 1 — Earth",
    legend: "Legend 0–2",
    form: "Base Form",
    antingSlots: 2,
    blurb:
      "The Kadungganan still have their feet upon the ground — trained, but with little combat experience. They must go make their names known.",
  },
  {
    arc: "Arc 2 — Lightning",
    legend: "Legend 3–5",
    form: "Refined Form (new name)",
    antingSlots: 3,
    blurb:
      "Rising above and taking on greater challenges. Something about them has changed physically; they take a sobriquet reflecting their exploits.",
  },
  {
    arc: "Arc 3 — Heaven",
    legend: "Legend 6–8",
    form: "Perfected Form (final name)",
    antingSlots: 4,
    blurb:
      "At their peak, on the cusp of Glory — liberation from the wheel of violence. They match gods and goddesses with their visages.",
  },
];

const STYLES = [
  { name: "Sentinel", beats: "Raider", desc: "Defense and water-buffalo tenacity; mitigates the most damage but slower." },
  { name: "Raider", beats: "Sharpshooter", desc: "Movement, fluidity, and damage up close; vulnerable to lockdown." },
  { name: "Sharpshooter", beats: "Witch", desc: "Long-ranged, dependable damage and area effects; weak up close." },
  { name: "Witch", beats: "Sentinel", desc: "Eviscerating attacks, area denial, conditions; lowest defenses." },
  { name: "Medium", beats: "—", desc: "Versatile support and esoteric effects; average across the board." },
];

export default function AdvancementPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Advancement — Legend</h1>
        <p className="mt-1 max-w-3xl text-ink/70">
          Legend represents a Kadungganan&apos;s combat prowess, fame, and rising
          glory. It starts at <strong>0</strong> and ends at <strong>8</strong>,
          cut into three Arcs — the Glory Path.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {ARCS.map((a) => (
          <div key={a.arc} className="sheet-box p-4">
            <h2 className="font-display text-xl font-bold text-maroon">{a.arc}</h2>
            <p className="mt-1 text-sm font-semibold text-gold-dark">{a.legend}</p>
            <p className="mt-2 text-sm">{a.blurb}</p>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Form</dt>
                <dd className="font-medium">{a.form}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Anting-Anting Slots</dt>
                <dd className="font-medium">{a.antingSlots}</dd>
              </div>
            </dl>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="sheet-header inline-block">When your Legend Grows</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm">
          <li>Gain <strong>2 new Techniques</strong> from any Discipline.</li>
          <li>Add <strong>+1 to any Alignment</strong> (max 7).</li>
          <li>Add <strong>1 point to your Martial Abilities</strong> (max 7).</li>
          <li>
            Gain an <strong>Anting-Anting</strong> at Legend 1, 3, 5, and 7. You
            cannot equip more Anting-Anting than you have slots.
          </li>
        </ul>
        <p className="text-sm text-ink/70">
          Past Legend 8 you gain no more Legends; instead, each time you would
          grow you gain a new Technique.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="sheet-header inline-block">Equipped Techniques</h2>
        <p className="text-sm">
          A Kadungganan can only focus on <strong>10 Techniques</strong> at a time
          in Violence (meditating on the Ten-Armed God), even if they know more.
          There is an <strong>11th slot</strong> reserved for a single{" "}
          <strong>Enlightenment</strong>, which you may equip regardless of your
          current Discipline.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="sheet-header inline-block">Discipline Styles</h2>
        <p className="text-sm text-ink/70">
          Each Discipline belongs to one of five Styles — its preferred role in
          combat. The Styles form a cycle of advantage (&ldquo;laughs at&rdquo;).
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {STYLES.map((s) => (
            <div key={s.name} className="sheet-box p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-maroon">
                  {s.name}
                </h3>
                <span className="tag bg-gold/20 text-gold-dark">
                  {s.beats === "—" ? "Neutral" : `Laughs at ${s.beats}`}
                </span>
              </div>
              <p className="mt-1 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="sheet-header inline-block">Alternative: Combat Legend</h2>
        <p className="text-sm">
          If you don&apos;t want to track marking, raise Legend by 1 after every 5
          Violences — treating Violences as milestones.
        </p>
      </section>
    </div>
  );
}
