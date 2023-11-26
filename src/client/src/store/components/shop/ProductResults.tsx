import { Product } from '@admin/interfaces/product';
import { productService } from '@admin/services';
import { Box } from '@kukui/ui';
import { useEffect, useState } from 'react';
import ProductItem from '../product/ProductItem';

const ProductResults = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAllProducts().then(res => {
      setProducts(res);
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '28px',
      }}
    >
      {products.map(product => (
        <ProductItem key={product.title} product={product} />
      ))}
    </Box>
  );
};

export default ProductResults;
