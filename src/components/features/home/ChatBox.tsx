import { useChatStore } from '@/store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useAuthStore } from '@/store/useAuthStore';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const ChatBox = (
) => {
  const { selectedUser, isMessagesLoading, messages, sendMessage, setSelectedUser } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore()
  const { width } = useWindowDimensions()

  const isUserOnline = (userId: string) => onlineUsers.includes(userId)

  return (
    <div className={`flex-1 bg-secondary `}
      style={{
        display: width > 768 || selectedUser !== null ? 'block' : 'none',
      }}
    >
      {!selectedUser && (
        <div className='flex items-center justify-center h-full '>
          <p>
            Select a user to start chatting
          </p>
        </div>
      )}
      {isMessagesLoading && <div className='flex items-center justify-center h-full '>
        <p>Loading...</p>
      </div>
      }
      {(!isMessagesLoading && selectedUser) && (
        <div className='flex flex-col h-full'>
          <ChatHeader
            selectedUser={selectedUser}
            isOnline={isUserOnline(selectedUser._id!)}
            setSelectedUser={setSelectedUser}
          />


          <ChatBody
            messages={messages}
            authUser={authUser}
            selectedUser={selectedUser}
          />
          <ChatFooter
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div >
  )
}

export default ChatBox