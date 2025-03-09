import LoginForm from '@/components/features/auth/LoginForm';
import { Button } from '@/components/ui/button';
import ErrorResponseHandler from '@/components/ui/shared/ErrorResponseHandler';
import { initialLoginState, loginInputs, LoginState } from '@/state/login.state';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();

  const { login, error } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<LoginState>(initialLoginState);
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
      await login(formState);

    })
  };




  return (
    <form className='max-w-xl mx-auto'
      onSubmit={handleSubmit}
    >
      <LoginForm
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
    </form >
  )
}

export default LoginPage