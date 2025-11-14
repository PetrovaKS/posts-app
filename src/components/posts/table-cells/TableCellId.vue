<script setup>
import { TableCell } from '@/components/ui/table'

defineProps({
  value: { type: [String, Number], required: true },
})
</script>

<template>
  <TableCell class="w-[50px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[50px] p-2">
    {{ value }}
  </TableCell>
</template>
