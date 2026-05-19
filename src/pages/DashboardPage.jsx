import { useState, useEffect } from 'react'
import { useRestaurants } from '../hooks/useRestaurants'
import { useDistricts } from '../hooks/useDistricts'
import { useCategories } from '../hooks/useCategories'
import RestaurantCard from '../components/RestaurantCard'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'

export default function DashboardPage() {
  const { restaurants, pagination, loading, error, fetchRestaurants, removeRestaurant } = useRestaurants()
  const { data: districts } = useDistricts()
  const { data: categories } = useCategories()

  const [filters, setFilters] = useState({ district: '', category: '' })

  // TODO: Al montarse y cada vez que cambien los filtros, llamar a fetchRestaurants
  // Pasar los filtros activos como parámetros
  useEffect(() => {
    // Tu código aquí
    fetchRestaurants();
  }, [filters])

  // TODO: Actualizar el estado de filtros al cambiar un select
  function handleFilterChange(newFilters) {
    // Tu código aquí
  }

  // TODO: Llamar a fetchRestaurants con la nueva página y los filtros actuales
  function handlePageChange(page) {
    // Tu código aquí
  }

  // TODO: Llamar a removeRestaurant(id) y refrescar la lista
  async function handleDelete(id) {
    // Tu código aquí
  }

  // TODO: Leer si el usuario está autenticado desde el store de Zustand
  const isAuthenticated = false

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  console.log({ categories })
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurantes</h1>
      </div>

      <FilterBar
        districts={districts}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {console.log({ districts })}

      {restaurants.length === 0 ? (
        <div className="alert alert-info mt-6">
          <span>No se encontraron restaurantes con los filtros seleccionados.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              showActions={isAuthenticated}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {pagination && (
        <div className="mt-8">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
