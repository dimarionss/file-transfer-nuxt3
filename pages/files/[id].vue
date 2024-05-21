<template>
  <v-container fluid class="index h-100">
    <v-row class="h-100">
      <v-col cols="12" class="d-flex justify-center align-center">
        <FilesCurrent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFiles } from "~/store/Files"
const { getFileFromId } = useFiles()
definePageMeta({ layout: "default", middleware: "auth", title: 'Files' });
const route = useRoute();
onBeforeMount(async () => {
  await getFileFromId(route.params.id)
})
</script>

<style lang="scss" scoped>
.index {
  @media (min-width: 960px) {
    padding: 16px 2px;
  }
}
</style>
