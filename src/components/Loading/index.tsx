import type { ReactNode } from 'react'

import styles from './styles.module.scss'

interface Props {
  children: ReactNode
}

function Loading({ children }: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default Loading
