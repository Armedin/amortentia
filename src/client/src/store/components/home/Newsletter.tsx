import { Box, Container, Typography } from '@kukui/ui';
import Input from '@store/components/common/Input';

const Newsletter = () => {
  return (
    <Box sx={{ padding: '95px 0' }}>
      <Container>
        <Typography
          variant="h2"
          sx={{
            fontSize: '36px',
            fontWeight: '300',
            textAlign: 'center',
            color: '#000',
            lineHeight: '1.2',
          }}
        >
          Always be updated on what's going on!
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            margin: '6px 0 34px',
          }}
        >
          Sign up for our newsletter to receive the latest news from Amortentia
        </Typography>
        <Box sx={{ maxWidth: '560px', margin: '0 auto' }}>
          {/* <Input /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
