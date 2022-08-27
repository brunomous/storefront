import type { Product as ProductType } from '../../types/Product'
import { MouseEvent } from 'react'

import Button from '../Button'

import styles from './styles.module.scss'

interface Props extends ProductType {
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
      <img src={image} alt={title} />
      <div>
        <p>{category}</p>
        <p>{description}</p>
        <p>{price}</p>
        <Button onClick={handleButtonClick}>
          {isItemOnCart ? 'remove from cart' : 'add to cart'}
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails
