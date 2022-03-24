import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@kukui/ui';
import styled from '@emotion/styled';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-41.jpg',
  'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-42.jpg',
  'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-40.jpg',
  'https://wpbingosite.com/wordpress/covan/wp-content/uploads/2020/04/Image-43.jpg',
];

const ImageWrapper = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '100%',

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

const ProductView = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: '1rem',
        flex: '1 1 auto',
        ['.swiper']: {
          width: '100%',
          height: '100%',
        },
        marginRight: '50px',
        minWidth: 0,
      }}
    >
      <Swiper slidesPerView={1} spaceBetween={0} loop>
        {images.map(image => (
          <SwiperSlide key={image}>
            <ImageWrapper>
              <img src={image} />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductView;
