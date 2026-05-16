# Admin Directorio Gastronómico Arequipeño

Panel de administración para gestionar los restaurantes del directorio gastronómico de Arequipa.

## Instalación y arranque

```bash
npm install
npm run dev
```

La app estará disponible en http://localhost:5173

## Credenciales de prueba

- **Correo:** admin@gastro.com
- **Contraseña:** admin1234

## Documentación de la API

https://api-donde.onrender.com/api-docs

---

## Qué hay en el proyecto

| Archivo | Qué hace |
|---------|----------|
| `pages/DashboardPage.jsx` | Página principal con la lista de restaurantes y filtros |
| `pages/LoginPage.jsx` | Formulario para iniciar sesión |
| `pages/RestaurantFormPage.jsx` | Formulario para crear y editar restaurantes |
| `components/Navbar.jsx` | Barra de navegación con logo y estado de sesión |
| `components/RestaurantCard.jsx` | Tarjeta individual de un restaurante |
| `components/FilterBar.jsx` | Filtros por distrito y categoría |
| `components/Pagination.jsx` | Controles de paginación (anterior / siguiente) |
| `hooks/useRestaurants.js` | Lógica para listar, crear, editar y eliminar restaurantes |
| `hooks/useDistricts.js` | Carga la lista de distritos desde la API |
| `hooks/useCategories.js` | Carga la lista de categorías desde la API |
| `store/useAuthStore.js` | Estado global de autenticación (Zustand) |
| `router/AppRouter.jsx` | Definición de rutas |
| `router/ProtectedRoute.jsx` | Protección de rutas privadas |
| `api/client.js` | Instancia de Axios configurada con la URL base y token JWT |

---

## Qué se construye en la sesión

- [ ] Paso 1 — Explorar el proyecto: estructura, dependencias, cómo corre
- [ ] Paso 2 — Completar `useRestaurants.js` y `client.js` para ver restaurantes en pantalla
- [ ] Paso 3 — Conectar los filtros: distrito y categoría
- [ ] Paso 4 — Completar el formulario de **crear** restaurante
- [ ] Paso 5 — Adaptar el formulario para **editar** restaurante
- [ ] Paso 6 — Crear el store de autenticación con Zustand y conectar el login
- [ ] Paso 7 — Proteger las rutas privadas con `ProtectedRoute`
- [ ] Paso 8 — Conectar la Navbar con el estado de sesión (usuario + logout)

---

## Guía de la sesión (instructor)

### Paso 1 — Exploración del proyecto base

**Archivos a mostrar:** estructura de carpetas, `vite.config.js`, `package.json`

**Qué destacar:**
- Tailwind v4 usa plugin de Vite, sin `tailwind.config.js` — la configuración va en el CSS
- DaisyUI v5 se activa con `@plugin "daisyui"` en el archivo CSS
- Todas las dependencias ya están instaladas — el alumno solo corre `npm run dev`

**Preguntas frecuentes:**
- *"¿Por qué no hay tailwind.config.js?"* → Tailwind v4 cambió el enfoque. La config va en CSS y en el plugin de Vite.
- *"¿Qué es Zustand?"* → Manejador de estado global más simple que Redux. Como un `useState` accesible desde cualquier componente sin pasar props.

---

### Paso 2 — Dashboard: listar restaurantes

**Archivos a abrir:** `hooks/useRestaurants.js`, `api/client.js`, `pages/DashboardPage.jsx`

**Completar `fetchRestaurants` en el hook:**
```js
async function fetchRestaurants({ page = 1, limit = 9, district, category } = {}) {
  setLoading(true)
  setError(null)
  try {
    const params = { page, limit }
    if (district) params.district = district
    if (category) params.category = category
    const res = await client.get('/restaurants', { params })
    setRestaurants(res.data.data)
    setPagination(res.data.pagination)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
```

**Conectar el `useEffect` en `DashboardPage`:**
```js
useEffect(() => {
  fetchRestaurants({ page: 1 })
}, [filters])
```

**Qué destacar:** el patrón `loading / error / data` es universal en React. `finally` garantiza que `loading` vuelve a `false` aunque falle la petición.

