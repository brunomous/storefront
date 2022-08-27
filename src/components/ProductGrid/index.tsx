import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface Props {
  children: ReactNode
}

function ProductGrid({ children }: Props): JSX.Element {
  return (
    <div className={styles.grid}>
      {children}
    </div>
  )
}

export default ProductGrid
