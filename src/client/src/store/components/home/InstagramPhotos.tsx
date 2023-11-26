import { Box, Typography } from '@kukui/ui';
import styled from '@emotion/styled';
import { Instagram } from '@kukui/icons';
import img1 from '@store/assets/images/instagram/1.jpeg';
import img2 from '@store/assets/images/instagram/2.jpeg';
import img3 from '@store/assets/images/instagram/3.jpeg';
import img4 from '@store/assets/images/instagram/4.jpeg';
import img5 from '@store/assets/images/instagram/5.jpeg';
import img6 from '@store/assets/images/instagram/6.jpeg';
import img7 from '@store/assets/images/instagram/7.jpeg';
import img8 from '@store/assets/images/instagram/8.jpeg';
import img9 from '@store/assets/images/instagram/9.jpeg';
import img10 from '@store/assets/images/instagram/10.jpeg';

const photos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const PhotoWrapper = styled(Box)({
  width: '20%',
  float: 'left',
  position: 'relative',

  '&:before': {
    content: '""',
    display: 'block',
    marginTop: '125%',
  },

  a: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: '125%',

    '.photo-overlay': {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'rgba(0,0,0,.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: 'opacity .32s ease',
      zIndex: 1,
    },

    '&:hover': {
      '.photo-overlay': {
        opacity: 1,
      },
    },
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'inline-block',
    objectFit: 'cover',
  },
});
const InstagramPhotos = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {photos.map(photo => (
          <PhotoWrapper key={photo.src}>
            <a href="#">
              <img src={photo.src} />
              <div className="photo-overlay">
                <Instagram sx={{ color: '#fff' }} />
              </div>
            </a>
          </PhotoWrapper>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4.3% 7.4% 4%',
          backgroundColor: '#fff',
          zIndex: '5',
        }}
      >
        <Instagram />
        <Typography
          variant="h2"
          sx={{
            fontSize: '20px',
            fontWeight: 300,
            marginTop: '18px',
            marginBottom: '4px',
            lineHeight: '1.1',
          }}
        >
          Follow Us on Instagram
        </Typography>
        <a href="https://www.instagram.com/amortentia.albania/" target="_blank">
          <Typography
            variant="h2"
            sx={{
              lineHeight: '1.1',
              color: 'var(--text-primary)',
              fontSize: '32px',
            }}
          >
            amortentia.albania
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default InstagramPhotos;
