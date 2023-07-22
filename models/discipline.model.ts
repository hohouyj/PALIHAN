export interface discipline {
	name: string,
	hp: number,
	style: string,
	weaponSuggestions: string,
	armorSuggestions: string,
	traits: trait[],
	inflictViolence: inflictViolence[],
  faction: string
}

interface inflictViolence {
	name: string,
	actionCost: number,
	lore: string,
	description: string
}

interface trait {
	name: string,
	lore: string,
	description: string
}
