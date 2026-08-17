"use client";

import { use } from "react";
import Link from "next/link";
import CharacterBuilder from "@/components/CharacterBuilder";
import { useCharacter } from "@/lib/storage";

export default function EditCharacterPage({
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

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-maroon">Edit {character.name}</h1>
      <CharacterBuilder initial={character} />
    </div>
  );
}
