import { initialRegisterState, registerInputs, RegisterState } from '@/state/register.state';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, message, error } = useAuthStore();
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
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    startTransition(async () => {
      await register(formState);
    })
  };

  useEffect(() => {
    if (message) {
      toast.success(message)
      navigate('/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])



  return (
    <form className='max-w-xl mx-auto'>
      {registerInputs.map((input) => (
        <div key={input.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{input.label}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showPassword[input.name] ? 'text' : input.type}
              name={input.name}
              id={input.name}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder={input.placeholder}
              value={formState[input.name]}
              onChange={handleChange}
            />
            {(input.type === 'password' || input.type === 'confirmPassword') && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  className="text-gray
                  -500 sm:text-sm border-gray-300 rounded-md"
                  onClick={() => handleShowPassword(input.name)}
                >
                  {showPassword[input.name] ? 'Hide' : 'Show'}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
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
      <button
        type="submit"

        className="bg-indigo-500 text-white rounded-md px-4 py-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterPage