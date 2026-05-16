import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, token } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  async function onSubmit({ email, password }) {
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('root', { message: err.message || 'Credenciales incorrectas' })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center mb-4">Iniciar sesión</h2>

          {errors.root && (
            <div className="alert alert-error mb-4">
              <span>{errors.root.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="admin@gastro.com"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                {...register('email', { required: 'El correo es obligatorio' })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
