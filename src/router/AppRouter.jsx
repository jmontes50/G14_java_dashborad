import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import RestaurantFormPage from '../pages/RestaurantFormPage'
import ProtectedRoute from './ProtectedRoute'

// TODO (más adelante): Importar ProtectedRoute y envolver las rutas privadas

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* TODO: Estas rutas deben ser protegidas. Por ahora son públicas. */}
          
          <Route path="/restaurants/new" element={<ProtectedRoute>
            <RestaurantFormPage />
          </ProtectedRoute>} />
          <Route path="/restaurants/:id/edit" element={<RestaurantFormPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
