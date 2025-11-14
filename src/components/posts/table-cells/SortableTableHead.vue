<script setup>
import { cn } from '@/lib/utils'
import AppSortToggle from '@/components/app/AppSortToggle.vue'
import { TableHead } from '@/components/ui/table'

defineProps({
  columnKey: { type: String, required: true },
  title: { type: String, required: true },
  width: { type: String, default: 'w-auto' },
  sortConfig: { type: Object, required: true },
  onClick: { type: Function, required: true },
})

const baseClass =
  'cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden text-ellipsis whitespace-nowrap text-base p-4'
</script>

<template>
  <TableHead :class="cn(baseClass, width)" @click="onClick(columnKey)">
    <div class="flex items-center gap-1 text-foreground">
      {{ title }}
      <AppSortToggle :sortConfig="sortConfig" :columnKey="columnKey" />
    </div>
  </TableHead>
</template>
