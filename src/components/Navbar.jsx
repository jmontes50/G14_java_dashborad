import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
// TODO: Importar useAuthStore para leer el estado de sesión

export default function Navbar() {
  // TODO: Leer `user`, `token` y `logout` del store de Zustand
  // const user = null
  // const token = null
  // const logout = () => {}

  const { user, token, logout } = useAuthStore();

  return (
    <div className="navbar bg-base-200 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          🍽️ Directorio Gastronómico
        </Link>
      </div>

      <div className="flex-none flex items-center gap-3">
        {token ? (
          <>
            <Link to="/restaurants/new" className="btn btn-primary btn-sm">
              + Nuevo restaurante
            </Link>
            <span className="text-sm">Hola, {user?.username}</span>
            <button className="btn btn-ghost btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost btn-sm">
            Ingresar
          </Link>
        )}
      </div>
    </div>
  )
}
