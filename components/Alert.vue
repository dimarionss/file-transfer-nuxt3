<template>
  <div class="alert" v-if="PARAMS.state">
    <v-alert class="alert-item" :text="PARAMS.text" :type="PARAMS.type" :icon="PARAMS.icon"></v-alert>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAlertStore } from "~/store/Alert";
const { PARAMS } = storeToRefs(useAlertStore())
</script>
<style lang="scss" scoped>
.alert {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  backdrop-filter: blur(2px);
  background: rgba(51, 51, 51, 0.3);

  &-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>