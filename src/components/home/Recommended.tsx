import { Box, Typography, Container } from '@kukui/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '@components/product/ProductItem';
import 'swiper/css';
import 'swiper/css/pagination';

const products = [
  {
    name: 'Essential Paper Bag',
    price: '25.990 ALL',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-41.jpg',
  },
  {
    name: 'Baby Bum Shampoo & Wash',
    price: '31.990 ALL',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-42.jpg',
  },
  {
    name: "Nature's Friend Lotion",
    price: '12.990 ALL',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-40.jpg',
  },
  {
    name: 'Makeup Cleansing Cream',
    price: '22.990 ALL',
    imageUrl:
      'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-43.jpg',
  },
];
const Recommended = () => {
  return (
    <Box sx={{ padding: '100px 0' }}>
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
          Top Products
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: '36px', paddingBottom: '48px', textAlign: 'center' }}
        >
          Recommended For You
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

export default Recommended;
