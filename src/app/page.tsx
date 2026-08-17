import Link from "next/link";
import { disciplines, techniques, cultures, folk } from "@/lib/data";

const SECTIONS = [
  {
    href: "/disciplines",
    title: "Disciplines",
    blurb: "Martial paths of the Kadungganan — traits, violence, and style.",
    count: () => disciplines.length,
  },
  {
    href: "/techniques",
    title: "Techniques",
    blurb: "Learnable moves and Enlightenments across every discipline.",
    count: () => techniques.length,
  },
  {
    href: "/cultures",
    title: "Cultures",
    blurb: "Peoples of the Sword Isles: honorifics, lineages, and standing.",
    count: () => cultures.length,
  },
  {
    href: "/folk",
    title: "Folk",
    blurb: "The ancestral kinds that walk the isles.",
    count: () => folk.length,
  },
  {
    href: "/backgrounds",
    title: "Backgrounds",
    blurb: "Convictions, conjunctures, complications, and debts to roll.",
    count: () => null,
  },
  {
    href: "/characters",
    title: "My Characters",
    blurb: "Build and store Kadungganan sheets — saved in your browser.",
    count: () => null,
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-xl border-2 border-maroon bg-white/70 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
          The Sword Isles
        </p>
        <h1 className="mt-2 text-4xl font-bold text-maroon sm:text-5xl">
          Gubat Banwa
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink/80">
          A compendium and character builder for the Filipino martial-arts
          TTRPG of war, honor, and the diwata. Browse the disciplines and their
          techniques, learn the cultures and folk, then forge a Kadungganan of
          your own — stored right here in your browser.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/characters/new" className="btn-gold">
            Build a Character
          </Link>
          <Link href="/disciplines" className="btn-outline">
            Browse Disciplines
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => {
          const c = s.count();
          return (
            <Link key={s.href} href={s.href} className="card group">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-maroon group-hover:text-maroon-dark">
                  {s.title}
                </h2>
                {c !== null && (
                  <span className="tag bg-gold/20 text-gold-dark">{c}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink/70">{s.blurb}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
