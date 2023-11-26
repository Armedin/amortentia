import { Box, Typography } from '@kukui/ui';
import { useCart } from '@store/context/CartContext';
import { CardElement } from '@stripe/react-stripe-js';
import PaymentButton from '../PaymentButton';

import PaymentWrapper from '../PaymentWrapper';

const Payment = () => {
  const { cart } = useCart();
  return (
    <PaymentWrapper>
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

        <CardElement
          className="card"
          options={{
            style: {
              base: {
                fontFamily: 'Poppins, sans-serif',
                color: '#1e293b',
                '::placeholder': {
                  color: '#a5afbd',
                },
              },
              invalid: {
                color: '#fa5252',
              },
            },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            paddingTop: 20,
          }}
        >
          <PaymentButton />
        </Box>
      </Box>
    </PaymentWrapper>
  );
};

export default Payment;
