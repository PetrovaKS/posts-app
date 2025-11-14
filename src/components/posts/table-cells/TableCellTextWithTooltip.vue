<script setup>
import { isTruncated } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TableCell } from '@/components/ui/table'

defineProps({
  value: { type: String, required: true },
  maxWidth: { type: Number, required: true },
  maxWidthTooltip: { type: Number, default: 250 },
})
</script>

<template>
  <TableCell
    class="overflow-hidden text-ellipsis whitespace-nowrap"
    :class="`max-w-[${maxWidth}px] w-[${maxWidth}px]`"
  >
    <TooltipProvider>
      <Tooltip v-if="isTruncated(value, maxWidth - 16)">
        <TooltipTrigger as-child>
          <span class="block truncate w-full">{{ value }}</span>
        </TooltipTrigger>
        <TooltipContent :class="`max-w-[${maxWidthTooltip}px]`">
          <p>{{ value }}</p>
        </TooltipContent>
      </Tooltip>
      <span v-else class="block truncate w-full">{{ value }}</span>
    </TooltipProvider>
  </TableCell>
</template>
