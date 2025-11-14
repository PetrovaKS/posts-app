import { ref } from 'vue'

// Глобальное состояние для тостов
const toasts = ref([])

export function useToaster() {
  const toast = (props) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast = {
      id,
      ...props,
      duration: props.duration || 5000,
    }

    toasts.value.push(toast)

    // Автоматическое закрытие
    if (toast.duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, toast.duration)
    }

    return id
  }

  const dismiss = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    toast,
    dismiss,
  }
}
