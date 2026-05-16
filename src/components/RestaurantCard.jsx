import { Link } from 'react-router-dom'

export default function RestaurantCard({ restaurant, showActions = false, onDelete }) {
  const { id, name, address, opening_time, closing_time, district, category, image_url } = restaurant

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      {image_url && (
        <figure>
          <img src={image_url} alt={name} className="h-48 w-full object-cover" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {category && <div className="badge badge-secondary badge-sm">{category.name}</div>}
        </h2>

        <p className="text-sm text-base-content/70">{address}</p>

        {district && (
          <p className="text-sm text-base-content/60">📍 {district.name}</p>
        )}

        {(opening_time || closing_time) && (
          <p className="text-sm text-base-content/60">🕐 {opening_time} – {closing_time}</p>
        )}

        {showActions && (
          <div className="card-actions justify-end mt-2">
            <Link to={`/restaurants/${id}/edit`} className="btn btn-sm btn-outline">
              Editar
            </Link>
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={() => {
                if (confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
                  onDelete(id)
                }
              }}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
