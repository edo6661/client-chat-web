import { User } from '@/types/user.type'
import { ArrowLeft } from 'lucide-react'

const ChatHeader = (
  { selectedUser, isOnline, setSelectedUser }: {
    selectedUser: User | null, isOnline: boolean,
    setSelectedUser: (user: User | null) => void

  }
) => {

  return (
    <div className='flex items-center justify-between gap-4 bg-primary-foreground pt-6 pb-4 pl-4 border border-l-muted'>

      <div className='flex gap-4 items-center'>
        <div className="md:hidden"
          onClick={() => setSelectedUser(null)}
        >
          <ArrowLeft />

        </div>
        <img
          src={selectedUser?.profilePic}
          alt={selectedUser?.fullname}
          className='w-12 h-12 rounded-full'
        />
        <div>
          <p className='text-lg font-medium'>{selectedUser?.fullname}</p>
          {isOnline ? <span className='text-green-500'>Online</span> : <span className='text-red-500'>Offline</span>}
        </div>
      </div>


    </div>
  )
}

export default ChatHeader