import { Product as ProductType } from '../../types/Product'
import { Link } from 'react-router-dom'

import Button from '../Button'

import styles from './styles.module.scss'

function ProductCard({
  id,
  title,
  category,
  price,
  image,
}: ProductType): JSX.Element {
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
      <Button>add to card</Button>
  </div>
  )
}

export default ProductCard
