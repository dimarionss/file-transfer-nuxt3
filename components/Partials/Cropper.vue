<template>
  <v-file-input density="compact" label="Upload Image" variant="outlined" rounded="lg" color="primary" accept="image/*"
    @change="onFileChange"></v-file-input>
  <div v-if="image">
    <Cropper ref="cropper" :src="image" :stencil-props="stencilProps" :check-orientation="true" @change="onCrop" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['imgCropped'])
const image = ref<string | null>(null);
const imageName = ref('')
const imageType = ref('')
const imageCropped = ref<string | null>(null);
const stencilProps = {
  aspectRatio: 1,
  movable: true,
  resizable: true,
};

const cropper = ref();

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  imageName.value = file.name
  imageType.value = file.type
  console.log(file)
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.value = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

function onCrop() {
  const { canvas } = cropper.value.getResult();
  emit('imgCropped', { canvas, type: imageType.value, name: imageName.value })
}
function uploadImage() {
  const { canvas } = cropper.value.getResult();
  if (canvas) {
    const form = new FormData();
    canvas.toBlob(blob => {
      form.append('file', blob);
      fetch('http://example.com/upload/', {
        method: 'POST',
        body: form,
      });
    }, 'image/jpeg');
  }
}
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
}
</style>