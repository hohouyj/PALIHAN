"use client";

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (v: string | null) => void;
  allLabel?: string;
}

export default function FilterChips({
  options,
  selected,
  onSelect,
  allLabel = "All",
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`tag border-2 transition ${
          selected === null
            ? "border-maroon bg-maroon text-parchment"
            : "border-maroon/30 bg-white text-maroon hover:border-maroon"
        }`}
      >
        {allLabel}
      </button>
      {options.map((opt, i) => (
        <button
          key={opt || i}
          type="button"
          onClick={() => onSelect(opt)}
          className={`tag border-2 transition ${
            selected === opt
              ? "border-maroon bg-maroon text-parchment"
              : "border-maroon/30 bg-white text-maroon hover:border-maroon"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
