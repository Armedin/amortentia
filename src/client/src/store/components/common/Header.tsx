import styled from '@emotion/styled';
import { Box, Container, IconButton } from '@kukui/ui';
import Link from 'next/link';
import { MagnifyingGlass, CartShopping, User } from '@kukui/icons';
import { useCart } from '@store/context/CartContext';
import { useRouter } from 'next/router';
import logo from '@store/assets/images/logo.jpg';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Who We Are',
    href: '/about-us',
  },
];

const StyledHeader = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: '90px',
  borderBottom: '1px solid #e9ecef',
  background: '#fff',
  zIndex: 90,
});
const Logo = styled('div')({
  height: '76px',
  cursor: 'pointer',
  '@media(max-width:350px)': {
    height: '58px',
  },
  img: {
    height: '100%',
  },
});
const ListItem = styled('li')({
  textAlign: 'left',
  margin: '0 21px',
  fontSize: '12px',
  '@media(max-width:480px)': {
    margin: '0 10px',
    fontSize: 10,
  },
});
const StyledLink = styled('a')({
  fontWeight: 600,
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
  '.KukuiSvgIcon': {
    fontSize: '18px',
  },
});

const Header = () => {
  const { updateOpenState } = useCart();
  const router = useRouter();

  return (
    <StyledHeader>
      <Container>
        <Wrapper>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Logo onClick={() => router.push('/')}>
              <img src={logo.src} />
            </Logo>
          </Box>
          <Box
            component="ul"
            sx={{
              display: 'flex',
              marginLeft: '54px',
              // '@media(max-width:800px)': { display: 'none' },
              '@media(max-width:480px)': {
                marginLeft: 0,
              },
            }}
          >
            {links.map(link => (
              <ListItem key={link.title}>
                <Link href={link.href} passHref>
                  <StyledLink>{link.title}</StyledLink>
                </Link>
              </ListItem>
            ))}
          </Box>
          <ActionButtons>
            <IconButton onClick={() => router.push('/')}>
              <MagnifyingGlass />
            </IconButton>
            {/* <IconButton>
              <User />
            </IconButton> */}
            <IconButton onClick={() => updateOpenState(true)}>
              <CartShopping />
            </IconButton>
          </ActionButtons>
        </Wrapper>
      </Container>
    </StyledHeader>
  );
};

export default Header;
