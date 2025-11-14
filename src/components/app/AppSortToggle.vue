<script setup>
import { ArrowUpDown, MoveUp, MoveDown } from 'lucide-vue-next'

defineProps({
  sortConfig: {
    type: Object,
    required: true,
    default: () => ({ key: null, direction: null }),
  },
  columnKey: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <MoveUp
    v-if="sortConfig.key === columnKey && sortConfig.direction === 'asc'"
    class="text-blue-800"
    size="14"
  />
  <MoveDown
    v-else-if="sortConfig.key === columnKey && sortConfig.direction === 'desc'"
    class="text-blue-800"
    size="14"
  />
  <ArrowUpDown v-else size="14" />
</template>
