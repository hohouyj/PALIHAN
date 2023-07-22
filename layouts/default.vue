<template>
  <v-app>
    <div>
      <header class="shadow-sm bg-white">
        <nav class="mx-auto p-4 flex justify-between">
          <NuxtLink to="/" class="font-bold">PALIHAN</NuxtLink>
          <ul class="flex gap-4">
            <li>
              <NuxtLink to="/kadungganan">Kadungganan</NuxtLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <v-divider></v-divider>
    <div>
      <slot />
    </div>
  </v-app>
</template>

<style scoped></style>