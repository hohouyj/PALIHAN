"use client";

import Link from "next/link";
import { useCharacters, deleteCharacter } from "@/lib/storage";
import { legendArc } from "@/lib/data";

export default function CharactersPage() {
  const { characters, ready } = useCharacters();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-maroon">My Characters</h1>
          <p className="mt-1 text-ink/70">Stored locally in this browser.</p>
        </div>
        <Link href="/characters/new" className="btn-gold">
          + New Character
        </Link>
      </div>

      {!ready ? (
        <p className="text-ink/60">Loading…</p>
      ) : characters.length === 0 ? (
        <div className="sheet-box p-8 text-center">
          <p className="text-ink/70">No Kadungganan yet.</p>
          <Link href="/characters/new" className="btn-primary mt-4">
            Forge your first
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {characters
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((c) => {
              const arc = legendArc(c.legend);
              return (
                <div key={c.id} className="card flex flex-col">
                  <Link href={`/characters/${c.id}`} className="flex-1">
                    <div className="flex items-center gap-3">
                      {c.portrait ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.portrait}
                          alt=""
                          className="h-12 w-12 rounded-md border-2 border-maroon object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-maroon/30 bg-maroon/5 font-display text-xl text-maroon">
                          {(c.name || "?").charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-bold text-maroon">
                          {c.name || "Unnamed"}
                        </p>
                        <p className="truncate text-xs text-ink/60">
                          {[c.folk, c.disciplines[0]].filter(Boolean).join(" · ") || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="tag bg-maroon/10 text-maroon">
                        Legend {c.legend} · Arc {arc.arc}
                      </span>
                      {c.style && (
                        <span className="tag bg-gold/20 text-gold-dark">{c.style}</span>
                      )}
                    </div>
                  </Link>
                  <div className="mt-3 flex items-center justify-end gap-3 border-t border-maroon/10 pt-2 text-sm">
                    <Link href={`/characters/${c.id}/edit`} className="text-maroon hover:underline">
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete "${c.name || "Unnamed"}"? This cannot be undone.`))
                          deleteCharacter(c.id);
                      }}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
