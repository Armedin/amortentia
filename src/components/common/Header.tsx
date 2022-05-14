import styled from '@emotion/styled';
import { Box, Container, IconButton } from '@kukui/ui';
import Link from 'next/link';
import { MagnifyingGlass, CartShopping, User } from '@kukui/icons';

const StyledHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '90px',
  // borderBottom: '1px solid #e9ecef',
  background: '#f6f6f6',
});
const Logo = styled('div')({
  height: '58px',
  img: {
    height: '100%',
  },
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
const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const ActionButtons = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',

  '.KukuiIconButton': {
    '&:not(:last-child)': {
      marginRight: '6px',
    },
  },
});

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Wrapper>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo>
              <img src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/07/logo_mainpng.png" />
            </Logo>
            <Box component="ul" sx={{ display: 'flex', marginLeft: '54px' }}>
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
          </Box>
          <ActionButtons>
            <IconButton size="small">
              <MagnifyingGlass fontSize="inherit" />
            </IconButton>
            <IconButton size="small">
              <User fontSize="inherit" />
            </IconButton>
            <IconButton size="small">
              <CartShopping fontSize="inherit" />
            </IconButton>
          </ActionButtons>
        </Wrapper>
      </Container>
    </StyledHeader>
  );
};

export default Header;
