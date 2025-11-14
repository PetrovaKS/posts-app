import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { jsonPlaceholderApi } from '@/api'
import { useErrorHandler } from '@/composables/useErrorHandler'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const watchedUsers = ref([])
  const isLoading = ref(false)

  const { handleApiError } = useErrorHandler()

  const isUserModalOpen = ref(false)
  const selectedUserId = ref(null)

  /** Загрузка пользователей */
  const fetchUsers = async () => {
    isLoading.value = true
    try {
      users.value = await jsonPlaceholderApi.getUsers()
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err)
    } finally {
      isLoading.value = false
    }
  }

  /** Поиск пользователя по ID */
  const getUserById = (id) => {
    return users.value.find((user) => user.id === id)
  }

  /** Загрузка пользователя по ID */
  const fetchUserById = async (id) => {
    try {
      return await jsonPlaceholderApi.getUserById(id)
    } catch (err) {
      console.error('Ошибка загрузки пользователя:', err)
      handleApiError(err)
    } finally {
      isLoading.value = false
    }
  }

  /** Открытие модального окна пользователя */
  const openUserModal = (userId) => {
    selectedUserId.value = userId
    isUserModalOpen.value = true
    if (!watchedUsers.value.includes(userId)) {
      watchedUsers.value.push(userId)
      localStorage.setItem('watchedUsers', JSON.stringify(watchedUsers.value))
    }
  }

  /** Закрытие модального окна пользователя */
  const closeUserModal = () => {
    isUserModalOpen.value = false
    selectedUserId.value = null
  }

  /** Проверка был ли пользователь просмотрен */
  const isUserWatched = (userId) => {
    return watchedUsers.value.includes(userId)
  }

  // Загружаем просмотренных пользователей из localStorage при инициализации
  onMounted(() => {
    const saved = localStorage.getItem('watchedUsers')
    if (saved) {
      try {
        watchedUsers.value = JSON.parse(saved)
      } catch (e) {
        console.error('Ошибка загрузки watchedUsers:', e)
        watchedUsers.value = []
      }
    }
  })

  return {
    users,
    isLoading,
    isUserModalOpen,
    selectedUserId,

    fetchUsers,
    getUserById,
    fetchUserById,
    isUserWatched,
    openUserModal,
    closeUserModal,
  }
})
