import RegisterForm from '@/components/features/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import ErrorResponseHandler from '@/components/ui/shared/ErrorResponseHandler';
import { initialRegisterState, RegisterState } from '@/state/register.state';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useState, useTransition } from 'react'


const RegisterPage = () => {

  const { register, error } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<RegisterState>(initialRegisterState);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  const handleShowPassword = (name: string) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await register(formState);
    })
  };





  return (
    <form className='max-w-xl mx-auto'
      onSubmit={handleSubmit}
    >
      <RegisterForm
        formState={formState}
        showPassword={showPassword}
        handleChange={handleChange}
        handleShowPassword={handleShowPassword}
      />
      <ErrorResponseHandler
        error={error}
      />
      <Button
        type="submit"
        disabled={isPending}
      >
        Submit
      </Button>
    </form>
  )
}

export default RegisterPage