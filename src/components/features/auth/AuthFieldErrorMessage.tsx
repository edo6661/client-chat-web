import { motion } from 'motion/react'

const AuthFieldErrorMessage = (
  { errMsg }: {
    errMsg: string
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
      className="text-red-500 text-sm">
      {errMsg}
    </motion.div>)
}

export default AuthFieldErrorMessage