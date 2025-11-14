<script setup>
import { reactiveOmit } from '@vueuse/core'
import { ToastDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  // Добавьте другие пропсы если нужны, например:
  // as: { type: String, default: 'div' },
  // asChild: { type: Boolean, default: false }
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastDescription :class="cn('text-sm opacity-90', props.class)" v-bind="delegatedProps">
    <slot />
  </ToastDescription>
</template>
