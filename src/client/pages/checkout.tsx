import { formatAmountWithSymbol } from '@admin/utils/prices';
import { Box, Container, TabContext, TabPanel, Typography } from '@kukui/ui';
import CheckoutItem from '@store/components/checkout/CheckoutItem';
import { useCart } from '@store/context/CartContext';
import { useState } from 'react';
import ShippingDetails from '@store/components/checkout/steps/ShippingDetails';
import Payment from '@store/components/checkout/steps/Payment';

const CheckoutPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { cart, subtotal, total, shippingTotal } = useCart();

  if (!cart.id) {
    return null;
  }

  return (
    <Box>
      <TabContext value={tabValue}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              '@media(max-width:800px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Box
              sx={{
                padding: '56px 0',
                width: '54%',
                maxWidth: '500px',
                '@media(max-width:800px)': {
                  width: '100%',
                  padding: '24px 0',
                  order: 2,
                },
              }}
            >
              <Box
                sx={{
                  paddingRight: '6%',
                  '@media(max-width:800px)': {
                    paddingRight: 0,
                    order: 1,
                  },
                }}
              >
                <TabPanel value={0}>
                  <ShippingDetails onNext={() => setTabValue(1)} />
                </TabPanel>
                <TabPanel value={1}>
                  <Payment />
                </TabPanel>
              </Box>
            </Box>
            <Box
              sx={{
                width: '46%',
                paddingTop: '56px',
                '&:before': {
                  content: '""',
                  display: 'block',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 'auto',
                  zIndex: -1,
                  background: '#efefef',

                  '@media(max-width:800px)': {
                    content: 'none',
                  },
                },

                '@media(max-width:800px)': {
                  width: '100%',
                },
              }}
            >
              <Box
                sx={{
                  paddingLeft: '4%',
                  '@media(max-width:800px)': { paddingLeft: 0 },
                }}
              >
                {cart.items?.map(item => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
                <Box
                  sx={{
                    padding: '22px 0',
                    borderTop: '1px solid #d8d7d8',
                    borderBottom: '1px solid #d8d7d8',
                    color: '#4f4f4f',
                    fontSize: 14.5,
                    fontWeight: 500,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography sx={{ color: '#303030', fontWeight: 600 }}>
                      {formatAmountWithSymbol({
                        amount: subtotal,
                        currency: 'EUR',
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Shipping</Typography>
                    <Typography sx={{ color: '#303030' }}>
                      {formatAmountWithSymbol({
                        amount: shippingTotal,
                        currency: 'EUR',
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: '24px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#303030',
                    fontWeight: 600,
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography
                    sx={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.75 }}
                  >
                    {formatAmountWithSymbol({
                      amount: total,
                      currency: 'EUR',
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </TabContext>
    </Box>
  );
};

export default CheckoutPage;
