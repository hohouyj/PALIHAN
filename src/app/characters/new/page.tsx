import CharacterBuilder from "@/components/CharacterBuilder";

export default function NewCharacterPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-maroon">Forge a Kadungganan</h1>
      <p className="text-ink/70">
        Follow the Path. Your character is saved only in this browser.
      </p>
      <CharacterBuilder />
    </div>
  );
}
