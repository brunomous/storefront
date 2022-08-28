import { ReactNode, ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
  variant?: 'fill' | 'outline' | 'transparent'
}

function Button({ children, ...buttonProps }: Props): JSX.Element {
  return (
    <button className={styles.button} {...buttonProps}>
      {children}
    </button>
  )
}

export default Button
