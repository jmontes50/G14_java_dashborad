import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import RestaurantFormPage from '../pages/RestaurantFormPage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/restaurants/new" element={<RestaurantFormPage />} />
            <Route path="/restaurants/:id/edit" element={<RestaurantFormPage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}
