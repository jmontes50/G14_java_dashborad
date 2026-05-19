import { create } from "zustand";
import { devtools } from "zustand/middleware"
import client from "../api/client";
/*
const useAuthStore = create((set) => ({
  //que vamos a guardar, como un estado inicial y que acciones podemos realizar, todo junto
  //store - estado
  user: null,
  token: null,

  //acciones
  login: async(email, password) => {
    const res = await client.post('/auth/login', { email, password })
    console.log({res});
    set({ user: res.data.user, token: res.data.token })
  }
}))
  */

const useAuthStore = create(devtools((set) => ({
  //que vamos a guardar, como un estado inicial y que acciones podemos realizar, todo junto
  //store - estado
  user: null,
  token: null,

  //acciones
  login: async(email, password) => {
    const res = await client.post('/auth/login', { email, password })
    console.log({res});
    set({ user: res.data.user, token: res.data.token }, false, 'auth/login')
  }
})))

export default useAuthStore;