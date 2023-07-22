import { defineStore } from "pinia";
import { kadungganan } from "~/models/kadungganan.model";
import { v4 as uuidv4 } from "uuid"

export type RootState = {
  kadungganans: kadungganan[]
}

function getEmptyKadungganan(): kadungganan {
  return {
    id: '',
    name: '',
    pronouns: '',
    thunderboltTokens: 0,
    folk: '',
    legend: 0,
    honor: 0,
    cultureName: '',
    subcultureName: '',
    lineageName: '',
    socialStandingName: '',
    conviction: '',
    conjuncture: '',
    alignmentsNarrative: {
      fire: 4,
      water: 3,
      metal: 3,
      air: 2,
      earth: 2
    },
    inventory: [],
    complications: [],
    debt: [],
    disciplineName: '',
    hp: 0,
    alignmentsViolence: {
      bravery: 3,
      faith: 3,
      posture: 3,
      resistance: 3,
      speed: 3
    },
    weapon: [],
    armor: [],
    consumables: [],
    learnedTechniques: [],
    equippedTechniques: [],
    learnedEnlightenments: [],
    equippedEnlightenment: ''
  }
}

export const useKadunggananStore = defineStore({
  persist: {
    storage: persistedState.localStorage
  },
  id: "kadunggananStore",
  state: () => ({
    kadungganans: []
  } as RootState),
  getters: {
    getKadunggananById: (state) => {
      return (kgId: string): kadungganan => {
        let kg = state.kadungganans.find((kg) => kg.id == kgId)
        return kg ? kg : getEmptyKadungganan()
      }
    },
    getKadungganans: (state) => state.kadungganans
  },
  actions: {
    addNewKadungganan() {
      let newKadungganan = getEmptyKadungganan()
      newKadungganan.id = uuidv4()
      this.kadungganans.push(newKadungganan)
    },
    getKadunggananIdxById(id: string): number {
      return this.kadungganans.findIndex((kg) => kg.id == id)
    },
    renameKadungganan(kgId: string, name: string) {
      if (this.getKadunggananIdxById(kgId) >= 0) {
        this.kadungganans[this.getKadunggananIdxById(kgId)].name = name
      }
    },
    editKadunggananCultureName(kgId:string, cultureName:string){
      if (this.getKadunggananIdxById(kgId) >= 0) {
        this.kadungganans[this.getKadunggananIdxById(kgId)].cultureName = cultureName
      }
    },
    editKadunggananSubCultureName(kgId:string, subcultureName:string){
      if (this.getKadunggananIdxById(kgId) >= 0) {
        this.kadungganans[this.getKadunggananIdxById(kgId)].subcultureName = subcultureName
      }
    },
    editKadunggananLineageName(kgId:string, lineageName:string){
      if (this.getKadunggananIdxById(kgId) >= 0) {
        this.kadungganans[this.getKadunggananIdxById(kgId)].lineageName = lineageName
      }
    },
    editKadunggananSocialStandingName(kgId:string, socialStandingName:string){
      if (this.getKadunggananIdxById(kgId) >= 0) {
        this.kadungganans[this.getKadunggananIdxById(kgId)].socialStandingName = socialStandingName
      }
    }

  }
}

)