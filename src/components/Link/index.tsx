import type { ReactNode } from 'react'

import { Link as RouterLink, LinkProps } from 'react-router-dom'

import styles from './styles.module.scss'

interface Props extends LinkProps {
  children: ReactNode
  variant?: 'fill' | 'outline' | 'transparent'
}

function Link({ children, ...linkProps }: Props): JSX.Element {
  return (
    <RouterLink className={styles.link} {...linkProps}>
      {children}
    </RouterLink>
  )
}

export default Link
