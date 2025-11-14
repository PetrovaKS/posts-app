<script setup>
import { reactiveOmit } from '@vueuse/core'
import { ToastRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { toastVariants } from '.'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
  },
  open: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 5000,
  },
  // Добавьте другие пропсы если нужны
})

const emits = defineEmits(['update:open'])

const delegatedProps = reactiveOmit(props, 'class', 'variant')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="emits('update:open', $event)"
  >
    <slot />
  </ToastRoot>
</template>
