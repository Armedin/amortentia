import { Box, Typography } from '@kukui/ui';
import shopHeader from '@store/assets/images/shop-header.webp';

const HeroHeader = () => {
  return (
    <Box
      sx={{
        position: 'relative',

        img: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          objectFit: 'cover',
          zIndex: -1,
        },
      }}
    >
      <img src={shopHeader.src} />
      <Box
        sx={{
          padding: '5% 0',

          '*': {
            color: '#fff',
            position: 'relative',
          },

          '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: '30px',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
        >
          About Us
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 16,
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          A journey through Amortentia's story
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroHeader;
