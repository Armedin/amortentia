import { Box, Card, CardContent, CardHeader, CardTitle } from '@kukui/ui';
import Discount from '@admin/components/product/Discount';
import { CurrencyInput } from '../base';
import { useProductForm } from './form/ProductFormContext';

const Pricing = () => {
  const { getValues, setValue } = useProductForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent sx={{ paddingTop: 0 }}>
        <Box sx={{ marginBottom: '2rem' }}>
          <CurrencyInput
            name="price"
            label="Product Price"
            placeholder="Product price"
            onChange={amount => {
              setValue('price', amount);
            }}
            amount={getValues('price')}
            required
          />
        </Box>
        <Discount />
      </CardContent>
    </Card>
  );
};

export default Pricing;
