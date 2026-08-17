// Types mirroring the JSON data files under /data

export interface DisciplineTrait {
  name: string;
  lore: string;
  description: string;
}

export interface ViolenceMove {
  name: string;
  actionCost: string;
  lore: string;
  description: string;
}

export interface Discipline {
  name: string;
  hp: number;
  style: string;
  weaponSuggestions: string;
  armorSuggestions: string;
  traits: DisciplineTrait[];
  violence: ViolenceMove[];
  faction: string;
}

export interface Technique {
  name: string;
  disciplineName: string;
  isEnlightenment: boolean;
  lore: string;
  description: string[];
  prereqNames: string[];
}

export interface NamedDescription {
  name: string;
  description: string;
}

export interface Culture {
  name: string;
  honorifics: string;
  namingConvention: string;
  names: string[];
  tips: string[];
  startingEquipment: string;
  subculture: NamedDescription[];
  lineage: NamedDescription[];
  socialStanding: NamedDescription[];
}

export interface Folk {
  name: string;
  description: string[];
}

export interface Background {
  complications: string[];
  conjunctures: string[];
  conviction: string[];
  debts: string[];
}

// ---- Character (persisted to localStorage) ----

export type Element = "fire" | "water" | "metal" | "air" | "earth";

export const ELEMENTS: Element[] = ["fire", "water", "metal", "air", "earth"];

export interface Character {
  id: string;
  name: string;
  pronouns?: string;
  player?: string;
  playerPronouns?: string;
  portrait?: string; // data URL
  folk?: string;
  culture?: {
    name: string;
    subculture?: string;
    lineage?: string;
    socialStanding?: string;
  };
  background?: {
    conviction?: string;
    conjuncture?: string;
    complications?: string;
    debts?: string;
  };
  // Spread 4,3,3,2,2 across the five elements. +1 each time Legend grows, max 6.
  alignments: { fire: number; water: number; metal: number; air: number; earth: number };
  // Sword = Natural Element, Crown = Tender (Vulnerability), Mask = Barrier (Conditioning)
  alignmentRoles?: { sword?: Element; crown?: Element; mask?: Element };
  legend: number;
  honor: number;
  hp: { current: number; max: number };
  // Martial Abilities: each starts at 3, distribute +2 at creation, +1 per Legend, max 7
  attributes: { brv: number; fth: number; pos: number; res: number; spd: number };
  disciplines: string[];
  style?: string;
  techniques: string[];
  antingAnting?: string;
  weapon?: string;
  armor?: string;
  items?: string;
  warband?: {
    name?: string;
    nature?: string;
    conviction?: string;
    howMet?: string;
  };
  notes?: string;
  createdAt: number;
  updatedAt: number;
}
