import Button from '@components/common/Button';
import { Box, Typography, Container } from '@kukui/ui';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const ViewMoreButton = styled(Button)({
  color: '#222',
  backgroundColor: 'transparent',
  border: '1px solid #222',

  '&:hover': {
    color: '#fff',
    backgroundColor: '#222',
  },
});
const Catalog = () => {
  const imgRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function animate() {
      const sr = (await import('scrollreveal')).default;

      sr().reveal(imgRef.current, {
        origin: 'left',
        distance: '60px',
        duration: 2500,
        delay: 250,
      });

      sr().reveal(infoRef.current, {
        origin: 'right',
        distance: '60px',
        duration: 2500,
        delay: 250,
      });
    }
    animate();
  }, []);

  return (
    <Box sx={{ padding: '60px 0', backgroundColor: '#eae9de' }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
            gap: '80px',
          }}
        >
          <Box ref={imgRef}>
            <img
              src="https://www.just.it/wp-content/uploads/2021/12/Catalogo-Just_ITA.png"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>

          <Box sx={{ marginTop: '80px' }} ref={infoRef}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '45px',
                fontWeight: 400,
                lineHeight: '1.1',
                marginBottom: '1.5rem',
              }}
            >
              Neque porro quisquam est qui dolorem
            </Typography>
            <Typography sx={{ color: '#000', marginBottom: '36px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>

            <ViewMoreButton>Browse Catalog</ViewMoreButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Catalog;
