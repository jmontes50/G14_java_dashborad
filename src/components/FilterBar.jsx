import { useState } from 'react'

export default function FilterBar({ districts = [], categories = [], onFilterChange }) {
  const [district, setDistrict] = useState('')
  const [category, setCategory] = useState('')

  // TODO: Al cambiar el select de distrito, actualizar el estado local
  // y llamar a onFilterChange({ district: valor, category: valorActual })
  function handleDistrictChange(e) {
    // Tu código aquí
  }

  // TODO: Al cambiar el select de categoría, actualizar el estado local
  // y llamar a onFilterChange({ district: valorActual, category: valor })
  function handleCategoryChange(e) {
    // Tu código aquí
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
        {console.log({categories})}
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  )
}
