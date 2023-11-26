import Button from '@store/components/common/Button';
import { LockKeyhole } from '@kukui/icons';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '@store/context/CartContext';
import { useEffect, useState } from 'react';
import { useCheckout } from '@store/context/CheckoutContext';
import { useSnackbar } from '@kukui/ui';

const PaymentButton = () => {
  const [openSnackbar] = useSnackbar();
  const [disabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { onPaymentComplete } = useCheckout();
  const { cart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement(CardElement);

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [stripe, elements]);

  const handleSubmit = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(cart.payment_session.data.client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.shipping_address.first_name +
              ' ' +
              cart.shipping_address.last_name,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          if (
            error.type === 'card_error' ||
            error.type === 'validation_error'
          ) {
            openSnackbar(error.message);
          } else {
            openSnackbar('An unexpected error occurred.');
          }

          // TODO - Reset the cart completely when an error happens
        }

        if (
          paymentIntent &&
          (paymentIntent.status === 'requires_capture' ||
            paymentIntent.status === 'succeeded')
        ) {
          return onPaymentComplete();
        }

        return;
      });
  };

  return (
    <Button
      type="submit"
      disabled={disabled || submitting}
      onClick={handleSubmit}
      sx={{
        width: '100%',
        borderRadius: '6px !important',
        fontWeight: '600 !important',
        fontSize: '13px !important',
      }}
    >
      {submitting ? (
        'Loading ...'
      ) : (
        <>
          Confirm & place order{' '}
          <LockKeyhole sx={{ marginLeft: 8, fontSize: 13 }} />
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
