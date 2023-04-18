<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="disciplineName in getDisciplines()">
        <v-expansion-panel-title>{{ disciplineName }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card>
            <v-card-item>
              <v-card-title>
                HP:{{ getDisciplineByName(disciplineName).hp }} {{ getDisciplineByName(disciplineName).style }}
              </v-card-title>
              <v-card-subtitle>
                {{ getDisciplineByName(disciplineName).faction }}
              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <h2>Traits</h2>
              <v-card v-for="trait in getDisciplineByName(disciplineName).traits"
              :title="trait.name"
              :subtitle="trait.lore"
              :text="trait.description"
              >
              </v-card>
              <h2>Violences</h2>
              <v-card v-for="violence in getDisciplineByName(disciplineName).violence"
              :title="violence.name+' ['+violence.actionCost+']'"
              :subtitle="violence.lore"
              :text="violence.description"
              >
              </v-card>
            </v-card-text>
          </v-card>
          <h2>Techniques</h2>
          <v-card v-for="tech in getTechniquesByDiscipline(disciplineName)">
            <v-card-item>
              <v-card-title>
                {{ tech.name }}
              </v-card-title>
              <v-card-subtitle>
                <span v-if="tech.isEnlightenment">
                  ENLIGHTENMENT
                </span>
                <span v-for="prereq in tech.prereqNames">
                  {{ prereq + ' ' }}
                </span>

              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <p>
                {{ tech.lore }}
              </p>
              <p v-for="line in tech.description">
                {{ line }}
              </p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import techniques from '../../data/techniques.json'
import disciplines from '../../data/disciplines.json'
function getDisciplines() {
  let disc: string[] = []
  for (const tech of techniques) {
    if (tech.disciplineName) {
      if (!disc.includes(tech.disciplineName)) {
        disc.push(tech.disciplineName)
      }
    }

  }
  return disc
}

function getTechniquesByDiscipline(disciplineName: string) {
  return techniques.filter((tech) => tech.disciplineName == disciplineName)
}

function getDisciplineByName(disciplineName: string) {
  return disciplines.filter((disc) => disc.name == disciplineName)[0]
}

</script>

<style scoped></style>