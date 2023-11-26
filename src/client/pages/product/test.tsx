import { Box, Container } from '@kukui/ui';
import styled from '@emotion/styled';
import ProductView from '@store/components/product/ProductView';
import ProductSidebar from '@store/components/product/ProductSidebar';
import RecommendedProducts from '@store/components/product/RecommendedProducts';
import { ChevronRightSolid } from '@kukui/icons';

const Breadcrumb = styled(Box)({
  color: '#778379',
  lineHeight: 1,
  fontSize: '0.875rem',
  fontWeight: 500,
  width: '100%',
  padding: '25px 0 40px',
  a: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },

  '.active': {
    color: 'var(--text-default)',
  },

  '.KukuiSvgIcon': {
    margin: '0 2px',
    fontSize: '10px',
  },
});

const ProductTestSlug = () => {
  return (
    <Container>
      <Breadcrumb>
        <span>
          <a href="#">Amortentia</a>
          <ChevronRightSolid fontSize="inherit" />
        </span>
        <span>
          <a href="#">Personal Care</a>
          <ChevronRightSolid fontSize="inherit" />
        </span>
        <span className="active">Makeup Cleansing Cream</span>
      </Breadcrumb>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 440px',
        }}
      >
        <ProductView />
        <ProductSidebar />
      </Box>
      <RecommendedProducts />
    </Container>
  );
};

export default ProductTestSlug;
