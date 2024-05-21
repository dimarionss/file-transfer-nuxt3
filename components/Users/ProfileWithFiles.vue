<template>
  <div class="d-flex flex-column">
    <v-card class="profile box-shadow-main mb-4" rounded="xl" width="600px">
      <v-card-text class="text-center pt-10 pb-2">
        <v-avatar color="surface-variant" size="150" rounded="md">
          <v-img cover :src="`https://ui-avatars.com/api/?name=${USER.email}&background=8592a3&color=fff`"></v-img>
        </v-avatar>
        <h6 class="text-h6 mt-4 d-flex flex-column">
          <span v-if="USER.firstname || USER.lastname">
            {{ USER.firstname }} {{ USER.lastname }}
          </span>
          <span class="text-grey">{{ USER.email }}</span>
        </h6>
      </v-card-text>
    </v-card>
    <FilesList :listData="USER?.files" />
  </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsers } from "~/store/Users"
import { useMainStore } from "~/store/Main"
import { useDialogStore } from "~/store/Dialog"
import { useAuth } from '~/store/Auth'
const { USER_DATA } = storeToRefs(useAuth())
const { USER } = storeToRefs(useUsers())
const { logout } = useAuth()
const { openDialog } = useDialogStore()
const router = useRouter()
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
