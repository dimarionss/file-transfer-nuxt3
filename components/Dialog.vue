<template>
  <v-dialog v-model="dialogState" :max-width="DIALOG_PARAMS.width ? DIALOG_PARAMS.width : '100%'" class="dialog"
    :fullscreen="$vuetify.display.xs">
    <LazyDialogsUsersChangePassword v-if="DIALOG_PARAMS.name === 'changePassword'" />
    <LazyDialogsUsersEdit v-if="DIALOG_PARAMS.name === 'userEdit'" />
  </v-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDialogStore } from "~/store/Dialog"
const { DIALOG_STATE, DIALOG_PARAMS } = storeToRefs(useDialogStore())
const { setDialogState } = useDialogStore()
const dialogState = computed({
  get() {
    return DIALOG_STATE.value;
  },
  set(value: boolean) {
    setDialogState(value);
  }
})
</script>
<style lang="scss" scoped></style>