<template>
  <v-container fluid class="index h-100">
    <v-row class="h-100">
      <v-col cols="12" class="d-flex justify-center align-center">
        <FilesList :listData="USER_DATA?.files" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuth } from '~/store/Auth';
import { useFiles } from '~/store/Files';
const { USER_DATA } = storeToRefs(useAuth());
const { getFileFromUserId } = useFiles();
definePageMeta({ layout: "default", middleware: "auth", title: 'Files' });
const route = useRoute();
onBeforeMount(async () => {
  await getFileFromUserId(USER_DATA.value._id)
})
</script>

<style lang="scss" scoped>
.index {
  @media (min-width: 960px) {
    padding: 16px 2px;
  }
}
</style>
