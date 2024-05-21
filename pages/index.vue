<template>
  <v-container fluid class="index h-100">
    <v-row class="h-100">
      <v-col cols="12" class="d-flex justify-center align-center">
        <UsersProfile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
definePageMeta({ layout: "default", middleware: "auth", title: 'Главная' });
const route = useRoute();
const items = [
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' },
]
onBeforeMount(async () => {

})
</script>

<style lang="scss" scoped>
.index {
  @media (min-width: 960px) {
    padding: 16px 2px;
  }
}
</style>
