import type { InputHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

import styles from './styles.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  leftContent?: ReactNode
  rightContent?: ReactNode
  hasTopMargin?: boolean
  hasBottomMargin?: boolean
}

function Input({
  leftContent,
  rightContent,
  hasTopMargin,
  hasBottomMargin,
  ...inputProps
}: Props): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.marginTop]: hasTopMargin,
        [styles.marginBottom]: hasBottomMargin,
      })}
    >
      {leftContent}
      <input className={styles.input} {...inputProps}/>
      {rightContent}
    </div>
  )
}

export default Input
