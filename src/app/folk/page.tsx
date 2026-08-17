import { folk } from "@/lib/data";

export default function FolkPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-maroon">Folk</h1>
        <p className="mt-1 text-ink/70">
          The ancestral kinds of the Sword Isles. Folk are a cosmetic choice —
          all kinds are found across the isles.
        </p>
      </div>

      <div className="grid gap-5">
        {folk.map((f) => (
          <section key={f.name} className="sheet-box p-5">
            <h2 className="font-display text-2xl font-bold text-maroon">{f.name}</h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed">
              {f.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
