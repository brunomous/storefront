import { Product as ProductType } from '../../types/Product'

import Button from '../Button'

import styles from './styles.module.scss'

function ProductDetails({
  image,
  title,
  category,
  description,
  price,
}: ProductType): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <div>
        <p>{category}</p>
        <p>{description}</p>
        <p>{price}</p>
        <Button>add to cart</Button>
      </div>
    </div>
  )
}

export default ProductDetails
