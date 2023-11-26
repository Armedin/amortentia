import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Lazy } from 'swiper';
import { Box } from '@kukui/ui';
import styled from '@emotion/styled';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/lazy';
import Image from 'next/image';
import { Product } from '@store/interfaces/product.interface';
import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';

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

  '&.thumbnail': {
    width: 80,
    height: 80,
    paddingTop: 0,
    margin: '0 auto',
    border: '1px solid transparent',
    padding: '4px',
  },
});
const Thumbnails = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 20,
  width: '100px',
  display: 'flex',
  flexFlow: 'column nowrap',
  overflowY: 'auto',
  justifyContent: 'flex-start',
  zIndex: 2,
  minWidth: 0,

  '.swiper-slide': {
    width: 'auto',
    height: 'auto',
    cursor: 'pointer',

    '&:not(:first-of-type)': {
      marginTop: 6,
    },

    '&.swiper-slide-thumb-active .thumbnail': {
      border: '1px solid #323433',
    },
  },
});
const ProductView = ({ product }: { product: Product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
        paddingLeft: '100px',
        minWidth: 0,
        height: 'fit-content',
        '@media(max-width:800px)': {
          position: 'relative',
        },
      }}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        preloadImages={false}
        lazy={{
          loadPrevNext: true,
        }}
        modules={[FreeMode, Navigation, Thumbs, Lazy]}
        loop
      >
        {product.images.map(image => (
          <SwiperSlide key={image}>
            <ImageWrapper>
              <img src={getUploadImgUrl(image)} />
            </ImageWrapper>
          </SwiperSlide>
        ))}
      </Swiper>

      <Thumbnails>
        <Swiper
          onSwiper={swiper => setThumbsSwiper(swiper)}
          freeMode={true}
          direction="vertical"
          slidesPerView="auto"
          slideToClickedSlide={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {product.images.map(image => (
            <SwiperSlide key={image}>
              <ImageWrapper className="thumbnail">
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#f6f6f6',
                  }}
                >
                  <img src={getUploadImgUrl(image)} />
                </Box>
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Thumbnails>
    </Box>
  );
};

export default ProductView;
