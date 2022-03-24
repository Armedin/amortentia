import styled from '@emotion/styled';
import { Box } from '@kukui/ui';
import Link from 'next/link';

const StyledHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '25px 60px',
  borderBottom: '1px solid #e9ecef',
});
const ListItem = styled('li')({
  textAlign: 'left',
  margin: '0 21px',
});
const StyledLink = styled('a')({
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  position: 'relative',
  transition: 'all 0.2s ease',
});

const Header = () => {
  return (
    <StyledHeader>
      <div></div>
      <Box component="ul" sx={{ display: 'flex' }}>
        <ListItem>
          <Link href="/" passHref>
            <StyledLink href="/">Home</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/" passHref>
            <StyledLink href="/">Wellness</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/" passHref>
            <StyledLink href="/">Personal Care</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/" passHref>
            <StyledLink href="/">Beauty</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/" passHref>
            <StyledLink href="/">Home Care</StyledLink>
          </Link>
        </ListItem>
      </Box>
    </StyledHeader>
  );
};

export default Header;
