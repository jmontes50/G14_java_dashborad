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
      console.log(client)
      const respuesta = await client.get('/restaurants');
      console.log(respuesta)
      setRestaurants(respuesta.data.data);
      setPagination(respuesta.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(true);
    }
  }

  // TODO: Llamar a POST /restaurants con los datos del formulario
  async function createRestaurant(data) {
    const res = await client.post('/restaurants', data)
    return res.data;
  }

  // TODO: Llamar a PUT /restaurants/:id con los datos del formulario
  async function updateRestaurant(id, data) {
    const res = await client.put(`/restaurants/${id}`, data);
    return res.data;
  }

  // TODO: Llamar a DELETE /restaurants/:id
  async function removeRestaurant(id) {
    const res = await client.delete(`/restaurants/${id}`);
    return res.data;
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
