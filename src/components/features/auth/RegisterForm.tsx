import { registerInputs, RegisterState } from '@/state/register.state';
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiErrorResponse } from '@/types/response.type'
import { motion, AnimatePresence } from "motion/react"
import AuthFieldErrorMessage from './AuthFieldErrorMessage';
import LinkNavigate from './LinkNavigate';

interface RegisterFormProps {
  formState: RegisterState;
  showPassword: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  isPending: boolean;
  error: ApiErrorResponse | null;

}
const RegisterForm = (
  { formState, showPassword, handleChange, error, isPending }: RegisterFormProps
) => {


  const errFieldsExist = error?.errors && error?.errors?.length > 0;

  const content = () => (
    <Card className="max-w-xl mx-auto px-4">
      <CardHeader>
        <CardTitle>
          Register
        </CardTitle>
        <CardDescription>
          Please enter your credentials to register
        </CardDescription>
      </CardHeader>
      <CardContent
      >
        <motion.div layout className="space-y-4">
          {registerInputs.map((input) => (
            <div key={input.name} className='space-y-2'>
              <Label htmlFor={input.name}>{input.label}</Label>
              <Input
                type={showPassword[input.name] ? 'text' : input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                value={formState[input.name]}
                onChange={handleChange}
              />
              <AnimatePresence>
                {errFieldsExist && error.errors!.map((err) => (
                  err.field === input.name && (
                    <AuthFieldErrorMessage errMsg={err.message} key={err.field} />
                  )
                ))
                }
              </AnimatePresence>
            </div>
          ))
          }
          <AnimatePresence>
            {errFieldsExist && error.errors!.map((err) => (
              err.field === "body" && (
                <AuthFieldErrorMessage errMsg={err.message} key={err.field} />
              )
            ))
            }
          </AnimatePresence>
          <AnimatePresence>
            {error?.message && (
              <AuthFieldErrorMessage errMsg={error.message} />
            )}
          </AnimatePresence>
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <LinkNavigate
          to='/login'
          text="Already have an account? Login"
        />
        <Button
          type="submit"
          disabled={isPending}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>

  )
  return content()
}

export default RegisterForm