import { useState, useEffect } from 'react'
import client from '../api/client'

export function useCategories() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO: Al montarse, llamar a GET /categories y guardar el resultado en `data`
  useEffect(() => {
    // Tu código aquí
  }, [])

  return { data, loading, error }
}