**Preguntas frecuentes:**
- *"¿Por qué el useState está dentro del hook?"* → Encapsula la lógica. Quien lo usa solo ve `restaurants`, `loading`, `error`. Los detalles quedan ocultos.

---

### Paso 3 — Filtros

**Archivos a abrir:** `components/FilterBar.jsx`, `pages/DashboardPage.jsx`

**Completar los handlers en `FilterBar`:**
```js
function handleDistrictChange(e) {
  const value = e.target.value
  setDistrict(value)
  onFilterChange({ district: value, category })
}

function handleCategoryChange(e) {
  const value = e.target.value
  setCategory(value)
  onFilterChange({ district, category: value })
}
```

**Completar `handleFilterChange` en `DashboardPage`:**
```js
function handleFilterChange(newFilters) {
  setFilters(newFilters)
}
```

**Qué destacar:** el estado de los filtros vive en `DashboardPage`, no en `FilterBar`. `FilterBar` solo comunica hacia arriba — patrón "lifting state up". El `useEffect` reacciona a `filters` y recarga.

---

### Paso 4 — Formulario de crear

**Archivo a abrir:** `pages/RestaurantFormPage.jsx`

**Completar `onSubmit` en modo creación:**
```js
async function onSubmit(data) {
  try {
    await createRestaurant(data)
    navigate('/')
  } catch (err) {
    setError('root', { message: err.message })
  }
}
```

**Qué destacar:** `react-hook-form` maneja el estado del formulario internamente. `handleSubmit` valida primero y solo llama a `onSubmit` si pasan todas las validaciones.

---

### Paso 5 — Formulario de editar

**Mismo archivo:** `pages/RestaurantFormPage.jsx`

**Adaptar `onSubmit` para detectar el modo:**
```js
async function onSubmit(data) {
  try {
    if (isEditing) {
      await updateRestaurant(id, data)
    } else {
      await createRestaurant(data)
    }
    navigate('/')
  } catch (err) {
    setError('root', { message: err.message })
  }
}
```

**Qué destacar:** `useParams()` da el `:id` de la URL. Si existe → modo edición. Un mismo componente sirve para dos flujos: patrón muy común en apps reales.

---

### Paso 6 — Zustand: autenticación

**Archivo a crear:** `store/useAuthStore.js`

```js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const res = await axios.post('https://api-donde.onrender.com/api/auth/login', { email, password })
        set({ token: res.data.token, user: res.data.user })
      },
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

**Conectar en `LoginPage`:**
```js
const { login } = useAuthStore()

async function onSubmit({ email, password }) {
  try {
    await login(email, password)
    navigate('/')
  } catch (err) {
    setError('root', { message: 'Credenciales incorrectas' })
  }
}
```

**Qué destacar:** `persist` de Zustand guarda el estado en `localStorage` automáticamente — al recargar la página el token persiste.

**Preguntas frecuentes:**
- *"¿Es seguro guardar el token en localStorage?"* → Para este tipo de app sí. En sistemas con datos muy sensibles (bancarios, médicos) se evalúan cookies `httpOnly`. Para SPAs es el estándar.

---

### Paso 7 — Rutas protegidas

**Archivo a crear:** `router/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
```

**Actualizar `AppRouter.jsx`:**
```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/restaurants/new" element={<RestaurantFormPage />} />
  <Route path="/restaurants/:id/edit" element={<RestaurantFormPage />} />
</Route>
```

**Qué destacar:** `<Outlet />` renderiza la ruta hija si la condición se cumple. `<Navigate replace>` hace redirect sin agregar al historial (el usuario no puede volver con el botón atrás).

---

### Paso 8 — Navbar con sesión

**Archivo a abrir:** `components/Navbar.jsx`

**Conectar con el store:**
```jsx
import { useAuthStore } from '../store/useAuthStore'

const { user, token, logout } = useAuthStore()
```

Y mostrar condicionalmente según `token`.

**Qué destacar:** Zustand es reactivo — cuando `token` cambia (login/logout), todos los componentes que lo consuman se re-renderizan automáticamente. No se necesita Context ni prop drilling.
