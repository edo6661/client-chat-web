import { Button } from "@/components/ui/button"
import { initialUserState, userInputs } from "@/state/user.state"
import { useAuthStore } from "@/store/useAuthStore"
import { useState, useTransition } from "react"

const ProfilePage = () => {
  const { authUser, updateProfile, error } = useAuthStore()
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState(initialUserState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await updateProfile({
        profilePic: formState.profilePic,
      });
    })
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result as string;
      setFormState({ ...formState, profilePic: base64 });

    }
  }
  return (
    <div className="container flex items-center justify-center">
      <p>
        test
      </p>
      <form className='max-w-xl mx-auto'
        onSubmit={handleSubmit}>
        <label htmlFor="profilePic" className="cursor-pointer">
          <img
            src={formState.profilePic || authUser?.profilePic || 'avatar.png'}
            alt="profile"
            className="h-40 w-40 rounded-full object-cover"

          />
          <input type="file" id="profilePic" className="hidden" onChange={handleImageUpload}
            disabled={isPending}
          />
        </label>
        {userInputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700"
              htmlFor={input.name}
            >{input.label}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder={input.placeholder}
                value={formState[input.name]}
                onChange={handleChange}
                disabled={isPending}
              />

            </div>
          </div>
        ))
        }
        {error && (
          <div className="text-red-500 text-sm mb-4">
            <p>
              {error.message}
            </p>
            {error.errors && (
              <ul>
                {error.errors.map((err) => (
                  <li key={err.field}>{err.field}-{err.message}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <Button
          disabled={isPending}
          type="submit"
          className="mt-4"
        >
          Update Profile
        </Button>

      </form>
    </div>
  )
}

export default ProfilePage