import { Box, Container, Typography } from '@kukui/ui';
import styled from '@emotion/styled';
import Button from '@store/components/common/Button';
import { useEffect, useRef } from 'react';
import { ImageAppearFromTop } from '@store/components/animations';
import { useRouter } from 'next/router';
import photo1 from '@store/assets/images/landing-photo-1.jpeg';
import photo2 from '@store/assets/images/landing-photo-2.jpeg';

const ShopNowButton = styled(Button)({
  color: '#222',
  backgroundColor: 'transparent',
  border: '1px solid #222',

  '&:hover': {
    color: '#fff',
    backgroundColor: '#222',
  },
});

const Title = styled(Typography)({
  fontSize: '50px',
  fontWeight: '300',
  color: '#000',
  lineHeight: '1.2',
});
const Description = styled(Typography)({
  lineHeight: '1.75',
  margin: '60px 0',
});

const ImageText = () => {
  const titleRef = useRef<HTMLElement>(null);
  const title2Ref = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function animate() {
      const sr = (await import('scrollreveal')).default;
      sr().reveal(titleRef.current, {
        origin: 'right',
        distance: '60px',
        duration: 2500,
        delay: 250,
      });
      sr().reveal(title2Ref.current, {
        origin: 'left',
        distance: '60px',
        duration: 2500,
        delay: 250,
      });

      return () => {
        sr().destroy();
      };
    }
    animate();
  }, []);

  return (
    <>
      <Box sx={{ padding: '80px 0' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0,1fr))',
              gap: '15px',
            }}
          >
            <Box sx={{ gridColumn: 'span 7/span 7' }}>
              <ImageAppearFromTop>
                <img
                  src={photo1.src}
                  style={{ width: '100%', height: 'auto' }}
                />
              </ImageAppearFromTop>
            </Box>
            <Box
              sx={{
                gridColumn: 'span 5/span 5',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ paddingLeft: '100px' }}>
                <Title
                  sx={{
                    marginLeft: '-220px',
                  }}
                  variant="h2"
                  ref={titleRef}
                >
                  Open your mind to the possibility of you. For skin that looks
                  professional
                </Title>
                <Description>
                  A simplified ritual of powerful antioxidants and naturally
                  restorative elements, for a modern and healthy approach to
                  skin. Advanced, transformative organic formulations that
                  revitalize and regenerate below the surface for immediate
                  results.
                </Description>
                <ShopNowButton onClick={() => router.push('/shop')}>
                  Shop Now
                </ShopNowButton>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ padding: '80px 0' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0,1fr))',
              gap: '55px',
            }}
          >
            <Box sx={{ gridColumn: 'span 3/span 7', zIndex: 1 }}>
              <Title
                sx={{
                  marginRight: '-300px',
                }}
                variant="h2"
                ref={title2Ref}
              >
                No science experiments. Just great skincare. Touch your beauty
              </Title>
              <Description>
                A simplified ritual of powerful antioxidants and naturally
                restorative elements, for a modern and healthy approach to skin.
                Advanced, transformative organic formulations that revitalize
                and regenerate below the surface for immediate results.
              </Description>
              <ShopNowButton onClick={() => router.push('/shop')}>
                Shop Now
              </ShopNowButton>
            </Box>
            <Box
              sx={{
                gridColumn: 'span 7/span 7',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ padding: '0 35x', marginTop: '90px' }}>
                <ImageAppearFromTop>
                  <img src={photo2.src} />
                </ImageAppearFromTop>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ImageText;
