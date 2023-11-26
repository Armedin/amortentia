import { Box, Card, CardContent, CardHeader, CardTitle } from '@kukui/ui';
import { Address } from '@store/interfaces/checkout.interface';
import truck from '@admin/assets/icons/truck.svg';

const ShippingAddress = ({ address }: { address: Address }) => {
  return (
    <Card sx={{ paddingTop: '1rem', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          pointerEvents: 'none',
          right: 0,
          top: 0,
          opacity: 0.1,
          img: {
            width: 175,
          },
        }}
      >
        <img src={truck.src} />
      </Box>
      <CardHeader>
        <CardTitle>
          <h2>Shipping Address</h2>
        </CardTitle>
      </CardHeader>
      <CardContent sx={{ paddingTop: 0 }}>
        {address.first_name + ' ' + address.last_name} ({address.phone}) <br />
        {address.country} <br />
        {address.address} <br />
        {address.apartment} <br />
        {address.city}, {address.postcode}
      </CardContent>
    </Card>
  );
};

export default ShippingAddress;
