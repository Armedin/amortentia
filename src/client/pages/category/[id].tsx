import { Product } from '@admin/interfaces/product';
import { ProductCategory } from '@admin/interfaces/product-category';
import { productService } from '@admin/services';
import styled from '@emotion/styled';
import { ChevronRightSolid } from '@kukui/icons';
import { Box, Container, Typography } from '@kukui/ui';
import categoryImg from '@store/assets/images/category-hero.webp';
import ProductItem from '@store/components/product/ProductItem';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Breadcrumb = styled(Box)({
  color: '#778379',
  lineHeight: 1,
  fontSize: '0.95rem',
  fontWeight: 500,
  width: '100%',
  padding: '25px 0 20px',
  a: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },

  '.active': {
    color: 'var(--text-default)',
  },

  '.KukuiSvgIcon': {
    margin: '0 2px',
    fontSize: '11px',
  },
});

const Category = ({
  category,
  products,
}: {
  category: ProductCategory;
  products: Product[];
}) => {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          height: 240,
          width: '100%',
          backgroundImage: `url(${categoryImg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Container>
          <Box
            sx={{
              position: 'relative',
              top: 65,
              background: '#fff',
              padding: '2rem 2rem 2.5rem 2rem',
              width: '50%',
            }}
          >
            <Breadcrumb>
              <span>
                <Link href="/" passHref>
                  <a>Amortentia</a>
                </Link>
                <ChevronRightSolid fontSize="inherit" />
              </span>
              <span className="active">{category.title}</span>
            </Breadcrumb>
            <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
              {category.title}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ paddingTop: '80px', paddingBottom: '44px' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '28px',
            }}
          >
            {products.map(product => (
              <ProductItem key={product.title} product={product} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query;

  // Check for products which don't have a category...
  const category = await productService.getCategoryById(id as string);
  const products = await productService.getAllProducts({ categoryId: id });

  return {
    props: {
      category,
      products: Array.isArray(products) ? products : [],
    },
  };
};

export default Category;
