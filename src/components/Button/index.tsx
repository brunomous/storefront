import { ReactNode, ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
}

function Button({ children, ...buttonProps }: Props): JSX.Element {
  return (
    <button className={styles.button} {...buttonProps}>
      {children}
    </button>
  )
}

export default Button
