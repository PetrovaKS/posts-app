import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'
import { jsonPlaceholderApi } from '@/api'
import { useErrorHandler } from '@/composables/useErrorHandler'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const isLoading = ref(false)
  const visibleCount = ref(30)

  const { handleApiError } = useErrorHandler()

  /** Загрузка постов */
  const fetchPosts = async () => {
    isLoading.value = true
    try {
      posts.value = await jsonPlaceholderApi.getPosts()
    } catch (err) {
      console.error('Ошибка загрузки постов:', err)
      handleApiError(err)
    } finally {
      isLoading.value = false
    }
  }

  /** Поиск постов */
  const searchPosts = async (query = '') => {
    isLoading.value = true
    try {
      posts.value = await jsonPlaceholderApi.searchPostsByTitle(query)
      resetVisibleCount()
    } catch (err) {
      console.error('Ошибка поиска:', err)
      handleApiError(err)
    } finally {
      isLoading.value = false
    }
  }

  /** Возврат к начало списка постов */
  const scrollToFirstRow = () => {
    nextTick(() => {
      const firstRow = document.querySelector('tbody tr:not([class*="skeleton"])')
      if (firstRow) {
        firstRow.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  }

  /** Сброс настроек видимых постов */
  const resetVisibleCount = () => {
    visibleCount.value = 30
    scrollToFirstRow()
  }

  return {
    posts,
    visibleCount,
    isLoading,
    fetchPosts,
    searchPosts,
    resetVisibleCount,
  }
})
