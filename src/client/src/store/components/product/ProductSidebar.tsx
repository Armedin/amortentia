import Button from '@store/components/common/Button';
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
import { useCart } from '@store/context/CartContext';
import { Product } from '@store/interfaces/product.interface';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import sanitizeHtml from 'sanitize-html';

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

const product = {
  id: '52bde63d-0c29-4725-8123-cbc100a929ad',
  title: 'fwe',
  description: 'fwe',
  thumbnail: '5eebc6604d3e738961361b8bfcffc211.jpeg',
  price: '12312300.00',
  images: [
    '5eebc6604d3e738961361b8bfcffc211.jpeg',
    'ec9a6c21a7a56cee2f161f2cd1ee81b5.jpeg',
    'de90e64e9e3bb9175b8b1683a746806f.jpeg',
  ],
  properties: [],
  created_at: '2022-06-29T20:20:17.421Z',
  updated_at: '2022-06-29T22:17:22.000Z',
  category_id: 'c207f919-4b4b-436f-9a29-31ed55158b4b',
};

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
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '0.5rem' }}>
        <Typography sx={{ color: '#5c5c5c', marginRight: '6px' }}>
          SKU:
        </Typography>
        <Typography>77626212</Typography>
      </Box>
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '0.5rem' }}>
        <Typography sx={{ color: '#5c5c5c', marginRight: '6px' }}>
          Tags:
        </Typography>
        <Typography>Makeup, Personal Care</Typography>
      </Box>
      <Box sx={{ display: 'flex', fontWeight: 600, marginBottom: '0.5rem' }}>
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

const ProductSidebar = ({ product }: { product: Product }) => {
  const { addItemToCart, updateOpenState } = useCart();

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
          {product.title}
        </Typography>
        <IconButton>
          <Heart />
        </IconButton>
      </Box>
      <Typography
        sx={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '10px' }}
      >
        {formatAmountWithSymbol({
          amount: product.price,
          currency: 'EUR',
        })}
      </Typography>

      <Box sx={{ margin: '30px 0', color: '#555' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(product.description),
          }}
        />
      </Box>

      <Button
        fullWidth
        color="primary"
        disabled={!product.in_stock}
        onClick={() => {
          addItemToCart(product.id);
          updateOpenState(true);
        }}
      >
        Add To Cart -{' '}
        {formatAmountWithSymbol({
          amount: product.price,
          currency: 'EUR',
        })}
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
            <Typography>Ship within 10-15 days in all Europe</Typography>
          </Box>
        </Box>
        {product.in_stock ? (
          <Box>In Stock, Ships from Albania</Box>
        ) : (
          <Box sx={{ color: 'var(--kukui-red)' }}>Out of Stock</Box>
        )}
      </Box>

      <Box sx={{ margin: '36px 0', display: 'flex' }}>
        <ShippingItem>
          <TruckFast />
          <Box>
            <Box className="title">Flat Rate Shipping*</Box>
            <Box className="desc">
              Inside Albania = 3€.
              <br />
              Inside Europe = 9€.
              <br />
              Inside USA = 18€.
            </Box>
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
