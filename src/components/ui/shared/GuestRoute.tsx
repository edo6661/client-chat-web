import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'


const GuestRoute = () => {
  const { authUser } = useAuthStore()

  if (authUser) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default GuestRoute