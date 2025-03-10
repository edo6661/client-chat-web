import { LogOut, MessageCircleIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface AsideProps {
  profilePic: string
  logout: () => Promise<void>
}

const Aside = (
  { profilePic, logout }: AsideProps
) => {
  const location = useLocation()
  const path = location.pathname
  const activeStyle = 'text-white bg-primary shadow-sm shadow-primary'
  return (
    <aside className='min-w-14 bg-secondary flex flex-col items-center py-6 gap-8'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <img
          alt='logo'
          src='/logo.png'
        />
        <Link
          className={`block hover:bg-primary transition-colors duration-300 rounded-xl p-2 hover:text-white cursor-pointer hover:shadow-primary hover:shadow-sm ${path === '/profile' && activeStyle}`}
          to="/profile"
        >
          <img
            alt='logo'
            src={profilePic}
            className='w-8 h-8 rounded-full'
          />
        </Link>
      </div>
      <div className="flex-1">
        <Link
          className={`block hover:bg-primary transition-colors duration-300 rounded-xl p-2 hover:text-white cursor-pointer hover:shadow-primary hover:shadow-sm ${path === '/' && activeStyle}`}
          to="/"
        >
          <MessageCircleIcon />
        </Link>
      </div>

      <div
        className='flex flex-col gap-4 items-center justify-center'
      >
        <div
          className='hover:bg-primary transition-colors duration-300 rounded-xl p-2 hover:text-white cursor-pointer hover:shadow-primary hover:shadow-sm'
          onClick={
            async () => {
              await logout()
            }
          }
        >
          <LogOut />
        </div>

      </div>
    </aside>
  )
}

export default Aside