import { User } from '@/types/user.type'
import React from 'react'
import { Navigate } from 'react-router-dom'

const GuestRoute = (
  { user, children }: {
    user: User | null,
    children: React.ReactNode
  }
) => {
  if (user) {
    return <Navigate to='/' />
  }
  return children
}

export default GuestRoute