import { Box, Typography } from '@kukui/ui';
import heroImg from '@store/assets/images/home-hero.jpg';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '69vh',
        backgroundImage: `url(${heroImg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        '@media(max-width:800px)': { height: '50vh' },
        '@media(max-width:480px)': {
          backgroundPosition: 'center',
        },
        img: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 60,
          bottom: 80,
          '@media(max-width:480px)': {
            right: 20,
            bottom: 20,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#7f8898',
            textAlign: 'right',
          }}
        >
          Amortentia Albania
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: '39px',
            textAlign: 'right',
            color: '#121f38',
            '@media(max-width:480px)': {
              fontSize: 30,
            },
          }}
        >
          Natural tradition and wisdom
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
