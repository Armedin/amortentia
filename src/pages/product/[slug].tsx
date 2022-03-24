import { Box, Container } from '@kukui/ui';
import styled from '@emotion/styled';
import ProductView from '@components/product/ProductView';
import ProductSidebar from '@components/product/ProductSidebar';
import RecommendedProducts from '@components/product/RecommendedProducts';

const Breadcrumb = styled(Box)({
  color: '#778379',
  lineHeight: 1,
  fontSize: '0.875rem',
  width: '100%',
  padding: '25px 0 40px',
  a: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },

  '.active': {
    color: 'var(--text-default)',
  },
});

const ProductSlug = () => {
  return (
    <Container>
      <Breadcrumb>
        <span>
          <a href="#">Home</a>
          <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
        </span>
        <span>
          <a href="#">Personal Care</a>
          <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
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

export default ProductSlug;
