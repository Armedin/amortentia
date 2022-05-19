import { Box, Typography, Container } from '@kukui/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '@components/product/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';

const products = [
  {
    name: 'Essential Paper Bag',
    price: '€25.99',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-41.jpg',
  },
  {
    name: 'Baby Bum Shampoo & Wash',
    price: '€31.99',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-42.jpg',
  },
  {
    name: "Nature's Friend Lotion",
    price: '€12.99',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-40.jpg',
  },
  {
    name: 'Makeup Cleansing Cream',
    price: '€22.99',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-43.jpg',
  },
];

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
