<script setup>
import { reactiveOmit } from '@vueuse/core'
import { ToastTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  // Добавьте другие пропсы если нужны
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastTitle
    v-bind="delegatedProps"
    :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)"
  >
    <slot />
  </ToastTitle>
</template>
