import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const res = await axios.post('https://api-donde.onrender.com/api/auth/login', {
          email,
          password,
        })
        set({ token: res.data.token, user: res.data.user })
      },

      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' }
  )
)
