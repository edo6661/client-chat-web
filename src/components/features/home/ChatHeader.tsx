import { Button } from '@/components/ui/button'
import { User } from '@/types/user.type'
import React from 'react'
import { X } from 'lucide-react';

const ChatHeader = (
  { setSelectedUser, selectedUser }: { setSelectedUser: (user: User | null) => void, selectedUser: User | null }
) => {
  const emptyUser = () => {
    setSelectedUser(null)
  }
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex gap-4 items-center'>
        <img
          src={selectedUser?.profilePic}
          alt={selectedUser?.fullname}
          className='w-12 h-12 rounded-full'
        />
        <div>
          <p>{selectedUser?.fullname}</p>
          <p>Offline</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={emptyUser}
      >
        <X />
      </Button>

    </div>
  )
}

export default ChatHeader