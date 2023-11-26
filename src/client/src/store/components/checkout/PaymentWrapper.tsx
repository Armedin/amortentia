import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51ImwzLEcjw5vhxw0Fzifzke6oyLS1bUFkwN9KU1Dg7JYOLqANhBRdG05ofyEDagAR4bAvsgtkZWnvd4YkUwsUMed00uhkP0hoC'
);

const PaymentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default PaymentWrapper;
