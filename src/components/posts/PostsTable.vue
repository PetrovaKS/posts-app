<template>
  <div
    class="w-[600px] h-[600px] mx-auto overflow-y-auto bg-background"
    style="scrollbar-width: none"
  >
    <!-- Фиксированная шапка -->
    <TableHeader class="sticky top-0 z-20" style="position: sticky; top: 0; background: inherit">
      <TableRow>
        <SortableTableHead
          columnKey="id"
          title="ID"
          width="w-[50px]"
          :sortConfig="sortConfig"
          :onClick="sortBy"
        />
        <SortableTableHead
          columnKey="title"
          title="Заголовок"
          width="w-[150px]"
          :sortConfig="sortConfig"
          :onClick="sortBy"
        />
        <SortableTableHead
          columnKey="author"
          title="Автор"
          width="w-[150px]"
          :sortConfig="sortConfig"
          :onClick="sortBy"
        />
        <SortableTableHead
          columnKey="body"
          title="Контент"
          width="w-[250px]"
          :sortConfig="sortConfig"
          :onClick="sortBy"
        />
      </TableRow>
    </TableHeader>

    <!-- Scroll Area -->
    <ScrollArea class="h-[544px] w-full relative">
      <Table class="w-full table-fixed mx-auto overflow-y-auto" style="max-width: 600px">
        <TableBody>
          <!-- Скелетон загрузки -->
          <template v-if="postsStore.isLoading && visiblePosts.length === 0">
            <TableRow v-for="i in 30" :key="`skeleton-${i}`">
              <TableCell class="w-[50px]"><Skeleton class="h-4 w-8 animate-pulse" /></TableCell>
              <TableCell class="w-[150px]"><Skeleton class="h-4 w-full animate-pulse" /></TableCell>
              <TableCell class="w-[150px]"><Skeleton class="h-4 w-32 animate-pulse" /></TableCell>
              <TableCell class="w-[250px]"><Skeleton class="h-4 w-full animate-pulse" /></TableCell>
            </TableRow>
          </template>

          <!-- Данные -->
          <template v-else-if="visiblePosts.length > 0">
            <TableRow
              v-for="post in visiblePosts"
              :key="post.id"
              class="hover:bg-muted/50 transition-colors text-xs"
            >
              <TableCellId :value="post.id" />

              <TableCellTextWithTooltip
                :value="post.title"
                :max-width="150"
                :max-width-tooltip="250"
              />

              <TableCellUserEmail
                :email="getUserEmail(post.userId)"
                :user-id="post.userId"
                :max-width="150"
                :onOpenModal="openUserModal"
              />

              <TableCellTextWithTooltip
                :value="post.body"
                :max-width="250"
                :max-width-tooltip="250"
              />
            </TableRow>
          </template>

          <!-- Пустое состояние -->
          <TableRow v-else>
            <TableCell colspan="4" class="text-center py-8 text-muted-foreground">
              Нет данных для отображения
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- Триггер для бесконечного скролла -->
      <div ref="scrollTrigger" class="h-1" />
    </ScrollArea>
  </div>

  <!-- Подвал -->
  <TableCaption
    v-if="visiblePosts.length > 0"
    class="text-sm text-muted-foreground mt-3 w-[600px] mx-auto flex"
  >
    Показано {{ startIndex }}–{{ endIndex }} из {{ totalPosts }} записей
  </TableCaption>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { usePostsStore } from '@/stores/posts'
import { useUsersStore } from '@/stores/users'
import { useIntersectionObserver } from '@vueuse/core'
import TableCellId from './table-cells/TableCellId.vue'
import TableCellTextWithTooltip from './table-cells/TableCellTextWithTooltip.vue'
import TableCellUserEmail from './table-cells/TableCellUserEmail.vue'
import SortableTableHead from './table-cells/SortableTableHead.vue'

const postsStore = usePostsStore()
const usersStore = useUsersStore()

const scrollTrigger = ref(null)
const sortConfig = ref({
  key: 'id',
  direction: 'asc',
})

const startIndex = computed(() => (postsStore.visibleCount > 0 ? 1 : 0))
const endIndex = computed(() => Math.min(postsStore.visibleCount, postsStore.posts.length))
const totalPosts = computed(() => postsStore.posts.length)

// Отсортированные посты
const sortedPosts = computed(() => {
  const posts = [...postsStore.posts]

  if (!sortConfig.value.key) return posts

  return posts.sort((a, b) => {
    let aValue, bValue

    if (sortConfig.value.key === 'author') {
      aValue = getUserEmail(a.userId)?.toLowerCase() || ''
      bValue = getUserEmail(b.userId)?.toLowerCase() || ''
    } else if (sortConfig.value.key === 'id') {
      aValue = Number(a.id)
      bValue = Number(b.id)
    } else {
      aValue = a[sortConfig.value.key]?.toString().toLowerCase() || ''
      bValue = b[sortConfig.value.key]?.toString().toLowerCase() || ''
    }

    if (aValue < bValue) return sortConfig.value.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.value.direction === 'asc' ? 1 : -1
    return 0
  })
})

// Видимые посты
const visiblePosts = computed(() => {
  return sortedPosts.value.slice(0, postsStore.visibleCount)
})

// Получение email пользователя
const getUserEmail = (userId) => {
  const user = usersStore.getUserById(userId)
  return user?.email || `User ${userId}`
}

// Сортировка
const sortBy = (key) => {
  if (sortConfig.value.key === key) {
    sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sortConfig.value.key = key
    sortConfig.value.direction = 'asc'
  }

  postsStore.resetVisibleCount()
}

// Бесконечный скролл
useIntersectionObserver(scrollTrigger, ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    !postsStore.isLoading &&
    postsStore.visibleCount < sortedPosts.value.length
  ) {
    postsStore.visibleCount += 30
  }
})

// Открытие модального окна пользователя
const openUserModal = (userId) => {
  usersStore.openUserModal(userId)
}
</script>
