import { useState, useEffect } from 'react'
import { useRestaurants } from '../hooks/useRestaurants'
import { useDistricts } from '../hooks/useDistricts'
import { useCategories } from '../hooks/useCategories'
import { useAuthStore } from '../store/useAuthStore'
import RestaurantCard from '../components/RestaurantCard'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'

export default function DashboardPage() {
  const { restaurants, pagination, loading, error, fetchRestaurants, removeRestaurant } = useRestaurants()
  const { data: districts } = useDistricts()
  const { data: categories } = useCategories()
  const token = useAuthStore((state) => state.token)

  const [filters, setFilters] = useState({ district: '', category: '' })

  useEffect(() => {
    fetchRestaurants({ page: 1, ...filters })
  }, [filters])

  function handleFilterChange(newFilters) {
    setFilters(newFilters)
  }

  function handlePageChange(page) {
    fetchRestaurants({ page, ...filters })
  }

  async function handleDelete(id) {
    try {
      await removeRestaurant(id)
      fetchRestaurants({ page: 1, ...filters })
    } catch (err) {
      alert(err.message)
    }
  }

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
              showActions={Boolean(token)}
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
