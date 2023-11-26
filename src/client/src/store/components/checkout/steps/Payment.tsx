import { Box, Typography } from '@kukui/ui';
import { useCart } from '@store/context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PaymentButton from '../PaymentButton';

import PaymentWrapper from '../PaymentWrapper';

const Payment = () => {
  const { cart } = useCart();
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env.PAYPAL_CLIENT_ID ||
          'AXATcUzB-zQ7nxHclO3Y8DT6RuYqPBkb1lcv-sE7y0lUbPTzBXlwAq7T45yVLkjxySNgZEjDrKh0Ciuk',
        currency: 'EUR',
        intent: 'capture',
      }}
    >
      <Box
        sx={{
          '.StripeElement': {
            background: '#fff',
            padding: '11px 12px',
            borderRadius: '8px',
            border: '1px solid var(--kukui-input-border)',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 4%)',
          },
          '.StripeElement--focus': {
            boxShadow: 'var(--kukui-input-border-focused) 0px 0px 0px 3px',
          },
          '.StripeElement--invalid': {
            borderColor: 'var(--kukui-red)',
          },
        }}
      >
        <Typography variant="h2" sx={{ fontSize: '1.5rem', marginBottom: 24 }}>
          Payment Method
        </Typography>

        <Box
          sx={{
            paddingTop: 20,
          }}
        >
          <PaymentButton />
        </Box>
      </Box>
    </PayPalScriptProvider>
  );
};

export default Payment;
