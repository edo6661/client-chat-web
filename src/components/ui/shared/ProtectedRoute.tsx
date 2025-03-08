import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { authUser } = useAuthStore()

  if (!authUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute