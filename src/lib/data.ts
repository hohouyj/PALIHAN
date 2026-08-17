import disciplinesRaw from "@data/disciplines.json";
import techniquesRaw from "@data/techniques.json";
import culturesRaw from "@data/culture.json";
import folkRaw from "@data/folk.json";
import backgroundRaw from "@data/background.json";

import type {
  Discipline,
  Technique,
  Culture,
  Folk,
  Background,
} from "./types";

export const disciplines: Discipline[] = (
  disciplinesRaw as { disciplines: Discipline[] }
).disciplines;

export const techniques: Technique[] = (
  techniquesRaw as { techniques: Technique[] }
).techniques;

export const cultures: Culture[] = culturesRaw as Culture[];
export const folk: Folk[] = folkRaw as Folk[];
export const background: Background = backgroundRaw as Background;

// ---- helpers ----

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDiscipline(slug: string): Discipline | undefined {
  return disciplines.find((d) => slugify(d.name) === slug);
}

// disciplineName casing is inconsistent in techniques.json (e.g. "KAWAL" vs "Kawal")
export function techniquesForDiscipline(disciplineName: string): Technique[] {
  const target = disciplineName.toLowerCase();
  return techniques.filter((t) => t.disciplineName.toLowerCase() === target);
}

export const styles: string[] = Array.from(
  new Set(disciplines.map((d) => d.style).filter(Boolean)),
).sort();

export const factions: string[] = Array.from(
  new Set(disciplines.map((d) => d.faction).filter(Boolean)),
).sort();

// Discipline names, canonicalized, for technique filtering
export const disciplineNames: string[] = disciplines
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b));

// ---- Advancement / Legend (rulebook p.192) ----

export const MAX_EQUIPPED_TECHNIQUES = 10; // + 1 Enlightenment slot
export const ATTRIBUTE_MAX = 7;
export const ALIGNMENT_MAX = 7;

export interface LegendArc {
  arc: 1 | 2 | 3;
  name: string; // Earth / Lightning / Heaven
  antingSlots: number;
  formName: string;
}

export function legendArc(legend: number): LegendArc {
  if (legend <= 2) return { arc: 1, name: "Earth", antingSlots: 2, formName: "Base Form" };
  if (legend <= 5) return { arc: 2, name: "Lightning", antingSlots: 3, formName: "Refined Form" };
  return { arc: 3, name: "Heaven", antingSlots: 4, formName: "Perfected Form" };
}

// Style rock-paper-scissors ("X laughs at Y"). Medium is neutral.
export const STYLE_MATCHUPS: Record<string, string> = {
  Sentinel: "Raider",
  Raider: "Sharpshooter",
  Sharpshooter: "Witch",
  Witch: "Sentinel",
};
