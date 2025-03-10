import React from 'react'
import { motion } from 'motion/react'
import { ApiErrorResponse } from '@/types/response.type'

const AuthFieldErrorMessage = (
  { err }: {
    err: ApiErrorResponse
  }
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

  return (
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
    </motion.div>)
}

export default AuthFieldErrorMessage