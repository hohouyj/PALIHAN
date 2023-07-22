<template>
  <div>
    <!-- <pre>{{ kadunggananId }}</pre> -->
    <pre>{{ kadungganan }}</pre>
    <v-sheet class="kgsheet">
      <v-card>
        <v-card-item>
          <v-card-title v-if="!isRenaming" @click="showRenameInput">{{ kadungganan.name ? kadungganan.name : 'RENAME ME'
          }}</v-card-title>
          <v-text-field ref="renameInput" v-else label="Rename" v-model="newName" @blur="renameKadungganan"
            @keyup.enter="renameKadungganan"></v-text-field>
        </v-card-item>
      </v-card>
      <KadunggananCulture :kgId="String(kadunggananId)"/>

    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useKadunggananStore } from '~/store/kadunggananStore';



const { kadunggananId } = useRoute().params

const kgStore = useKadunggananStore()

const kadungganan = computed(() => kgStore.getKadunggananById(String(kadunggananId)))

const isRenaming = ref(false)

const newName = ref(kadungganan.value.name)

const renameInput = ref<HTMLInputElement | null>(null)

function renameKadungganan() {
  kgStore.renameKadungganan(String(kadunggananId), newName.value)
  isRenaming.value = false
}

async function showRenameInput() {
  isRenaming.value = true
  await nextTick()
  renameInput.value?.focus()
}
</script>

<style scoped>
.kgsheet {
  width: 794px;
  height: 1123px;
  margin: 10px;
  padding: 10px;
}
</style>