<template>
  <v-card class="dialog box-shadow-main pa-2 pa-lg-4" rounded="xl">
    <v-btn variant="text" icon @click="setDialogState(false)" class="dialog-close" position="absolute"
      location="right top" style="z-index: 10;">
      <v-icon color="font-primary">mdi-close</v-icon>
    </v-btn>
    <v-toolbar color="white">
      <v-card-title class="dialog-title text-h5 mb-3 d-flex align-center justify-center w-100">
        Change Password
      </v-card-title>
    </v-toolbar>

    <v-card-text>
      <v-form ref="formPass">
        <v-row>
          <v-col cols="12">
            <v-text-field :rules="[
              v => !!v || 'Old password is reqired field']" density="compact" base-color="primary" color="primary"
              rounded="lg" variant="outlined" dense v-model="passwordData.old_password" label="Old password"
              required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field :rules="[
              v => !!v || 'New password is reqired field',
              v => v !== passwordData.old_password || 'Old and new password the same',
            ]" density="compact" base-color="primary" color="primary" variant="outlined" dense rounded="lg"
              v-model="passwordData.new_password" label="New Password" required></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="primary" variant="flat" @click="changePass" rounded="lg">
        Save
      </v-btn>
      <v-btn class="text-secondary" variant="tonal" @click="setDialogState(false)" rounded="lg">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>



</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from "~/store/Auth"
import { ref, onBeforeMount } from 'vue'
import { useUsers } from "~/store/Users"
import { useDialogStore } from "~/store/Dialog"
const { USER_DATA } = storeToRefs(useAuth())
const { setDialogState } = useDialogStore()
const { changePassword, updateUser } = useUsers()
const formPass = ref(),
  passwordData = ref({
    old_password: '',
    new_password: '',
  })

async function changePass() {
  const { valid } = await formPass.value.validate()
  if (valid) {
    const res = await changePassword(passwordData.value, USER_DATA.value._id)
    if (res) {
      formPass.value.reset()
      setDialogState(false)
    }
  }
}

</script>
<style lang="scss">
.profile {
  label {
    color: rgb(var(--v-theme-primary));
    font-size: 16px;
  }

  .v-field {
    // border: 1px solid rgba(58, 105, 160, 0.3);
    box-shadow: none !important;
  }
}
</style>
<style lang="scss" scoped>
.profile {
  &-title {
    font-weight: 600;
    font-size: 26px;
    line-height: 30px;
    color: rgb(var(--v-theme-font-primary));
    margin: 0 0 5px;
  }

  &-subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: rgb(var(--v-theme-secondary));
  }

  &-progress {
    &-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: rgb(var(--v-theme-primary));

      span {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: rgb(var(--v-theme-primary));
        background: #eaeef2;
        border-radius: 5px;
        padding: 2px 5px;
        margin-left: 40px;
      }
    }
  }

  &-data_left,
  &-data_right {
    p {
      margin: 0;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: rgb(var(--v-theme-primary));
    }
  }

  &-data_right {}

  &-data_left {}
}
</style>
