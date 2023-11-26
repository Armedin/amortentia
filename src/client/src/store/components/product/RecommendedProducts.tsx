import { Box, Typography, Container } from '@kukui/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '@store/components/product/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';

const products = [];

const RecommendedProducts = () => {
  return (
    <Box sx={{ padding: '120px 0' }}>
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2.5rem',
            paddingBottom: '48px',
            textAlign: 'center',
            fontWeight: 400,
          }}
        >
          You May Also Like
        </Typography>

        <Box>
          <Swiper slidesPerView={4} spaceBetween={20}>
            {products.map(product => (
              <SwiperSlide key={product.name}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default RecommendedProducts;
