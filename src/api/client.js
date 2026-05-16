import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

const client = axios.create({
  baseURL: 'https://api-donde.onrender.com/api',
})

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || 'Error inesperado'
    return Promise.reject(new Error(message))
  }
)

export default client
