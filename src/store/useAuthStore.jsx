import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"
import client from "../api/client";
/*
//versión simple sin persistencia
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

/*
//versión para desarrollo con devtools
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
*/

const useAuthStore = create(
  //persist va a hacer que el estado se guarde en localStorage
  persist((set) => ({
    //que vamos a guardar, como un estado inicial y que acciones podemos realizar, todo junto
    //store - estado
    user: null,
    token: null,

    //acciones
    login: async (email, password) => {
      const res = await client.post('/auth/login', { email, password })
      console.log({ res });
      set({ user: res.data.user, token: res.data.token })
    }
  }), { name: 'auth-storage' }))

export default useAuthStore;