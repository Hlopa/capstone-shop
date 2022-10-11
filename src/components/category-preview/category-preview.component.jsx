import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

const CategoryPreview = ({title, products}) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='ttile' to={title}>
        {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {
          products.filter((_, index) => index < 3).map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryPreview