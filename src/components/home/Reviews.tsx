import styled from '@emotion/styled';
import { Box, Typography } from '@kukui/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

const Section = styled(Box)({
  padding: '100px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
});
const SectionImage = styled(Box)({
  backgroundColor: '#906c56',
  backgroundImage:
    'url(https://klbtheme.com/cosmetsy/wp-content/uploads/2021/02/index-01.jpg)',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
});
const SectionInfo = styled(Box)`
  margin: 16px 0px -16px 0px;
  padding: 110px 110px 40px 110px;
  background-color: #fff9f8;
`;
const TestimonialText = styled(Typography)({
  fontSize: '14px',
  color: '#6d6867',
  fontWeight: 300,
});
const TestimonialAuthor = styled(Typography)({
  marginTop: '25px',
  fontSize: '14px',
  color: '#dea724',
});
const TestimonialSwiper = styled(Box)({
  maxWidth: '460px',
  marginTop: '40px',
  cursor: 'pointer',
  '.swiper': {
    paddingBottom: '40px',
  },
  '.swiper-pagination-bullets.swiper-pagination-horizontal': {
    bottom: '0',
    textAlign: 'left',
  },
  '.swiper-pagination-bullet': {
    margin: '5px',
    width: '8px',
    height: '8px',
    opacity: '0.7',
    padding: 0,
    backgroundColor: '#edba94',
    borderRadius: '50px',
    '&.swiper-pagination-bullet-active': {
      width: '25px',
      opacity: '1',
    },
  },
  '.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet': {
    margin: '0 2.5px',
  },
});

const Reviews = () => {
  return (
    <Section>
      <SectionImage />
      <SectionInfo>
        <Typography
          variant="h2"
          sx={{
            fontSize: '17px',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '10px',
            color: '#dea724',
            fontWeight: 500,
          }}
        >
          Our Customers
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: '28px',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '5px',
          }}
        >
          Reviews
        </Typography>

        <TestimonialSwiper>
          <Swiper
            slidesPerView={1}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <TestimonialText>
                Style too own civil out along. Perfectly offending attempted add
                arranging age gentleman concluded. Get who uncommonly our
                expression ten increasing.
              </TestimonialText>
              <TestimonialAuthor>Maria Culhane</TestimonialAuthor>
            </SwiperSlide>
            <SwiperSlide>
              <TestimonialText>
                Style too own civil out along. Perfectly offending attempted add
                arranging age gentleman concluded. Get who uncommonly our
                expression ten increasing.
              </TestimonialText>
              <TestimonialAuthor>Maria Culhane</TestimonialAuthor>
            </SwiperSlide>
          </Swiper>
        </TestimonialSwiper>
      </SectionInfo>
    </Section>
  );
};

export default Reviews;
