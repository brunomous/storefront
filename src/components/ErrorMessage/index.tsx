import type { ReactNode } from 'react'

import styles from './styles.module.scss'

interface Props {
  children: ReactNode
}

function ErrorMessage({ children }: Props): JSX.Element {
  return (
    <div className={styles.message}>
      {children}
    </div>
  )
}

export default ErrorMessage
