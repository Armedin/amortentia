import styled from '@emotion/styled';
import { Box } from '@kukui/ui';

const ProductImage = styled(Box)({
  // paddingTop: '66%',
  // overflow: 'hidden',
  // position: 'relative',

  img: {
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    // left: 0,
    // top: 0,
    // objectFit: 'cover',
    // display: 'block',
    maxHeight: '100%',
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    border: 0,
    verticalAlign: 'middle',
  },
});

const ProductItem = ({ product }: { product: any }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}
      >
        <a>
          <ProductImage>
            <img src={product.imageUrl} />
          </ProductImage>
        </a>
      </Box>
      <Box
        sx={{
          marginTop: '14px',
          fontSize: '1.075rem',
          textAlign: 'center',
          lineHeight: '1.5',
        }}
      >
        <a>{product.name}</a>
        <Box
          sx={{ marginTop: '6px', textAlign: 'center', fontSize: '0.95rem' }}
        >
          {product.price}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
