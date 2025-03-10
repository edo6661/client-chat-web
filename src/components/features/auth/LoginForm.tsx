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

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: 0,
      x: -20,
    }
  }


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
                {error?.errors && error?.errors?.length > 0 && error.errors.map((err) => (
                  err.field === input.name && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={variants}
                      exit="hidden"
                      transition={{
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeInOut'
                      }}
                      key={err.field} className="text-red-500 text-sm">
                      {err.message}
                    </motion.div>
                  )
                ))
                }
              </AnimatePresence>
            </div>
          ))
          }
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