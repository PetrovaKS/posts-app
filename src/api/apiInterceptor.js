export const ApiInterceptor = {
  request: {
    onFulfilled: (config) => {
      console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    onRejected: (error) => {
      console.error('[API Request Error]', error)
      return Promise.reject(error)
    },
  },

  response: {
    onFulfilled: (response) => {
      console.log(`[API Response] ${response.status} ${response.config.url}`)
      return response
    },
    onRejected: (error) => {
      console.error('[API Response Error]', error)

      if (error.response) {
        error.message = `API Error: ${error.response.status} - ${error.response.statusText}`
      } else if (error.request) {
        error.message = 'Сервис временно недоступен. Пожалуйста, попробуйте позже.'
      }

      return Promise.reject(error)
    },
  },
}
