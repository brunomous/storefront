import type { ReactNode } from 'react'

import { Link as RouterLink, LinkProps } from 'react-router-dom'
import classNames from 'classnames'

import styles from './styles.module.scss'

interface Props extends LinkProps {
  children: ReactNode
  variant?: 'fill' | 'outline' | 'transparent'
  underline?: boolean
  bold?: boolean
}

function Link({
  children,
  variant,
  underline,
  bold,
  ...linkProps
}: Props): JSX.Element {
  return (
    <RouterLink
      className={classNames({
        [styles.link]: true,
        [styles.underline]: underline,
        [styles.bold]: bold,
      })}
      {...linkProps}
    >
      {children}
    </RouterLink>
  )
}

export default Link
