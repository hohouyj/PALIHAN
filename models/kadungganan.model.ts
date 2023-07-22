import { discipline } from "./discipline.model"

export interface kadungganan{
  id: string,
	name: string,
	pronouns: string,
	thunderboltTokens: number,
	folk: string,
	legend: number,
	honor: number,
	cultureName: string,
	subcultureName: string,
  lineageName: string,
	socialStandingName: string,
	conviction: string,
	conjuncture: string,
	alignmentsNarrative: alignmentsNarrative,
	inventory: string[],
	complications: string[],
	debt: string[],
	disciplineName: string,
	// disciplineStyle: string,
	hp: number,
	alignmentsViolence: alignmentsViolence,
	weapon: string[],
	armor: string[],
	consumables: string[],
	learnedTechniques: string[],
	equippedTechniques: string[],
	learnedEnlightenments: string[],
	equippedEnlightenment: string
}

interface alignmentsNarrative {
	fire: number,
	water: number,
	metal: number,
	air: number,
	earth: number
}

interface alignmentsViolence{
	bravery: number,
	faith: number,
	posture: number,
	resistance: number,
	speed: number
}