<template>
  <v-form class="auth" ref="formLogin" @keyup.enter="sendForm">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field density="compact" base-color="border-color-1" color="primary" variant="outlined" rounded="lg"
          v-model="userData.email" :rules="[requiredRule, emailRule]" label="Email" append-inner-icon="mdi-phone"
          required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field density="compact" variant="outlined" base-color="border-color-1" color="primary" rounded="lg"
          v-model="userData.password" :rules="[v => !!v || 'Password is require field']" label="Password"
          @click:appendInner="show = !show" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="form-btns">
          <v-btn color="primary" rounded="lg" class="auth-btn-send" variant="flat" @click="sendForm">Log in</v-btn>
          <v-btn variant="text" @click="$emit('changeModeAuth', 'registr')">Registration</v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- <v-text-field class="pa-0 mb-3" hide-details outlined v-model="login" :rules="loginRules" :label="$t('authObj')['form']['login']" append-icon="mdi-phone" required></v-text-field> -->




  </v-form>
</template>
<script setup lang="ts">
import { mapActions, mapState } from 'pinia'
import { useDialogStore } from "~/store/Dialog"
import { useAuth } from "~/store/Auth"
const emit = defineEmits('changeModeAuth')
const { setDialogState } = useDialogStore()
const { login } = useAuth()
const formLogin = ref()
const agree = ref(false),
  show = ref(false),
  userData = ref({
    email: null,
    password: null,
  })
const requiredRule = v => !!v || 'Email is a required field';
const emailRule = v => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(v) || 'Invalid email address';
};
async function sendForm() {
  const { valid } = await formLogin.value.validate()
  if (valid) {
    const res = await login(userData.value)
    if (res) {
      setDialogState(false)
    }
  }
}
</script>

<style scoped lang="scss">
.auth {
  width: 100%;

  &-controls {}

  &-remember {
    a {
      color: rgb(var(--v-theme-font-primary));
      text-decoration: none;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

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
}
</style>
