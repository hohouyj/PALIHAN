"use client";

import { useCallback, useEffect, useState } from "react";
import type { Character } from "./types";

const KEY = "gubat-banwa:characters";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadCharacters(): Character[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Character[]) : [];
  } catch {
    return [];
  }
}

function saveAll(chars: Character[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(chars));
  // notify listeners in the same tab
  window.dispatchEvent(new Event("gb-characters-changed"));
}

function makeId(): string {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `c_${Math.floor(Math.random() * 1e9).toString(36)}${Date.now().toString(36)}`;
}

export function emptyCharacter(): Character {
  const now = Date.now();
  return {
    id: makeId(),
    name: "",
    alignments: { fire: 4, water: 3, metal: 3, air: 2, earth: 2 },
    alignmentRoles: {},
    legend: 0,
    honor: 0,
    hp: { current: 0, max: 0 },
    // Each Martial Ability starts at 3; distribute +2 among them at creation.
    attributes: { brv: 3, fth: 3, pos: 3, res: 3, spd: 3 },
    disciplines: [],
    techniques: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function getCharacter(id: string): Character | undefined {
  return loadCharacters().find((c) => c.id === id);
}

export function upsertCharacter(char: Character): Character {
  const chars = loadCharacters();
  const idx = chars.findIndex((c) => c.id === char.id);
  const updated = { ...char, updatedAt: Date.now() };
  if (idx >= 0) chars[idx] = updated;
  else chars.push(updated);
  saveAll(chars);
  return updated;
}

export function deleteCharacter(id: string): void {
  saveAll(loadCharacters().filter((c) => c.id !== id));
}

// React hook: list of characters, reactive to changes in this tab and others
export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setCharacters(loadCharacters());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
    const onChange = () => refresh();
    window.addEventListener("storage", onChange);
    window.addEventListener("gb-characters-changed", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("gb-characters-changed", onChange);
    };
  }, [refresh]);

  return { characters, ready, refresh };
}

export function useCharacter(id: string | undefined) {
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id) {
      setReady(true);
      return;
    }
    setCharacter(getCharacter(id));
    setReady(true);
    const onChange = () => setCharacter(getCharacter(id));
    window.addEventListener("gb-characters-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("gb-characters-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [id]);

  return { character, ready };
}
