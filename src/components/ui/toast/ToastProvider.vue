<script setup>
import { ToastProvider } from 'reka-ui'

// Определяем пропсы которые могут быть у ToastProvider
defineProps({
  duration: {
    type: Number,
    default: 5000,
  },
  label: {
    type: String,
    default: 'Notification',
  },
  swipeDirection: {
    type: String,
    default: 'right',
  },
})
</script>

<template>
  <ToastProvider v-bind="$props">
    <slot />
  </ToastProvider>
</template>
