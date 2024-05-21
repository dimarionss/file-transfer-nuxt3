<template>
  <v-card class="profile box-shadow-main" rounded="xl" width="600px">
    <v-card-text>
      <h6 class="text-h6 mb-2">Files</h6>
      <PartialsDragAndDrop v-if="route.path === '/files'" />
      <v-divider></v-divider>
      <v-list class="card-list mt-2" role="listbox" density="compact">
        <v-list-item v-for="file, idx in paginatedFiles" :key="idx"
          :subtitle="moment(file.createdAt).format('YYYY-MM-DD')" :title="file.title"
          @click="router.push(`/files/${file._id}`)">
          <template v-slot:prepend>
            <v-icon color="primary" size="x-large">mdi-file-document-outline</v-icon>
          </template>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
              <span class="mb-1">{{ (file.size / 1024).toFixed(2) }} KB</span>
              <v-list-item-subtitle>
                {{ file.mimetype }}
              </v-list-item-subtitle>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <PartialsPagination v-model:on-page="onPage" v-model:pagination="page" :total-pages="totalPages" :page="page"
        @update:page="handlePageChange" />
    </v-card-text>
    <v-card-actions class="d-flex- justify-center">
      <v-btn color="primary" variant="flat" rounded="xl" @click="router.push('/')">Main</v-btn>
      <v-btn color="primary" variant="text" rounded="xl" @click="router.go(-1)">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";
import { storeToRefs } from 'pinia';
import { useUsers } from "~/store/Users";
import { useMainStore } from "~/store/Main";
import { useDialogStore } from "~/store/Dialog";
import { useAuth } from '~/store/Auth';
const { USER_DATA } = storeToRefs(useAuth());
const { logout } = useAuth();
const { openDialog } = useDialogStore();
const props = defineProps(['listData'])
const router = useRouter();
const route = useRoute();
const page = ref(1);
const onPage = ref(15);

const totalPages = computed(() => {
  return props.listData?.length > 0 ? Math.ceil(props.listData?.length / onPage.value) : 1;
});

const paginatedFiles = computed(() => {
  const start = (page.value - 1) * onPage.value;
  const end = start + onPage.value;
  return props.listData?.slice(start, end) || [];
});

const handlePageChange = (newPage) => {
  page.value = newPage;
};

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