import axios from 'axios'
import useAuthStore from '../store/useAuthStore';

console.log("env", import.meta.env)

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

client.interceptors.request.use((config) => {
  //getState es util para obtener estados fuera de archivos que no son componentes
  const token = useAuthStore.getState().token;
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  };
  return config;
})

// TODO: Agregar interceptor de request para incluir el token JWT
// Pista: leer el token desde useAuthStore.getState().token
// y agregarlo al header: config.headers.Authorization = `Bearer ${token}`

// TODO: Agregar interceptor de response para capturar errores
// y relanzarlos con el mensaje de la API: error.response?.data?.error?.message

export default client
