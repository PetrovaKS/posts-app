import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  // Функция для применения темы
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Функция для сохранения темы в localStorage
  const saveThemeToStorage = (dark) => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  // Функция для загрузки темы из localStorage
  const loadThemeFromStorage = () => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return false
  }

  // Инициализация темы при загрузке
  const initTheme = () => {
    const savedTheme = loadThemeFromStorage()

    if (savedTheme !== null) {
      isDark.value = savedTheme
    } else {
      isDark.value = false
    }

    applyTheme(isDark.value)
  }

  // Переключение темы
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Установка конкретной темы
  const setTheme = (dark) => {
    isDark.value = dark
  }

  // Следим за изменениями темы
  watch(isDark, (newValue) => {
    applyTheme(newValue)
    saveThemeToStorage(newValue)
  })

  // Инициализируем тему при монтировании
  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme,
    setTheme,
  }
}
