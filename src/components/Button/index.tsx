import type { ReactNode, ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
  variant?: 'fill' | 'outline' | 'transparent'
}

function Button({ children, variant, ...buttonProps }: Props): JSX.Element {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles.outline]: variant === 'outline',
        [styles.transparent]: variant === 'transparent',
      })}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button
