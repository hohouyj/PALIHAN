export interface culture {
 name:string,
 honorifics: string,
 namingConvention: string,
 names: string[],
 tips: string[],
 startingEquipment: string,
 subculture: genericTrait[],
 lineage: genericTrait[],
 socialStanding: genericTrait[]
}

interface genericTrait{
  name: string,
  description: string
}