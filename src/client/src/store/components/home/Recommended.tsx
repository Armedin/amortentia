import { Box, Typography, Container } from '@kukui/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '@store/components/product/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Product } from '@admin/interfaces/product';
import { productService } from '@admin/services';
import Button from '../common/Button';
import { useRouter } from 'next/router';

const Recommended = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getAllProducts().then(res => {
      if (Array.isArray(res)) {
        setProducts(res);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        padding: '100px 0',
        '@media(max-width:800px)': {
          padding: '60px 0',
        },
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#909090',
            textAlign: 'center',
          }}
        >
          Our Products
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: '36px',
            paddingBottom: '48px',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Explore all the Products
        </Typography>

        <Box sx={{ marginBottom: '36px' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '28px',
              '@media(max-width:800px)': {
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              },
            }}
          >
            {products.map(product => (
              <ProductItem key={product.title} product={product} />
            ))}
          </Box>
        </Box>
        {/* <Box sx={{ textAlign: 'center' }}>
          <Button onClick={() => router.push('/shop')}>Explore All</Button>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Recommended;
