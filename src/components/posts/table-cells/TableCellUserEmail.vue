<script setup>
import { computed } from 'vue'
import { isTruncated } from '@/lib/utils'
import { useUsersStore } from '@/stores/users'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TableCell } from '@/components/ui/table'

const props = defineProps({
  email: { type: String, required: true },
  userId: { type: Number, required: true },
  maxWidth: { type: Number, default: 150 },
  onOpenModal: { type: Function, required: true }, // <-- добавляем функцию как prop
})

const usersStore = useUsersStore()

const isWatched = computed(() => usersStore.isUserWatched(props.userId))
</script>

<template>
  <TableCell
    class="overflow-hidden text-ellipsis whitespace-nowrap"
    :class="`max-w-[${maxWidth}px] w-[${maxWidth}px]`"
  >
    <TooltipProvider>
      <Tooltip v-if="isTruncated(email, maxWidth - 16)">
        <TooltipTrigger as-child>
          <span
            class="block truncate w-full cursor-pointer transition-colors"
            :class="isWatched ? 'text-blue-600 hover:text-blue-800' : ''"
            @click="onOpenModal(userId)"
          >
            {{ email }}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ email }}</p>
        </TooltipContent>
      </Tooltip>
      <span
        v-else
        class="block truncate w-full cursor-pointer transition-colors"
        :class="isWatched ? 'text-blue-600 hover:text-blue-800' : ''"
        @click="onOpenModal(userId)"
      >
        {{ email }}
      </span>
    </TooltipProvider>
  </TableCell>
</template>
