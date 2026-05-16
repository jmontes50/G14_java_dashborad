import { useState } from 'react'

export default function FilterBar({ districts = [], categories = [], onFilterChange }) {
  const [district, setDistrict] = useState('')
  const [category, setCategory] = useState('')

  function handleDistrictChange(e) {
    const value = e.target.value
    setDistrict(value)
    onFilterChange({ district: value, category })
  }

  function handleCategoryChange(e) {
    const value = e.target.value
    setCategory(value)
    onFilterChange({ district, category: value })
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        className="select select-bordered select-sm"
        value={district}
        onChange={handleDistrictChange}
      >
        <option value="">Todos los distritos</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select
        className="select select-bordered select-sm"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  )
}
