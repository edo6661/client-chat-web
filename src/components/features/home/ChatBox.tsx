import { useChatStore } from '@/store/useChatStore';
import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useAuthStore } from '@/store/useAuthStore';

const ChatBox = () => {
  const { selectedUser, isMessagesLoading, getMessages, messages, setSelectedUser, sendMessage, } = useChatStore();
  const { authUser } = useAuthStore()

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?._id])
  return (
    <div className='flex-1 bg-neutral-100/50'>
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
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
          <hr
            className='border-b'
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