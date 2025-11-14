<template>
  <div class="min-h-screen bg-background">
    <AppHeader />

    <main class="container mx-auto px-4 py-8 w-full">
      <slot />
    </main>
  </div>
</template>
<script setup>
import AppHeader from '../components/app/AppHeader.vue'
</script>

<style>
main {
  padding-top: calc(var(--spacing) * 8 + var(--app-header-height));
}
</style>
