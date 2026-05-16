import { useState } from 'react'
import client from '../api/client'

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchRestaurants({ page = 1, limit = 9, district, category } = {}) {
    setLoading(true)
    setError(null)
    try {
      const params = { page, limit }
      if (district) params.district = district
      if (category) params.category = category
      const res = await client.get('/restaurants', { params })
      setRestaurants(res.data.data)
      setPagination(res.data.pagination)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function createRestaurant(data) {
    const res = await client.post('/restaurants', data)
    return res.data
  }

  async function updateRestaurant(id, data) {
    const res = await client.put(`/restaurants/${id}`, data)
    return res.data
  }

  async function removeRestaurant(id) {
    const res = await client.delete(`/restaurants/${id}`)
    return res.data
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
