"use client";

import { useState } from "react";

interface Props {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function Collapsible({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sheet-box overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 bg-maroon px-3 py-2 text-left text-parchment"
      >
        <span className="font-display font-semibold">
          {title}
          {subtitle && (
            <span className="ml-2 text-xs font-normal opacity-80">{subtitle}</span>
          )}
        </span>
        <span className="text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="p-4 text-sm leading-relaxed">{children}</div>}
    </div>
  );
}
