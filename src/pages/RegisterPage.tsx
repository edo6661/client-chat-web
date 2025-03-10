import RegisterForm from '@/components/features/auth/RegisterForm';
import { initialRegisterState, RegisterState } from '@/state/register.state';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';


const RegisterPage = () => {

  const { register, error, clearErrorMessage, clearError } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<RegisterState>(initialRegisterState);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShowPassword = (name: string) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await register(formState);
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
    <form className='container mt-8'
      onSubmit={handleSubmit}
    >
      <RegisterForm
        formState={formState}
        showPassword={showPassword}
        handleChange={handleChange}
        error={error}
        isPending={isPending}
      />

    </form>
  )
}

export default RegisterPage