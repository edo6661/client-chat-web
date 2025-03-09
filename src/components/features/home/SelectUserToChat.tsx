import { User } from '@/types/user.type'
import React from 'react'
interface SelectUserToChatProps {
  user: User;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}
const SelectUserToChat = (
  { user, selectedUser, setSelectedUser }: SelectUserToChatProps
) => {
  return (
    <div
      key={user._id}
      className={`p-4 rounded-l-md cursor-pointer ${selectedUser?._id === user._id ? 'bg-gray-200' : ''}`}
      onClick={() => setSelectedUser(user)}
    >
      <div className='flex items-center gap-4'>
        <img
          src={user.profilePic}
          alt={user.fullname}
          className='w-12 h-12 rounded-full'
        />
        <div className='max-w-28'>
          <h3 className='truncate'>{user.fullname}</h3>
          <span>Online</span>
        </div>
      </div>

    </div>)
}

export default SelectUserToChat