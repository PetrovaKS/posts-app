import { useToaster } from '@/components/ui/toast/useToaster'

export function useErrorHandler() {
  const { toast } = useToaster()

  const handleApiError = (error, customMessage = null) => {
    let message = customMessage || 'Сервис временно недоступен. Пожалуйста, попробуйте позже.'
    // Можно добавить сообщения для различных типов ошибок
    showErrorToast(message)
  }

  const showErrorToast = (message) => {
    toast({
      title: 'Ошибка',
      description: message,
      duration: 5000,
    })
  }

  const showSuccessToast = (message) => {
    toast({
      title: 'Успешно',
      description: message,
      duration: 3000,
    })
  }

  return {
    handleApiError,
    showErrorToast,
    showSuccessToast,
  }
}
