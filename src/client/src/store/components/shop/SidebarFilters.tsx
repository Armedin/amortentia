import { ProductCategory } from '@admin/interfaces/product-category';
import { productService } from '@admin/services';
import { Box, Typography } from '@kukui/ui';
import { useEffect, useState } from 'react';

const SidebarFilters = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    productService.getAllCategoriesWithCount().then(res => {
      setCategories(res);
    });
  }, []);

  return (
    <Box sx={{ width: '260px', flexShrink: 0 }}>
      <Box sx={{ marginBottom: '46px' }}>
        <Typography
          variant="h3"
          sx={{
            marginBottom: '24px',
            paddingBottom: '16px',
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--border)',
            fontSize: 14,
          }}
        >
          Categories
        </Typography>
        <Box
          component="ul"
          sx={{
            li: {
              paddingBottom: '8px',
              fontSize: 15,
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--text-secondary)',

              '&:last-child': {
                paddingBottom: 0,
              },
            },
          }}
        >
          {categories.map(category => (
            <Box component="li" key={category.id}>
              <span>{category.title}</span> <span>({category.total})</span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarFilters;
