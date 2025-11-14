<template>
  <header class="border-b bg-card fixed top-0 w-full z-10" ref="headerRef">
    <div class="container mx-auto px-4 py-2">
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-between">
        <!-- Заголовок + тема -->
        <div class="flex items-center justify-between w-full sm:w-auto">
          <h1 class="text-lg sm:text-xl font-bold whitespace-nowrap">Posts App</h1>
          <AppThemeToggle class="ml-2 sm:ml-4" />
        </div>

        <!-- Поиск -->
        <div class="w-full sm:max-w-lg">
          <div class="relative flex items-center gap-1 w-full">
            <Input
              v-model="searchQuery"
              id="search"
              type="text"
              placeholder="Поиск по заголовку..."
              class="pl-10 pr-8 w-full text-sm sm:text-base py-2 sm:pr-4 sm:py-2.5"
              @keyup.enter="handleSearch"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search class="size-4 sm:size-5 text-muted-foreground" />
            </span>
            <button
              v-if="searchQuery"
              type="button"
              class="absolute end-[64px] sm:end-[70px] inset-y-0 flex items-center justify-center px-2 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
              @click="clearSearch"
            >
              <X class="size-4 text-muted-foreground hover:text-foreground" />
            </button>

            <Button
              type="button"
              class="text-xs sm:text-sm px-3 py-1 sm:py-2 min-h-8 cursor-pointer"
              @click="handleSearch"
            >
              Поиск
            </Button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppThemeToggle from './AppThemeToggle.vue'
import { useElementSize } from '@vueuse/core'
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
const headerRef = ref()
const { height } = useElementSize(headerRef)
const searchQuery = ref('')

const handleSearch = () => {
  postsStore.searchPosts(searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}

watch(
  height,
  (newHeight) => {
    document.documentElement.style.setProperty('--app-header-height', `${newHeight}px`)
  },
  { immediate: true },
)
</script>
