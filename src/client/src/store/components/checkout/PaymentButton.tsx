import Button from '@store/components/common/Button';
import { LockKeyhole } from '@kukui/icons';
import { useCart } from '@store/context/CartContext';
import { useEffect, useState } from 'react';
import { useCheckout } from '@store/context/CheckoutContext';
import { useSnackbar } from '@kukui/ui';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { cartService } from '@store/services/cart.service';
import { useRouter } from 'next/router';
import getApiUrl from 'src/shared/utils/getApiUrl';

const PaymentButton = () => {
  const [openSnackbar] = useSnackbar();
  const [disabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { onPaymentComplete } = useCheckout();
  const { cart } = useCart();
  const router = useRouter();

  const createOrder = (data: any) => {
    // return cartService.createPaypalOrder(cart.id, {}).then(res => res.id);
    return fetch(`${getApiUrl()}/carts/${cart.id}/create-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(order => {
        return order.id;
      });
  };

  const handleApprove = async (data: any) => {
    // return cartService
    //   .capturePaypalOrderPayment(cart.id, data.orderId)
    //   .then(res => {
    //     console.log(res);
    //     onPaymentComplete();
    //   });

    return fetch(`${getApiUrl()}/carts/${cart.id}/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: data.orderID,
      }),
    })
      .then(response => response.json())
      .then(orderData => {
        onPaymentComplete();
      });
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data)}
      onApprove={(data, actions) => handleApprove(data)}
    />
  );
  // return (
  //   <Button
  //     type="submit"
  //     disabled={disabled || submitting}
  //     onClick={handleSubmit}
  //     sx={{
  //       width: '100%',
  //       borderRadius: '6px !important',
  //       fontWeight: '600 !important',
  //       fontSize: '13px !important',
  //     }}
  //   >
  //     {submitting ? (
  //       'Loading ...'
  //     ) : (
  //       <>
  //         Confirm & place order{' '}
  //         <LockKeyhole sx={{ marginLeft: 8, fontSize: 13 }} />
  //       </>
  //     )}
  //   </Button>
  // );
};

export default PaymentButton;
