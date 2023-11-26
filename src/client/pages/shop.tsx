import { Box, Container } from '@kukui/ui';
import HeroHeader from '@store/components/shop/HeroHeader';
import ProductResults from '@store/components/shop/ProductResults';
import SidebarFilters from '@store/components/shop/SidebarFilters';

const ShopPage = () => {
  return (
    <Box>
      <HeroHeader />
      <Box sx={{ padding: '94px 0' }}>
        <Container>
          <Box sx={{ display: 'flex', gap: '56px' }}>
            <SidebarFilters />
            <ProductResults />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ShopPage;
