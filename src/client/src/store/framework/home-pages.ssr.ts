import { productService } from '@admin/services/product.service';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<any, any> = async () => {
  // const categories = await productService.getAllCategories();
  // console.log(categories);
  return {
    props: {},
  };
};
