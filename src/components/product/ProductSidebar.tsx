import Button from '@components/common/Button';
import styled from '@emotion/styled';
import {
  BoxTaped,
  Facebook,
  Heart,
  Instagram,
  TruckFast,
  Twitter,
} from '@kukui/icons';
import { Box, IconButton, Typography } from '@kukui/ui';

const SocialIcon = styled(Box)({
  marginRight: '10px',
});
const ShippingItem = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  svg: {
    marginRight: '12px',
    width: '26px',
    height: '26px',
  },
  '.title': {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    fontSize: '.95rem',
  },
  '.desc': {
    fontSize: '.875rem',
  },
});

const Extra = () => {
  return (
    <Box
      sx={{
        marginTop: '2rem',
        padding: '1.25rem 0',
        fontSize: '13.5px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '1rem' }}>
        <Typography sx={{ color: '#5c5c5c', marginRight: '6px' }}>
          SKU:
        </Typography>
        <Typography>77626212</Typography>
      </Box>
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '1rem' }}>
        <Typography sx={{ color: '#5c5c5c', marginRight: '6px' }}>
          Tags:
        </Typography>
        <Typography>Makeup, Personal Care</Typography>
      </Box>
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '1rem' }}>
        <Typography sx={{ color: '#5c5c5c', marginRight: '6px' }}>
          Share:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon>
            <Facebook fontSize="inherit" />
          </SocialIcon>
          <SocialIcon>
            <Instagram fontSize="inherit" />
          </SocialIcon>
          <SocialIcon>
            <Twitter fontSize="inherit" />
          </SocialIcon>
        </Box>
      </Box>
    </Box>
  );
};

const ProductSidebar = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 400,
            fontSize: '2rem',
            lineHeight: 1.25,
            paddingRight: '20px',
          }}
        >
          Makeup Cleansing Cream
        </Typography>
        <IconButton>
          <Heart />
        </IconButton>
      </Box>
      <Typography
        sx={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '10px' }}
      >
        31.990 ALL
      </Typography>

      <Box sx={{ margin: '30px 0', color: '#555' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut
      </Box>

      <Button fullWidth color="primary">
        Add To Cart - 31.990 ALL
      </Button>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '.875rem',
          flexFlow: 'column nowrap',
          margin: '24px 0 36px',
        }}
      >
        <Box
          sx={{
            lineHeight: '1.8',
            flexFlow: 'row wrap',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ flex: '1 1 auto', whiteSpace: 'nowrap', textAlign: 'center' }}
          >
            <Typography>
              Ship anywhere to{' '}
              <Typography sx={{ textDecoration: 'underline' }} component="span">
                Albania
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '1 1 auto',
              textAlign: 'center',
              display: 'flow-root',
              paddingLeft: '4px',
            }}
          >
            <Typography>| Within Apr 1 - Apr 8</Typography>
          </Box>
        </Box>
        <Box>In Stock, Ships from Shkoder</Box>
      </Box>

      <Box sx={{ margin: '36px 0', display: 'flex' }}>
        <ShippingItem>
          <TruckFast />
          <Box>
            <Box className="title">Flat Rate Shipping*</Box>
            <Box className="desc">Delivery as low as $39</Box>
          </Box>
        </ShippingItem>
        <ShippingItem sx={{ borderLeft: '1px solid #d8d8d8' }}>
          <BoxTaped />
          <Box>
            <Box className="title">14-Day Returns*</Box>
            <Box className="desc">Shop risk-free</Box>
          </Box>
        </ShippingItem>
      </Box>

      <Extra />
    </Box>
  );
};

export default ProductSidebar;
