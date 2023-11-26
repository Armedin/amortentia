import { Box, Container, Typography } from '@kukui/ui';
import tick from '@store/assets/images/tick.png';
import Button from '@store/components/common/Button';
import { useRouter } from 'next/router';

const OrderConfirmed = () => {
  const router = useRouter();

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '36px 0',
          }}
        >
          <Box sx={{ marginBottom: 10, maxWidth: '80px' }}>
            <img src={tick.src} />
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          >
            Your order was successfully placed
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 800,
              marginTop: 14,
              marginBottom: 22,
            }}
          >
            #{router.query.id}
          </Typography>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderConfirmed;
