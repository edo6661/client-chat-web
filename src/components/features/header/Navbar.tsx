import { User } from '@/types/user.type'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (
  { user, logout }: {
    user: User | null,
    logout: () => Promise<void>
  }

) => {
  const location = useLocation()
  const path = location.pathname

  return path === '/profile' && (
    <header className='bg-primary text-primary-foreground rounded-b-sm'>
      <div className=' justify-around flex gap-4 py-2 container'>
        {!user && (
          <>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link></>
        )}
        {user && (
          <>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <button
              onClick={
                async () => {
                  await logout()
                }
              }
            >
              Logout
            </button>
          </>
        )}

      </div>
    </header>
  )
}

export default Navbar