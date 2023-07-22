<template>
  <div>
    <v-container v-if="!cultureJSON.map(c => c.name).includes(kadungganan.cultureName)">
      <v-row>
        <v-autocomplete label="Culture" :items="cultureJSON.map(c => c.name)" @blur="saveCulture" v-model="kgCultureName">
        </v-autocomplete>
      </v-row>
    </v-container>
    <v-card>
      <v-card-item>
        <v-card-title>
          CULTURE: {{ kadungganan.cultureName.toUpperCase() }}
        </v-card-title>
      </v-card-item>
      <v-card-text>
        {{ kgCulture?kgCulture.tips:"EMPTY" }}
      </v-card-text>
    </v-card>


    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          SUB-CULTURE
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ kgSubculture }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          LINEAGE
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ kgLineage }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          SOCIAL STANDING
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ kgSocialStanding }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          CONVICTION
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ 'EMPTY LMAO' }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          CONJUNCTURE
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ 'EMPTY LMAO' }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { kadungganan } from '~/models/kadungganan.model';
import { useKadunggananStore } from '~/store/kadunggananStore';
import cultureJSON from '~/data/culture.json';

const loreList: string[] = [
  'cultureName',
  'subcultureName',
  'lineageName',
  'socialStandingName',
  'conviction',
  'conjuncture',
]

const props = defineProps({
  kgId: { type: String, required: true }
})

const kgStore = useKadunggananStore()

const kadungganan = computed(() => kgStore.getKadunggananById(String(props.kgId)))

const kgCulture = computed(() => cultureJSON.find((c) => c.name == kadungganan.value.cultureName))
const kgSubculture = computed(() => cultureJSON.find((c) => c.name == kadungganan.value.cultureName))
const kgLineage = computed(() => cultureJSON.find((c) => c.name == kadungganan.value.cultureName))
const kgSocialStanding = computed(() => cultureJSON.find((c) => c.name == kadungganan.value.cultureName))


const kgCultureName = ref(kadungganan.value.cultureName)
const kgSubcultureName = ref(kadungganan.value.subcultureName)
const kgLineageName = ref(kadungganan.value.lineageName)
const kgSocialStandingName = ref(kadungganan.value.socialStandingName)

function saveCulture() {
  kgStore.editKadunggananCultureName(props.kgId, kgCultureName.value)
  console.log(kgCultureName.value)
}

</script>

<style scoped></style>