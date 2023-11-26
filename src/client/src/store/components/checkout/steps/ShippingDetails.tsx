import { LockKeyhole } from '@kukui/icons';
import { Box, FormContainer, Input, Select, Typography } from '@kukui/ui';
import Button from '@store/components/common/Button';
import { useCheckout } from '@store/context/CheckoutContext';
import { useState } from 'react';
import countriesJSON from '@store/data/countries-codes.json';

const mapCountryToOption = (country: any) => ({
  value: country.name,
  label: country.name,
});

const countries = countriesJSON.map(option => mapCountryToOption(option));

const assignFormToShippingValues = (data: any) => {
  const keyValues = Object.keys(data).map(key => {
    return { [key]: data[key] };
  });
  return Object.assign({}, ...keyValues);
};

const ShippingDetails = ({ onNext }: { onNext: () => void }) => {
  const { cart, setAddress, initPayment } = useCheckout();
  const [loading, setLoading] = useState(false);
  const { shipping_address } = cart;
  const [country, setCountry] = useState(shipping_address?.country || '');

  const handleCountryChange = (event, value: string) => {
    setCountry(value);
    setAddress({
      shipping_address: { ...shipping_address, country: value },
    });
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setAddress({
      shipping_address: { ...assignFormToShippingValues(data), country },
      email: data.email,
    })
      .then(() => {
        onNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ fontSize: '1.5rem', marginBottom: 24 }}>
        Shipping Details
      </Typography>

      <FormContainer
        defaultValues={{
          first_name: shipping_address?.first_name || '',
          last_name: shipping_address?.last_name || '',
          country: shipping_address?.country || '',
          address: shipping_address?.address || '',
          apartment: shipping_address?.apartment || '',
          city: shipping_address?.city || '',
          postcode: shipping_address?.postcode || '',
          phone: shipping_address?.phone || '',
          email: cart.email || '',
        }}
        onSuccess={handleSubmit}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <Input
            label="First name*"
            name="first_name"
            type="text"
            placeholder="First name"
            required
          />
          <Input
            label="Last name*"
            name="last_name"
            type="text"
            placeholder="Last name"
            required
          />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Input
            label="Email*"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </Box>
        {/* Some bug going on here. The country attribute is not being populated */}
        <Box sx={{ marginBottom: '10px' }}>
          <Select
            label="Country*"
            placeholder="Country"
            name="country"
            value={country}
            onChange={handleCountryChange}
            options={countries}
            required
          />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Input
            label="Address*"
            name="address"
            type="text"
            placeholder="Address"
            required
          />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Input
            label="Apartment (optional)"
            name="apartment"
            type="text"
            placeholder="Apartment, suite, etc."
            isControlled
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 12,
            marginBottom: '10px',
          }}
        >
          <Input
            label="City*"
            name="city"
            type="text"
            placeholder="City"
            required
          />
          <Input
            label="Postcode*"
            name="postcode"
            type="text"
            placeholder="Postcode"
            required
          />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Input
            label="Phone Number*"
            name="phone"
            type="text"
            placeholder="Phone number"
            required
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: 10,
          }}
        >
          <Button
            type="submit"
            sx={{
              width: '100%',
              borderRadius: '6px !important',
              fontWeight: '600 !important',
              fontSize: '13px !important',
              // textTransform: 'none !important' as any,
            }}
            disabled={loading}
          >
            Continue to payment
            <LockKeyhole sx={{ marginLeft: 8, fontSize: 13 }} />
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
};

export default ShippingDetails;
