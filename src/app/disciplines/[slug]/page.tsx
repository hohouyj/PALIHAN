import Link from "next/link";
import { notFound } from "next/navigation";
import {
  disciplines,
  getDiscipline,
  slugify,
  techniquesForDiscipline,
} from "@/lib/data";

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: slugify(d.name) }));
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) notFound();

  const techs = techniquesForDiscipline(d.name);
  const base = techs.filter((t) => !t.isEnlightenment);
  const enlightenments = techs.filter((t) => t.isEnlightenment);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/disciplines" className="text-sm text-maroon hover:underline">
          ← All disciplines
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-maroon">{d.name}</h1>
          <span className="tag bg-maroon/10 text-maroon">{d.hp} HP</span>
          <span className="tag bg-gold/20 text-gold-dark">{d.style}</span>
          {d.faction && <span className="tag bg-ink/10 text-ink/70">{d.faction}</span>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sheet-box p-4">
          <p className="field-label">Weapon Suggestions</p>
          <p className="text-sm">{d.weaponSuggestions}</p>
        </div>
        <div className="sheet-box p-4">
          <p className="field-label">Armor Suggestions</p>
          <p className="text-sm">{d.armorSuggestions}</p>
        </div>
      </div>

      {/* Traits */}
      <section className="space-y-3">
        <h2 className="sheet-header inline-block">Discipline Traits</h2>
        <div className="grid gap-3">
          {d.traits.map((t) => (
            <div key={t.name} className="sheet-box p-4">
              <h3 className="font-display text-lg font-bold text-maroon">{t.name}</h3>
              {t.lore && <p className="mt-1 text-sm italic text-ink/60">{t.lore}</p>}
              <p className="mt-2 whitespace-pre-line text-sm">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inflict Violences */}
      {d.violence?.length > 0 && (
        <section className="space-y-3">
          <h2 className="sheet-header inline-block">Inflict Violences</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.violence.map((v) => (
              <div key={v.name} className="sheet-box p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display font-bold text-maroon">{v.name}</h3>
                  {v.actionCost && (
                    <span className="tag bg-gold/20 text-gold-dark">
                      {v.actionCost} Beat
                    </span>
                  )}
                </div>
                {v.lore && <p className="mt-1 text-sm italic text-ink/60">{v.lore}</p>}
                <p className="mt-2 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Techniques */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="sheet-header-gold inline-block">Techniques</h2>
          <Link
            href={`/techniques?discipline=${encodeURIComponent(d.name)}`}
            className="text-sm text-maroon hover:underline"
          >
            View in Techniques →
          </Link>
        </div>
        <TechList list={base} />

        {enlightenments.length > 0 && (
          <>
            <h3 className="mt-4 font-display text-lg font-bold text-gold-dark">
              Enlightenments
            </h3>
            <TechList list={enlightenments} />
          </>
        )}
        {techs.length === 0 && (
          <p className="text-sm text-ink/60">No techniques recorded for this discipline.</p>
        )}
      </section>
    </div>
  );
}

function TechList({
  list,
}: {
  list: ReturnType<typeof techniquesForDiscipline>;
}) {
  return (
    <div className="grid gap-3">
      {list.map((t) => (
        <div key={t.name} className="sheet-box-gold p-4">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="font-display font-bold text-maroon">{t.name}</h4>
            {t.prereqNames.length > 0 && (
              <span className="text-xs text-ink/60">
                Requires: {t.prereqNames.join(", ")}
              </span>
            )}
          </div>
          {t.lore && <p className="mt-1 text-sm italic text-ink/60">{t.lore}</p>}
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {t.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
