<template>
  <v-card class="dialog box-shadow-main pa-2 pa-lg-4" rounded="xl">
    <v-btn variant="text" icon @click="setDialogState(false)" class="dialog-close" position="absolute"
      location="right top" style="z-index: 10;">
      <v-icon color="font-primary">mdi-close</v-icon>
    </v-btn>
    <v-toolbar color="white">
      <v-card-title class="dialog-title text-h5 mb-3 d-flex align-center justify-center w-100">
        Edit user
      </v-card-title>
    </v-toolbar>

    <v-card-text>
      <v-form ref="formEdit">
        <v-row>
          <v-col cols="12">
            <PartialsCropper @imgCropped="ImgCropped" />
          </v-col>
          <v-col cols="12">
            <v-text-field base-color="grey" density="comfortable" label="Логин" type="text" rounded="lg"
              v-model="USER_DATA.firstname" variant="outlined" color="primary"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field base-color="grey" density="comfortable" label="Имя" type="text" rounded="lg"
              v-model="USER_DATA.lastname" variant="outlined" color="primary"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field base-color="grey" density="comfortable"
              :rules="[v => !!v || 'Email is required field', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
              label="Email" type="text" rounded="lg" v-model="USER_DATA.email" variant="outlined"
              color="primary"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="primary" variant="flat" @click="sendForm" rounded="lg">
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
import { useDialogStore } from "~/store/Dialog"
import { useAuth } from '~/store/Auth'
import { useUsers } from '~/store/Users'
import { useMainStore } from '~/store/Main'
const { USER_DATA } = storeToRefs(useAuth())
const { updateUser } = useUsers()
const { getImgCropped } = useMainStore()
const { setDialogState } = useDialogStore()
const formEdit = ref()

function ImgCropped(img: object) {
  getImgCropped(img).then((file) => {
    console.log("File:", file);
    USER_DATA.value.croppedAvatar = file
  })
}
async function sendForm() {
  const dataUser = ref({
    firstname: USER_DATA.value.firstname,
    lastname: USER_DATA.value.lastname,
    email: USER_DATA.value.email,
    avatar: USER_DATA.value.croppedAvatar
  })
  const { valid } = await formEdit.value.validate();
  if (valid) {
    const res = await updateUser(dataUser.value, USER_DATA.value._id);
    if (res) {
      setDialogState(false);
    }
  }
}
</script>

<style lang="scss" scoped></style>