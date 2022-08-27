import { InputHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement>{}

function Input({ children, ...inputProps }: Props): JSX.Element {
  return (
    <input className={styles.input} {...inputProps}/>
  )
}

export default Input
