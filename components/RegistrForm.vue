<template>
  <v-form class="registr" ref="formRegister" @keyup.enter="sendForm">
    <v-row>
      <v-col cols="12" class="pb-0">
        <PartialsCropper @imgCropped="ImgCropped" />
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-text-field density="compact" base-color="primary" color="primary" variant="outlined" rounded="lg"
          v-model="userData.firstname" label="First Name" required></v-text-field>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-text-field density="compact" base-color="primary" color="primary" variant="outlined" rounded="lg"
          v-model="userData.lastname" label="Last Name" required></v-text-field>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-text-field density="compact" base-color="primary" color="primary" variant="outlined" rounded="lg"
          v-model="userData.email"
          :rules="[v => !!v || 'Email is required field', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
          label="Email" required></v-text-field>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-text-field density="compact" variant="outlined" base-color="primary" color="primary" rounded="lg"
          v-model="userData.password" :rules="[v => !!v || 'Password is required field']" label="Password"
          required></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="form-btns">
          <v-btn color="primary" rounded="lg" class="registr-btn-send" variant="flat" @click="sendForm">Send</v-btn>
          <v-btn variant="text" @click="emit('changeModeAuth', 'auth')">Log in</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDialogStore } from "~/store/Dialog"
import { useAuth } from "~/store/Auth"
import { useMainStore } from "~/store/Main"
const emit = defineEmits(['changeModeAuth'])
const { getImgCropped } = useMainStore()
const { register } = useAuth()
const formRegister = ref()
const userData = ref({
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  avatar: {},
})
function ImgCropped(img: object) {
  getImgCropped(img).then((file) => {
    console.log("File:", file);
    userData.value.avatar = file
  })
}
async function sendForm() {
  const { valid } = await formRegister.value.validate()
  if (valid) {
    await register(userData.value)
  }
}
</script>
<style scoped lang="scss">
.registr {
  width: 100%;


  &-text {
    span {
      color: rgba(32, 86, 133, 0.6);
      font-size: 12px;
    }
  }

  &-controls {}


  &-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-btn {
    &-send {
      color: #fff !important;
      font-weight: 400;
      font-size: 14px !important;
      line-height: 18px;
    }
  }

  &-checkbox {
    &-label {
      font-size: 10px;
    }
  }
}
</style>
