<script setup>
import { useToaster } from './useToaster'

const { toasts, dismiss } = useToaster()
</script>

<template>
  <!-- Teleport to body чтобы избежать проблем с z-index -->
  <Teleport to="body">
    <div
      class="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[100] p-4 space-y-2 w-full max-w-md"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="bg-background border border-border rounded-lg shadow-lg p-4 flex justify-between items-start gap-3 animate-in slide-in-from-bottom duration-300"
        :class="{
          'border-destructive bg-destructive/10': toast.variant === 'destructive',
          'border-green-200 bg-green-50': toast.variant === 'default',
        }"
      >
        <div class="flex-1">
          <h4
            class="font-semibold text-sm mb-1"
            :class="{
              'text-destructive': toast.variant === 'destructive',
              'text-green-800': toast.variant === 'default',
            }"
          >
            {{ toast.title }}
          </h4>
          <p
            class="text-sm"
            :class="{
              'text-destructive/80': toast.variant === 'destructive',
              'text-green-700': toast.variant === 'default',
              'text-muted-foreground': !toast.variant,
            }"
          >
            {{ toast.description }}
          </p>
        </div>
        <button
          @click="dismiss(toast.id)"
          class="rounded-md p-1 transition-colors flex-shrink-0"
          :class="{
            'text-destructive/70 hover:text-destructive': toast.variant === 'destructive',
            'text-green-600 hover:text-green-800': toast.variant === 'default',
            'text-foreground/50 hover:text-foreground': !toast.variant,
          }"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
