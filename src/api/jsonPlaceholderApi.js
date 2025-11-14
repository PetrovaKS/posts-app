import axios from 'axios'
import { ApiInterceptor } from './apiInterceptor'

export class JsonPlaceholderApi {
  constructor() {
    this.api = this.createAxios()
  }

  // Posts
  async getPosts(params = {}) {
    const response = await this.api.get('/posts', { params })
    return response.data
  }

  async searchPostsByTitle(title) {
    const params = title ? { title_like: title } : {}
    return this.getPosts(params)
  }

  async getPostById(id) {
    const response = await this.api.get(`/posts/${id}`)
    return response.data
  }

  // Users
  async getUsers() {
    const response = await this.api.get('/users')
    return response.data
  }

  async getUserById(id) {
    const response = await this.api.get(`/users/${id}`)
    return response.data
  }

  createAxios() {
    const instance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    instance.interceptors.request.use(
      ApiInterceptor.request.onFulfilled,
      ApiInterceptor.request.onRejected,
    )

    instance.interceptors.response.use(
      ApiInterceptor.response.onFulfilled,
      ApiInterceptor.response.onRejected,
    )

    return instance
  }
}

export const jsonPlaceholderApi = new JsonPlaceholderApi()
