import { Message } from '@/types/message.type'
import { User } from '@/types/user.type'
import React, { useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

const ChatBody = (
  { messages, selectedUser, authUser }: { messages: Message[], selectedUser: User | null, authUser: User | null }
) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const formatMessageTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return 'Just now'
    }
  }

  if (!selectedUser || !authUser) return null

  return (
    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-neutral-500">Start a conversation with {selectedUser.fullname || 'this user'}</p>
        </div>
      ) : (
        messages.map((message, index) => {
          const isAuthUserMessage = message.senderId === authUser._id
          const user = isAuthUserMessage ? authUser : selectedUser

          return (
            <div
              key={message._id}
              className={cn(
                "flex gap-3 items-start",
                isAuthUserMessage ? "justify-end" : "justify-start"
              )}
            >
              {!isAuthUserMessage && (
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    {selectedUser.profilePic ? (
                      <img src={selectedUser.profilePic} alt={selectedUser.fullname || 'User'} />
                    ) : (
                      <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white font-medium">
                        {(selectedUser.fullname || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Avatar>
                </div>
              )}

              <div className={cn(
                "max-w-md space-y-1",
                isAuthUserMessage ? "items-end" : "items-start"
              )}>
                {index === 0 || messages[index - 1]?.senderId !== message.senderId ? (
                  <div className="text-xs font-medium text-neutral-600 mb-1 px-1">
                    {user.fullname || (isAuthUserMessage ? 'You' : 'User')}
                  </div>
                ) : null}

                <div className={cn(
                  "px-4 py-2 rounded-lg shadow-sm",
                  isAuthUserMessage
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-neutral-200 text-neutral-900"
                )}>
                  {message.text}
                  {message.image && (
                    <div className="mt-2">
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="rounded-lg max-h-64 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className={cn(
                  "text-xs text-neutral-500",
                  isAuthUserMessage ? "text-right" : "text-left"
                )}>
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>

              {isAuthUserMessage && (
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    {authUser.profilePic ? (
                      <img src={authUser.profilePic} alt={authUser.fullname || 'You'} />
                    ) : (
                      <div className="bg-green-500 h-full w-full flex items-center justify-center text-white font-medium">
                        {(authUser.fullname || 'Y').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Avatar>
                </div>
              )}
            </div>
          )
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatBody