<template>
  <v-container class="pa-4">
    <v-card class="d-flex align-center justify-center pa-4 elevation-0" :class="{ 'drag-over': isDragging }"
      @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @drop.prevent="handleDrop" @click="handleClick">
      <v-icon size="48">mdi-upload</v-icon>
      <span class="ml-4">Drag and drop PDF files here or click to upload</span>
    </v-card>
    <v-list class="mt-4">
      <v-list-item v-for="(file, index) in files" :key="index">
        <v-list-item-title>{{ file.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ (file.size / 1024).toFixed(2) }} KB</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <input type="file" accept="application/pdf" ref="fileInput" multiple @change="handleFileSelect"
      style="display: none" />
    <v-btn color="success" block variant="flat" v-if="files.length > 0" @click="upload">Upload Files</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/store/Auth';
import { useFiles } from "~/store/Files";
const { USER_DATA } = storeToRefs(useAuth())
const { uploadFiles } = useFiles()

// State variables
const files = ref<File[]>([]);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);


async function upload() {
  const res = await uploadFiles(files.value, USER_DATA.value._id)
  if (res) {
    files.value = []
  }
}
// Event handlers
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;

  if (event.dataTransfer) {
    const droppedFiles = Array.from(event.dataTransfer.files);
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf');
    files.value.push(...pdfFiles);
  }
};

const handleClick = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const selectedFiles = Array.from(input.files);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    files.value.push(...pdfFiles);
  }
};
</script>

<style scoped>
.drag-over {
  border: 2px dashed #1976d2;
  background-color: #e3f2fd;
}
</style>