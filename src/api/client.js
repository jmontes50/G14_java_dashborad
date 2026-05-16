import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api-donde.onrender.com/api',
})

// TODO: Agregar interceptor de request para incluir el token JWT
// Pista: leer el token desde useAuthStore.getState().token
// y agregarlo al header: config.headers.Authorization = `Bearer ${token}`

// TODO: Agregar interceptor de response para capturar errores
// y relanzarlos con el mensaje de la API: error.response?.data?.error?.message

export default client
