import { User } from '@/types/user.type'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = (
  { user, children }: {
    user: User | null,
    children: React.ReactNode
  }
) => {
  if (!user) {
    return <Navigate to='/login' />
  }
  return children
}

export default ProtectedRoute