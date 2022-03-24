import { Box, Container, Typography } from '@kukui/ui';
import styled from '@emotion/styled';
import Button from '@components/common/Button';

const ShopNowButton = styled(Button)({
  color: '#333',
  backgroundColor: 'transparent',
  border: '1px solid #333',
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
              <img
                src="https://klbtheme.com/cosmetsy/wp-content/uploads/2021/02/image-text.jpg"
                style={{ width: '100%', height: 'auto' }}
              />
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
                <ShopNowButton>Shop Now</ShopNowButton>
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
              >
                No science experiments. Just great skincare. Touch your beauty
              </Title>
              <Description>
                A simplified ritual of powerful antioxidants and naturally
                restorative elements, for a modern and healthy approach to skin.
                Advanced, transformative organic formulations that revitalize
                and regenerate below the surface for immediate results.
              </Description>
              <ShopNowButton>Shop Now</ShopNowButton>
            </Box>
            <Box
              sx={{
                gridColumn: 'span 7/span 7',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ padding: '0 35x', marginTop: '90px' }}>
                <img src="https://klbtheme.com/cosmetsy/wp-content/uploads/2021/02/image-text2.jpg" />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ImageText;
