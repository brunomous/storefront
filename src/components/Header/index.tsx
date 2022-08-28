import { ShoppingCart } from 'react-feather'

import { useCartContext } from '../../context/CartContext'

import Link from '../Link'

import styles from './styles.module.scss'

function Header(): JSX.Element {
  const { cartItems } = useCartContext()

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">
          <h1>STOREFRONT</h1>
        </Link>
        <Link to="/cart">
          <ShoppingCart />
          <h3 className={styles.indicator}>{cartItems.length}</h3>
        </Link>
      </div>
    </header>
  )
}

export default Header
