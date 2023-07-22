<template>
  <div>
    <v-btn @click="addNewKadungganan">Add New Kadungganan</v-btn>
    <v-card v-for="kg in getKadungganans" :to="`/kadungganan/${kg.id}`" nuxt>{{ kg.id }}</v-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useKadunggananStore } from '~/store/kadunggananStore';

const kgStore = useKadunggananStore()
const {getKadungganans} = storeToRefs(kgStore)

function addNewKadungganan(){
  kgStore.addNewKadungganan()
}
</script>

<style scoped>

</style>