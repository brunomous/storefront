import type { Product } from '../../types/Product'
import { MouseEvent } from 'react'

import { formatCurrency } from '../../utils/currency'

import Button from '../Button'

import styles from './styles.module.scss'

interface Props extends Product {
  isItemOnCart: boolean
  handleButtonClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function ProductDetails({
  image,
  title,
  category,
  description,
  price,
  isItemOnCart,
  handleButtonClick,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.info}>
        <p>{category}</p>
        <p>{description}</p>
        <h3>{formatCurrency(price)}</h3>
        <Button onClick={handleButtonClick}>
          {isItemOnCart ? 'remove from cart' : 'add to cart'}
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails
