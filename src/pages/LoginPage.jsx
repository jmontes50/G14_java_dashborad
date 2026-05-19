import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register, //registro de un input, 
    handleSubmit, //una función que recibe otra función, para manejar el submit
    formState: { errors, isSubmitting }, // errores en cada input y el estado
    setError, //para indicar un error
  } = useForm()

  // TODO: Si ya hay sesión activa, redirigir al dashboard
  // Pista: leer `token` del store de Zustand y usar useEffect + navigate

  // TODO: Implementar onSubmit
  // 1. Llamar a login(email, password) del store de Zustand
  // 2. Si tiene éxito, navegar a "/"
  // 3. Si falla, mostrar el error con setError("root", { message: "..." })
  async function onSubmit(data) {
    // Tu código aquí
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center mb-4">Iniciar sesión</h2>

          {/* TODO: Mostrar alerta de error si errors.root existe */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="admin@gastro.com"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                ///* register pedirá 02 args (nombre de registro, { errores y el mensaje }) */
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
                {...register('password', {
                  required: 'La contraseña es obligatoria', 
                  minLength: {
                    value: 6,
                    message: "la longitud tiene que ser de 6 carácteres a más"
                  }
                })}
              />
              {errors.password && console.log(errors)}
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
