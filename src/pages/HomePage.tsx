/* eslint-disable react-hooks/exhaustive-deps */
import Aside from '@/components/features/home/Aside';
import ChatBox from '@/components/features/home/ChatBox';
import SelectUserToChat from '@/components/features/home/SelectUserToChat';
import { Input } from '@/components/ui/input';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore'
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react'

const HomePage = () => {
  const { width } = useWindowDimensions()
  const [search, setSearch] = useState('');
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { onlineUsers, authUser, logout } = useAuthStore()
  useEffect(() => {
    getUsers();

  }, []);
  useEffect(() => {

    if (selectedUser) {
      getMessages(selectedUser._id!)
      subscribeToMessages()
      return () => unsubscribeFromMessages()
    }

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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()))
  }, [users, search])

  const isWidthMobileAndUserSelected = width < 768 && selectedUser != null

  const userChat = () => {
    return (
      <div className={`overflow-y-auto min-w-72 scrollbar-none md:flex-none flex-1 overflow-x-hidden ${isWidthMobileAndUserSelected ? 'hidden' : 'block'}`}>
        {!isUsersLoading && users.length === 0 && <p>No users found</p>}
        {!isUsersLoading && users.length > 0 && (
          <div className='space-y-4 pt-6'>
            <h2 className='font-bold text-3xl px-4'>
              Messages
            </h2>
            <div className='px-4 relative'>
              <Input
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className='bg-muted pl-6 placeholder:text-ring w-full'
              />
              <Search
                className='absolute text-ring w-3 h-3 top-1/2 transform -translate-y-1/2 left-6'
              />
            </div>
            <div>
              {filteredUsers.map((user) =>
                <SelectUserToChat
                  onlineUsers={onlineUsers}
                  user={user}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  key={user._id}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <title>Home</title>
      <main>
        <section className='flex h-[100vh] bg-primary-foreground'>
          <Aside
            profilePic={authUser?.profilePic ?? './profile.png'}
            logout={logout}
          />
          {userChat()}
          <ChatBox

          />
        </section>
      </main>
    </>
  )

}

export default HomePage