<template>
  <Button variant="ghost" size="icon" class="w-9 h-9 cursor-pointer" @click="toggleTheme">
    <SunIcon v-if="isDark"></SunIcon>
    <MoonIcon v-else></MoonIcon>
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
</script>
