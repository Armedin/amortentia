import { Box, Container, Typography } from '@kukui/ui';
import featureImg1 from '@store/assets/images/feature-1.png';
import featureImg2 from '@store/assets/images/feature-2.png';
import featureImg3 from '@store/assets/images/feature-3.png';

const features = [
  {
    imgSrc: featureImg1.src,
    title: 'When Nature Meets Passion',
    desc: `We transformed our passion for fragrances into a venture that uses only essential oils and vegetable extracts.`,
  },
  {
    imgSrc: featureImg2.src,
    title: 'Excellence in Quality',
    desc: `Natural ingredients and formulas that benefit different skin types based on traditional Galenic way and modern cosmetology.`,
  },
  {
    imgSrc: featureImg3.src,
    title: 'Always 100% Natural',
    desc: `We use the most vital medicinal plants that are cultivated in Albania and manufactured based on Europeans norms. No more synthetic ingredients!`,
  },
];

const WhatMakesUsSpecial = () => {
  return (
    <Box sx={{ paddingBottom: '100px' }}>
      <Container>
        <Typography
          variant="h2"
          sx={{ fontSize: '36px', paddingBottom: '48px', textAlign: 'center' }}
        >
          What Makes Us Special
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            '@media(max-width:800px)': {
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            },
            gap: 24,
          }}
        >
          {features.map((feature, i) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={i}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20,
                  img: { maxWidth: 108 },
                }}
              >
                <img src={feature.imgSrc} />
              </Box>
              <Typography
                sx={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}
              >
                {feature.title}
              </Typography>
              <Typography sx={{ textAlign: 'center' }}>
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhatMakesUsSpecial;
