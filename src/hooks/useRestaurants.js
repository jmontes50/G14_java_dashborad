import { useState } from 'react'
import client from '../api/client'

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO: Llamar a GET /restaurants con los parámetros { page, limit, district, category }
  // Actualizar los estados: restaurants, pagination, loading, error
  async function fetchRestaurants({ page = 1, limit = 9, district, category } = {}) {
    try {
      setLoading(true)
      const respuesta = await client.get('/restaurants');
      console.log(respuesta)
      setRestaurants(respuesta.data.data);
      setPagination(respuesta.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  // TODO: Llamar a POST /restaurants con los datos del formulario
  async function createRestaurant(data) {
    // Tu código aquí
  }

  // TODO: Llamar a PUT /restaurants/:id con los datos del formulario
  async function updateRestaurant(id, data) {
    // Tu código aquí
  }

  // TODO: Llamar a DELETE /restaurants/:id
  async function removeRestaurant(id) {
    // Tu código aquí
  }

  return {
    restaurants,
    pagination,
    loading,
    error,
    fetchRestaurants,
    createRestaurant,
    updateRestaurant,
    removeRestaurant,
  }
}
