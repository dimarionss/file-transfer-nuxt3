<template>
  <v-card-text class="pagination d-flex flex-wrap justify-end pa-2">
    <div class="d-flex align-center mr-10">
      <span class="text-no-wrap text-sm me-3">row per page:</span>
      <v-select base-color="grey" hide-details variant="outlined" v-model="onPageCurrent" color="primary"
        :items="[1, 2, 3, 5, 10, 15]" menu-icon="mdi-chevron-down" density="compact"></v-select>
    </div>
    <div class="d-flex align-center">
      <span class="font-weight-regular">{{ props.page }} of {{ props.totalPages }}</span>
    </div>
    <v-pagination density="comfortable" v-model="onPaginationCurrent" :length="props.totalPages"
      :total-visible="6"></v-pagination>
  </v-card-text>
</template>
<script setup lang="ts">
import 'boxicons'
const props = defineProps({
  totalPages: Number,
  page: Number,
  pagination: Number,
  onPage: Number
})
const emit = defineEmits()
const onPageCurrent = ref(props.onPage),
  onPaginationCurrent = ref(props.pagination)




watchEffect(() => {
  onPaginationCurrent.value = props.page
  onPageCurrent.value = props.onPage

  if (props.totalPages !== 0 && props.totalPages < props.pagination) {
    emit('update:pagination', 1)
    console.log("ERROR PAGE")
  }
  console.log('PAGE', props.pagination)
  console.log('ON PAGE', props.onPage)
  console.log('TOTLA PAGES', props.totalPages)
});

watch(onPageCurrent, async (val) => {
  emit('update:onPage', val)
  console.log('WATCH ON PAGE', props.pagination)
})
watch(onPaginationCurrent, async (val) => {
  emit('update:pagination', val)
  console.log('WATCH PAGE', props.pagination)
})

</script>
<style lang="scss" scoped>
.pagination {}
</style>