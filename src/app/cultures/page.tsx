import { cultures } from "@/lib/data";
import Collapsible from "@/components/Collapsible";
import type { NamedDescription } from "@/lib/types";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SubList({ title, items }: { title: string; items: NamedDescription[] }) {
  if (!items?.length) return null;
  return (
    <Collapsible title={title} subtitle={`${items.length} options`}>
      <div className="grid gap-3">
        {items.map((it) => (
          <div key={it.name}>
            <p className="font-semibold text-maroon">{it.name}</p>
            <p className="text-ink/80">{it.description}</p>
          </div>
        ))}
      </div>
    </Collapsible>
  );
}

export default function CulturesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Cultures</h1>
        <p className="mt-1 text-ink/70">
          The peoples of the Sword Isles. Choose one, then discover your
          Subculture, Lineage, and Social Standing.
        </p>
      </div>

      {cultures.map((c) => (
        <section key={c.name} className="space-y-3">
          <h2 className="text-2xl font-bold text-maroon">{cap(c.name)}</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sheet-box p-4">
              <p className="field-label">Honorifics</p>
              <p className="text-sm">{c.honorifics}</p>
            </div>
            <div className="sheet-box p-4">
              <p className="field-label">Naming Convention</p>
              <p className="text-sm">{c.namingConvention}</p>
            </div>
          </div>

          <div className="sheet-box p-4">
            <p className="field-label">Sample Names</p>
            <p className="text-sm">{c.names.join(", ")}</p>
          </div>

          {c.tips?.length > 0 && (
            <div className="sheet-box p-4">
              <p className="field-label">Cultural Tips</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {c.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="sheet-box p-4">
            <p className="field-label">Starting Equipment</p>
            <p className="text-sm">{c.startingEquipment}</p>
          </div>

          <SubList title="Subcultures" items={c.subculture} />
          <SubList title="Lineages" items={c.lineage} />
          <SubList title="Social Standing" items={c.socialStanding} />
        </section>
      ))}
    </div>
  );
}
