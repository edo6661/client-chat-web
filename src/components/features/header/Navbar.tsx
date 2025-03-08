import { User } from '@/types/user.type'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (
  { user, logout }: {
    user: User | null,
    logout: () => Promise<void>
  }
) => {
  return (
    <header className='container bg-red-500 justify-between flex gap-4'>
      <Link to='/'>Home</Link>
      {!user && (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link></>
      )}
      {user && (
        <>
          <Link to='/settings'>Settings</Link>
          <Link to='/profile'>Profile</Link>
          <button
            onClick={
              async () => {
                await logout()
              }
            }
          >
            logout
          </button>
        </>
      )}

    </header>
  )
}

export default Navbar