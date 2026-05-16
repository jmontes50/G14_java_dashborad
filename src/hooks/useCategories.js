import { useState, useEffect } from 'react'
import client from '../api/client'

export function useCategories() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    client
      .get('/categories')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
