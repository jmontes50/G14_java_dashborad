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
| `api/client.js` | Instancia de Axios configurada con la URL base |

---

## Qué vamos a construir en la sesión

- [ ] Paso 1 — Explorar el proyecto: estructura, dependencias, cómo corre
- [ ] Paso 2 — Completar `useRestaurants.js` y `client.js` para ver restaurantes en pantalla
- [ ] Paso 3 — Conectar los filtros: distrito y categoría
- [ ] Paso 4 — Completar el formulario de **crear** restaurante
- [ ] Paso 5 — Adaptar el formulario para **editar** restaurante
- [ ] Paso 6 — Crear el store de autenticación con Zustand y conectar el login
- [ ] Paso 7 — Proteger las rutas privadas con `ProtectedRoute`
- [ ] Paso 8 — Conectar la Navbar con el estado de sesión (usuario + logout)
