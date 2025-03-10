import { User } from '@/types/user.type'
interface SelectUserToChatProps {
  user: User;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  onlineUsers: string[];
}
const SelectUserToChat = (
  { user, selectedUser, setSelectedUser, onlineUsers }: SelectUserToChatProps
) => {
  const isUserOnline = onlineUsers.includes(user._id!);
  return (
    <div
      className={`py-2 pl-4 rounded-l-md cursor-pointer ${selectedUser?._id === user._id ? 'bg-muted' : ''}`}
      onClick={() => setSelectedUser(user)}
    >
      <div className='flex items-center gap-4'>
        <div className="relative">
          <img
            src={user.profilePic}
            alt={user.fullname}
            className='w-12 h-12 rounded-full'
          />
          {isUserOnline && (
            <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0'></div>

          )}
        </div>
        <div className='max-w-28'>
          <h3 className='truncate'>{user.fullname}</h3>
          <span
            className={`text-xs ${isUserOnline ? 'text-green-500' : 'text-neutral-500'}`}
          >
            {isUserOnline ? 'online' : 'offline'}
          </span>
        </div>
      </div>

    </div>)
}

export default SelectUserToChat