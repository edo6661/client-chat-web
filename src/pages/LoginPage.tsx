import LoginForm from '@/components/features/auth/LoginForm';
import { initialLoginState, LoginState } from '@/state/login.state';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';


const LoginPage = () => {

  const { login, error, clearErrorMessage } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<LoginState>(initialLoginState);
  const [showPassword] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await login(formState);

    })
  };

  useEffect(() => {
    if (!error?.message) return
    toast.error(error.message)
    return () => {
      clearErrorMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.message])

  return (
    <>
      <title>Login</title>
      <form className='container mt-8'
        onSubmit={handleSubmit}
      >
        <LoginForm
          formState={formState}
          showPassword={showPassword}
          handleChange={handleChange}
          isPending={isPending}
          error={error}
        />


      </form >
    </>
  )
}

export default LoginPage