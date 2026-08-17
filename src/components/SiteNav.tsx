"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/disciplines", label: "Disciplines" },
  { href: "/techniques", label: "Techniques" },
  { href: "/cultures", label: "Cultures" },
  { href: "/folk", label: "Folk" },
  { href: "/backgrounds", label: "Backgrounds" },
  { href: "/advancement", label: "Advancement" },
  { href: "/characters", label: "My Characters" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-30 border-b-2 border-maroon bg-maroon text-parchment shadow-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
        <Link href="/" className="mr-2 font-display text-xl font-bold tracking-wide">
          Gubat Banwa
        </Link>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
          {LINKS.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-2.5 py-1 transition hover:bg-parchment/20 ${
                  active ? "bg-parchment/25 font-semibold" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
