import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRestaurants } from '../hooks/useRestaurants'
import { useDistricts } from '../hooks/useDistricts'
import { useCategories } from '../hooks/useCategories'
import client from '../api/client'
import { toast } from 'react-toastify'

export default function RestaurantFormPage() {
  const { id } = useParams()
  console.log({ id });
  const isEditing = Boolean(id) //estamos convirtiendo a un valor V/F
  const navigate = useNavigate()

  const { createRestaurant, updateRestaurant } = useRestaurants()
  const { data: districts } = useDistricts()
  const { data: categories } = useCategories()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  useEffect(() => {
    if (!isEditing) return
    client.get(`/restaurants/${id}`).then((res) => {
      const r = res.data
      //reset da valor al estado interno de useForm
      reset({
        name: r.name,
        description: r.description,
        address: r.address,
        phone: r.phone,
        opening_time: r.opening_time,
        closing_time: r.closing_time,
        district_id: r.district_id,
        category_id: r.category_id,
        image_url: r.image_url,
      })
    })
  }, [id, isEditing, reset])

  // TODO: Implementar onSubmit
  // Si isEditing: llamar a updateRestaurant(id, data)
  // Si no: llamar a createRestaurant(data)
  // Tras éxito: navegar al dashboard con navigate("/")
  // Si falla: setError("root", { message: err.message })
  async function onSubmit(data) {
    console.log("Submit crear", data);
    
    //creando
    const res = await createRestaurant(data)
    console.log("crear restaurante", res);
    toast.success("Restaurante creado");
    navigate('/');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar restaurante' : 'Nuevo restaurante'}
      </h1>

      {/* TODO: Mostrar alerta de error si errors.root existe */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Nombre *</span></label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Descripción</span></label>
          <textarea className="textarea textarea-bordered w-full" rows={3} {...register('description')} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Dirección *</span></label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.address ? 'input-error' : ''}`}
            {...register('address', { required: 'La dirección es obligatoria' })}
          />
          {errors.address && <span className="text-error text-sm mt-1">{errors.address.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Teléfono</span></label>
            <input type="text" className="input input-bordered" {...register('phone')} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">URL de imagen</span></label>
            <input type="text" className="input input-bordered" {...register('image_url')} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Horario apertura</span></label>
            <input type="time" className="input input-bordered" {...register('opening_time')} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Horario cierre</span></label>
            <input type="time" className="input input-bordered" {...register('closing_time')} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Distrito *</span></label>
            <select
              className={`select select-bordered ${errors.district_id ? 'select-error' : ''}`}
              {...register('district_id', { required: 'Selecciona un distrito' })}
            >
              <option value="">Seleccionar...</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.district_id && <span className="text-error text-sm mt-1">{errors.district_id.message}</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Categoría *</span></label>
            <select
              className={`select select-bordered ${errors.category_id ? 'select-error' : ''}`}
              {...register('category_id', { required: 'Selecciona una categoría' })}
            >
              <option value="">Seleccionar...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.category_id && <span className="text-error text-sm mt-1">{errors.category_id.message}</span>}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
            {isSubmitting
              ? <span className="loading loading-spinner loading-sm" />
              : isEditing ? 'Guardar cambios' : 'Crear restaurante'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
