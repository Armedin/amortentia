import { Button } from '@admin/components/base';
import { Box, Input, Card, CardHeader, CardContent } from '@kukui/ui';
import { MagnifyingGlass } from '@kukui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productService } from '@admin/services';
import { Product } from '@admin/interfaces/product';
import ProductTable from '@admin/components/product/table/ProductTable';
import { ADMIN_ROUTES } from '@admin/utils/routes';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getAllProducts().then(res => {
      setProducts(res);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <Box sx={{ width: '250px', padding: '1.25rem 0' }}>
          <Input
            placeholder="Search product"
            prefix={<MagnifyingGlass fontSize="sm" />}
          />
        </Box>
        <Button
          color="primary"
          onClick={() => router.push(ADMIN_ROUTES.PRODUCTS_ADD)}
        >
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <ProductTable products={products} />
      </CardContent>
    </Card>
  );
};

export default Products;
