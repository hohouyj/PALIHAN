"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search…"}
        className="field-input pl-9"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-maroon/50">
        ⌕
      </span>
    </div>
  );
}
