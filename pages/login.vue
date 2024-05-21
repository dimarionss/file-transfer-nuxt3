<template>
  <v-row class="login h-100" no-gutters>
    <v-col cols="12" class="login-content">
      <v-container fluid class="login h-100 d-flex align-center justify-center">
        <v-sheet class="login-wrap pt-8 px-8 pb-8" rounded="xl" width="500px">
          <div class="mb-4 d-flex justify-center align-center">
            <div class="d-flex flex-column align-center justify-center">
              <span class="font-weight-black text-h5">{{ modeCurrent === 'auth' ? 'Authorization' : modeCurrent ===
                'registr' ? 'Registration' : '' }}</span>
            </div>
          </div>
          <AuthForm @changeModeAuth="changeMode" v-if="modeCurrent === 'auth'" />
          <RegistrForm @changeModeAuth="changeMode" v-if="modeCurrent === 'registr'" />
        </v-sheet>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RegistrForm from '~/components/RegistrForm.vue';
definePageMeta({ layout: "auth", middleware: "auth", title: 'Главная' });
const route = useRoute();
const modeCurrent = ref('auth')

function changeMode(mode: string) {
  modeCurrent.value = mode
}
onBeforeMount(async () => {

})
</script>

<style lang="scss" scoped>
.login {
  &-content {
    background: url('/img/desktop/next-match-bg.png') no-repeat;
    background-size: 60% 100%;
    background-position: 50% 0;
  }

  &-wrap {
    border: 1px solid rgb(var(--v-theme-border-color));
  }
}
</style>
