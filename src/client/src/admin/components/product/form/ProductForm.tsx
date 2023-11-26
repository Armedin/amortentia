import styled from '@emotion/styled';
import {
  Box,
  Input,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@kukui/ui';
import { Product } from '@admin/interfaces/product';
import Properties from '../Properties';
import Pricing from '../Pricing';
import Images from '../Images';
import { Button } from '@admin/components/base';
import { useRouter } from 'next/router';
import { ADMIN_ROUTES } from '@admin/utils/routes';
import ProductDescriptionEditor from './ProductDescriptionEditor';
import { useRef, useState } from 'react';

const ProductDetails = styled(Box)({
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const ProductForm = ({
  product,
  isEdit,
}: {
  product?: Product;
  isEdit?: boolean;
}) => {
  // For now, quick hack to update description using WYSIWYG editor
  const [description, setDescription] = useState(product?.description || '');
  const inputRef = useRef<any>(null);
  const router = useRouter();

  return (
    <ProductDetails>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent sx={{ paddingTop: 0 }}>
          <Box sx={{ marginBottom: '2rem' }}>
            <Input
              label="Product Title"
              placeholder="Product title"
              name="title"
              helperText="A product title is required and recommended to be unique."
              required
            />
          </Box>
          <Box
            sx={{
              marginBottom: '2rem',
              '.KukuiFieldWrapper': { display: 'none' },
            }}
          >
            <ProductDescriptionEditor
              value={description}
              onChange={(e: any) => {
                // Issue with @kukui/ui input validators...
                setDescription(e);
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                  window.HTMLTextAreaElement.prototype,
                  'value'
                ).set;
                nativeInputValueSetter.call(inputRef.current, e);

                var ev2 = new Event('input', { bubbles: true });
                inputRef.current.dispatchEvent(ev2);
              }}
            />

            <Input
              label="Product Description"
              placeholder="Product description"
              name="description"
              value={description}
              minRows={8}
              textarea
              required
              inputRef={inputRef}
            />
          </Box>
          <Properties />
        </CardContent>
      </Card>

      <Pricing />

      <Images />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <Button size="large" onClick={() => router.push(ADMIN_ROUTES.PRODUCTS)}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          {isEdit ? 'Update Product' : 'Publish Product'}
        </Button>
      </Box>
    </ProductDetails>
  );
};

export default ProductForm;
