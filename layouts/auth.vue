<template>
  <v-app class="app">
    <v-main class="main" style="background: rgb(var(--v-theme-background))">
      <slot />
    </v-main>
    <Teleport to="body">
      <LazyAlert />
      <LazyLoader />
    </Teleport>
    <LazyDialog />
    <!-- <LazyPartialsIconsPackSymbols /> -->
  </v-app>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
const router = useRouter();
onBeforeMount(async () => {
})
</script>

<style lang="scss" scoped>
.app {
  position: relative;

  main {
    position: relative;
  }

  section {
    padding: 30px 0;
  }


  // overflow-x: hidden;

}
</style>
