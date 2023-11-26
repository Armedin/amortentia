import styled from '@emotion/styled';
import { Box, Container, Typography } from '@kukui/ui';
import { Heart, BookOpen, House } from '@kukui/icons';
import Link from 'next/link';

const StyledTopbar = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: '#4e7661',
  color: '#e8ebf0',
  fontSize: '12px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 300,
  zIndex: 90,
});
const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const TopbarGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '40px',
  marginRight: '28px',
  paddingRight: '28px',
  borderRight: '1px solid hsla(0, 0%, 80%, 0.5)',
  color: '#e8ebf0',

  '&:last-child': {
    marginRight: 0,
  },
});

const Topbar = () => {
  return (
    <StyledTopbar>
      <Container>
        <Wrapper>
          <Typography sx={{ fontWeight: 300, lineHeight: '40px' }}>
            Free Shipping Available!
          </Typography>

          <Box sx={{ textAlign: 'right', display: 'flex' }}>
            <TopbarGroup>
              <House fontSize="inherit" sx={{ marginRight: '6px' }} />
              <Link href="/">Home</Link>
            </TopbarGroup>
            <TopbarGroup>
              <BookOpen fontSize="inherit" sx={{ marginRight: '6px' }} />
              <Link href="/">Browse Catalog</Link>
            </TopbarGroup>
            <TopbarGroup>
              <Heart fontSize="inherit" sx={{ marginRight: '6px' }} />
              <Link href="/about-us">Who We Are</Link>
            </TopbarGroup>
          </Box>
        </Wrapper>
      </Container>
    </StyledTopbar>
  );
};

export default Topbar;
