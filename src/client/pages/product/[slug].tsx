import { Box, Container } from '@kukui/ui';
import styled from '@emotion/styled';
import ProductView from '@store/components/product/ProductView';
import ProductSidebar from '@store/components/product/ProductSidebar';
import RecommendedProducts from '@store/components/product/RecommendedProducts';
import { ChevronRightSolid } from '@kukui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productService } from '@admin/services';
import { Product } from '@store/interfaces/product.interface';
import { GetServerSideProps } from 'next';
import { ProductCategory } from '@admin/interfaces/product-category';
import Link from 'next/link';

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

const ProductSlug = ({
  product,
  category,
}: {
  product: Product;
  category: ProductCategory;
}) => {
  return (
    <Container>
      <Breadcrumb>
        <span>
          <Link href="/" passHref>
            <a>Amortentia</a>
          </Link>
          <ChevronRightSolid fontSize="inherit" />
        </span>
        <span>
          <Link href={`/category/${category.id}`} passHref>
            <a>{category.title}</a>
          </Link>
          <ChevronRightSolid fontSize="inherit" />
        </span>
        <span className="active">{product.title}</span>
      </Breadcrumb>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 440px',
          '@media(max-width:800px)': {
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          },
        }}
      >
        <ProductView product={product} />
        <ProductSidebar product={product} />
      </Box>
      {/* <RecommendedProducts /> */}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.query;

  const product = await productService.getProductById(slug as string);

  if (!product) {
    return {
      redirect: {
        destination: '',
        permanent: false,
      },
    };
  }

  const category = await productService
    .getCategoryById(product.category_id)
    .catch(e => {
      return {
        redirect: {
          destination: '',
          permanent: false,
        },
      };
    });

  return {
    props: {
      product,
      category,
    },
  };
};

export default ProductSlug;
