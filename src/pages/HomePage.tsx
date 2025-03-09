/* eslint-disable react-hooks/exhaustive-deps */
import ChatBox from '@/components/features/home/ChatBox';
import SelectUserToChat from '@/components/features/home/SelectUserToChat';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore'
import { useEffect } from 'react'

const HomePage = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { onlineUsers } = useAuthStore()
  useEffect(() => {
    getUsers();

  }, []);
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id!)
      subscribeToMessages()
    }
    return () => unsubscribeFromMessages()

  }, [selectedUser?._id])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedUser(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [setSelectedUser]);



  return (
    <main className='pt-4'>
      <div>
        <section className='pr-4 flex h-[90vh]'>
          <div className='space-y-4 overflow-y-auto min-w-48 '>
            {!isUsersLoading && users.length === 0 && <p>No users found</p>}
            {!isUsersLoading && users.length > 0 && users.map((user) =>
              <SelectUserToChat
                onlineUsers={onlineUsers}
                user={user}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                key={user._id}
              />
            )}

          </div>
          <ChatBox />
        </section>
      </div>
    </main>
  )
}

export default HomePage