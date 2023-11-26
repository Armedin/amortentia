import { Product } from '@admin/interfaces/product';
import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import styled from '@emotion/styled';
import { Box } from '@kukui/ui';
import Link from 'next/link';

const ProductImage = styled(Box)({
  cursor: 'pointer',
  // paddingTop: '66%',
  // overflow: 'hidden',
  // position: 'relative',
  background: '#f6f6f6',

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
    transition: 'all .2s ease-in-out',
  },
});

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover': { img: { transform: 'scale(1.05)' } },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Link href={`/product/${product.id}`}>
          <ProductImage>
            <img src={getUploadImgUrl(product.thumbnail)} />
          </ProductImage>
        </Link>
      </Box>
      <Box
        sx={{
          marginTop: '14px',
          fontSize: '0.925rem',
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: '1.4',
        }}
      >
        <Box
          sx={{
            marginTop: '6px',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 700,
          }}
        >
          {formatAmountWithSymbol({
            amount: product.price,
            currency: 'EUR',
          })}
        </Box>
        <a>{product.title}</a>
      </Box>
    </Box>
  );
};

export default ProductItem;
