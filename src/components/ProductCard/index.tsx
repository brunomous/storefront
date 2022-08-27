import type { Product as ProductType } from '../../types/Product'
import type { MouseEvent } from 'react'

import { Link } from 'react-router-dom'

import Button from '../Button'

import styles from './styles.module.scss'

interface Props extends ProductType {
  isItemOnCart: boolean
  handleButtonClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function ProductCard({
  id,
  title,
  category,
  price,
  image,
  isItemOnCart,
  handleButtonClick,
}: Props): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.info}>
        <p className={styles.category}>{category}</p>
        <Link className={styles.title} to={`/product/${id}`}>
          {title}
        </Link>
        <p className={styles.price}>{price}</p>
      </div>
      <Button onClick={handleButtonClick}>
        {isItemOnCart ? 'remove from cart' : 'add to cart'}
      </Button>
  </div>
  )
}

export default ProductCard
