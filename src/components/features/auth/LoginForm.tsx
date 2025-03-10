import { loginInputs, LoginState } from '@/state/login.state'
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
import LinkNavigate from './LinkNavigate'
import AuthFieldErrorMessage from './AuthFieldErrorMessage'

interface LoginFormProps {
  formState: LoginState;
  showPassword: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  error: ApiErrorResponse | null;
}
const LoginForm = (
  { formState, showPassword, handleChange, isPending, error }: LoginFormProps

) => {

  const errFieldsExist = error?.errors && error?.errors?.length > 0;



  const content = () => (
    <Card className="max-w-xl mx-auto px-4">
      <CardHeader>
        <CardTitle>
          Login
        </CardTitle>
        <CardDescription>
          Please enter your credentials to login
        </CardDescription>
      </CardHeader>
      <CardContent
      >
        <motion.div layout className="grid w-full items-center gap-4">
          {loginInputs.map((input) => (
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
          to='/register'
          text='Create an account'
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
  return content();

}

export default LoginForm