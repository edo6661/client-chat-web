import Aside from "@/components/features/home/Aside"
import { Button } from "@/components/ui/button"
import { initialUserState } from "@/state/user.state"
import { useAuthStore } from "@/store/useAuthStore"
import { useState, useTransition } from "react"

const ProfilePage = () => {
  const { authUser, updateProfile, error, logout } = useAuthStore()
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState(initialUserState);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await updateProfile({
        profilePic: formState.profilePic,
      });
      await logout();
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
  const content = () => (
    <form className='max-w-xl mx-auto items-center flex flex-col justify-center'
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
        disabled={isPending || !formState.profilePic}
        type="submit"
        className="mt-4"
      >
        Update Profile
      </Button>

    </form>
  )
  const profilePic = authUser?.profilePic ?? './profile.png'
  return (
    <div className="flex h-[100vh] bg-primary-foreground">
      <Aside
        profilePic={profilePic}
        logout={logout}
      />
      {content()}

    </div>
  )
}

export default ProfilePage