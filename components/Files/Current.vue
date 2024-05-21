<template>
  <v-card class="profile box-shadow-main" rounded="xl" width="1000px">
    <v-card-text>
      <v-toolbar color="transparent">
        <template v-slot:prepend>
          <v-icon size="x-large">
            mdi-file
          </v-icon>
        </template>

        <v-toolbar-title class="text-h6">
          {{ FILE.title }} <span class="text-body-2">({{ (FILE.size / 1024).toFixed(2) }} KB)</span><br>
          <span class="text-body-2 text-grey">{{ moment(FILE.createdAt).format('YYYY-MM-DD') }} / {{ FILE.mimetype
            }}</span>
        </v-toolbar-title>

        <template v-slot:append>
          <v-btn icon size="x-large" @click="logout">
            <v-icon size="x-large">
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-text>
      <iframe :src="`${config.API_URL}/uploads/files/${FILE.filename}`" width="100%" height="500px"
        class="rounded-xl elevation-10">
      </iframe>
    </v-card-text>
    <v-card-text>
      <v-list lines="three" item-props>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          :subtitle="FILE?.uploadedBy?.email" :title="`${FILE?.uploadedBy?.firstname} ${FILE?.uploadedBy?.lastname}`"
          @click="router.push(`/users/${FILE?.uploadedBy?._id}`)"></v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block variant="flat" rounded="xl" @click="router.push('/files')">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";
import { storeToRefs } from 'pinia';
import { useFiles } from "~/store/Files";
import { useMainStore } from "~/store/Main";
import { useDialogStore } from "~/store/Dialog";
import { useAuth } from '~/store/Auth';
const { USER_DATA } = storeToRefs(useAuth());
const { logout } = useAuth();
const { openDialog } = useDialogStore();
const { FILE } = storeToRefs(useFiles())
const router = useRouter();
const page = ref(1);
const onPage = ref(15);
const config = useRuntimeConfig().public

onBeforeMount(async () => {
  // Any initialization code if necessary
});
</script>

<style lang="scss" scoped>
.profile {
  .v-list {
    color: rgba(50, 71, 92, 0.87);
  }

  &-passport {
    border: 2px solid #696cff;
  }
}
</style>