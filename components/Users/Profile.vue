<template>
  <v-card class="profile box-shadow-main" rounded="xl" width="600px">
    <v-toolbar color="transparent">
      <template v-slot:prepend>
        <v-btn icon size="x-large" @click="openDialog({ name: 'userEdit', width: 600 })">
          <v-icon size="x-large">
            mdi-account-edit
          </v-icon>
        </v-btn>
        <v-btn icon size="x-large" @click="openDialog({ name: 'changePassword', width: 600 })">
          <v-icon size="x-large">
            mdi-lock
          </v-icon>
        </v-btn>
      </template>

      <v-toolbar-title class="text-h6">
        <span v-if="USER_DATA.firstname || USER_DATA.lastname">
          {{ USER_DATA.firstname }} {{ USER_DATA.firstname }}
        </span>
        <span v-else>{{ USER_DATA.email }}</span>
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn icon size="x-large" @click="logout">
          <v-icon size="x-large">
            mdi-exit-to-app
          </v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-card-text class="text-center pt-10 pb-0">
      <v-avatar color="surface-variant" size="200" rounded="md">
        <v-img cover :src="`${config.API_URL}/uploads/avatars/${USER_DATA.avatar}`"></v-img>
      </v-avatar>
    </v-card-text>
    <v-card-text>
      <h6 class="text-h6 mb-2">Information</h6>
      <v-divider></v-divider>
      <v-list class="card-list mt-2" role="listbox" density="compact">
        <v-list-item>
          <v-list-item-title>
            <span class="me-1"><strong>ID: </strong></span>
            <span class="text-body-1 text-medium-emphasis">{{ USER_DATA._id }}</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <span class="me-1"><strong>Firstname: </strong></span>
            <span class="text-body-1 text-medium-emphasis">{{ USER_DATA.firstname }}</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <span class="me-1"><strong>Lastname: </strong></span>
            <span class="text-body-1 text-medium-emphasis">{{ USER_DATA.firstname }}</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <span class="me-1"><strong>Email: </strong></span>
            <span class="text-body-1 text-medium-emphasis">{{ USER_DATA.email }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block variant="flat" rounded="xl" @click="router.push('/files')">My Files
        <v-badge color="error" :content="USER_DATA?.files?.length || 0" inline>
        </v-badge>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsers } from "~/store/Users"
import { useMainStore } from "~/store/Main"
import { useDialogStore } from "~/store/Dialog"
import { useAuth } from '~/store/Auth'
const { USER_DATA } = storeToRefs(useAuth())
const { logout } = useAuth()
const { openDialog } = useDialogStore()
const router = useRouter()
const config = useRuntimeConfig().public
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
