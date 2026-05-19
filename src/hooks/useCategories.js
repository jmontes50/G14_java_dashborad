import { useState, useEffect } from 'react'
import client from '../api/client'

export function useCategories() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO: Al montarse, llamar a GET /categories y guardar el resultado en `data`
  useEffect(() => {
    // Tu código aquí
    setLoading(true);
    client.get('/categories')
    .then((res) => {
      console.log(res.data)
      setData(res.data.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    })
  }, [])

  return { data, loading, error }
}
