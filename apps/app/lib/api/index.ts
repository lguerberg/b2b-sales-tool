import axios from 'axios'

import { USER_COOKIE } from '../constants'
import { getCookie } from '../cookies'

export type ApiError = {
  internalCode: number
  errorMessage: string
  data: {
    errors: string[]
  }
}

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

api.interceptors.request.use(
  async config => {
    const token = getCookie(USER_COOKIE)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

export default api
