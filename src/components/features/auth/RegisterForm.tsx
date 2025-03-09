import { registerInputs, RegisterState } from '@/state/register.state';
import React from 'react'
interface LoginFormProps {
  formState: RegisterState;
  showPassword: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword: (name: string) => void;
}
const RegisterForm = (
  { formState, showPassword, handleChange, handleShowPassword }: LoginFormProps
) => {
  return registerInputs.map((input) => (
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
  ))
}

export default RegisterForm