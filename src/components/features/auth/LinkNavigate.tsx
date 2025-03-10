import { Link } from 'react-router-dom'

const LinkNavigate = (
  { to, text }: { to: string, text: string }
) => {
  return (
    <Link to={to}
      className='self-end text-muted-foreground hover:text-accent transition-colors duration-300 font-medium text-sm'
    >
      {text}
    </Link>)
}

export default LinkNavigate