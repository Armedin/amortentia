import Button from '@components/common/Button';
import styled from '@emotion/styled';
import { Box, Typography } from '@kukui/ui';
import { useEffect, useRef } from 'react';

const Content = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(75%)',
});

const Welcome = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function animate() {
      const sr = (await import('scrollreveal')).default;

      sr().reveal(containerRef.current, {
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 250,
      });
    }
    animate();
  }, []);

  return (
    <Box
      sx={{ backgroundColor: '#f6f6f6', height: '38vh', position: 'relative' }}
    >
      <Content ref={containerRef}>
        <Typography
          variant="h1"
          sx={{
            color: '#222',
            fontSize: '45px',
            marginBottom: '2.5rem',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Natural tradition, method and wisdom
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button disabled>Explore Products</Button>
        </Box>
      </Content>
    </Box>
  );
};

export default Welcome;
