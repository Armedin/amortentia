import Button from '@components/common/Button';
import styled from '@emotion/styled';
import { Box, Typography } from '@kukui/ui';

const Content = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '450px',
});

const Welcome = () => {
  return (
    <Box
      sx={{ backgroundColor: '#f6f6f6', height: '48vh', position: 'relative' }}
    >
      <Content>
        <Typography
          variant="h5"
          sx={{
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            fontSize: '12px',
            letterSpacing: '2px',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Welcome to
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: '#333',
            fontSize: '63px',
            marginBottom: '.75rem',
            textAlign: 'center',
            lineHeight: 1.2,
            fontFamily: 'Poppins',
          }}
        >
          Amortentia
        </Typography>
        <Typography sx={{ color: '#666', textAlign: 'center' }}>
          Our products are 100% homemade authentic. We strive to provide you
          with the best products in the market.
        </Typography>
        <Box sx={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Button disabled>Explore Products</Button>
        </Box>
      </Content>
    </Box>
  );
};

export default Welcome;
