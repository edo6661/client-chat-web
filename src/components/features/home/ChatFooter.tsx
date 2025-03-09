import { ChatState, initialChatState } from '@/state/chat.state'
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

const ChatFooter = (
  { sendMessage }: { sendMessage: (data: ChatState) => void }
) => {
  const [formState, setFormState] = useState(initialChatState);
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return toast.error('No file selected')
    if (file.size > 1024 * 1024 * 2) return toast.error('Image size must be less than 2mb')
    if (!file.type.startsWith('image/')) return toast.error('File type not supported')

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormState({ ...formState, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }
  const removeImage = () => {
    setFormState({ ...formState, image: null })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
  const handleSendMessage = () => {
    const { text, image: imagePreview } = formState
    if (!text.trim() && !imagePreview) return
    console.log("SENDING MESSAGE:", text, imagePreview)
    startTransition(async () => {
      await sendMessage({ text, image: imagePreview })
      setFormState(initialChatState)
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)

  },)

  return (
    <div className='flex items-center gap-4'>
      <input
        type="text"
        placeholder="Type a message"
        className='w-full border-none bg-transparent focus:outline-none'
        value={formState.text}
        onChange={(e) => setFormState({ ...formState, text: e.target.value })}
        disabled={isPending}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className='hidden'
        onChange={handleImageChange}
        disabled={isPending}
      />
      {formState.image && (
        <div className='relative'>
          <img src={formState.image} alt="preview" className='w-12 h-12 rounded-lg' />
          <button onClick={removeImage} className='absolute top-0 right-0 p-1 bg-neutral-100/50 rounded-full'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <button
        onClick={() => fileInputRef.current?.click()}
        className='p-2 bg-neutral-100/50 rounded-full'

      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <button
        onClick={handleSendMessage}
        className='p-2 bg-neutral-100/50 rounded-full'
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  )
}

export default ChatFooter