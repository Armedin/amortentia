import { ADMIN_ROUTES } from '@admin/utils/routes';
import { Product } from '@admin/interfaces/product';
import { PenToSquare, TrashCan } from '@kukui/icons';
import { useRouter } from 'next/router';
import { ActionType } from '../../table/Actions';
import { productService } from '@admin/services';

const useProductActions = (product: Product) => {
  const router = useRouter();

  const getActions = (): ActionType[] => [
    {
      label: 'Edit',
      icon: <PenToSquare />,
      onClick: () => router.push(`${ADMIN_ROUTES.PRODUCTS}/${product.id}`),
    },
    {
      label: 'Delete',
      icon: <TrashCan />,
      onClick: () => {
        productService.deleteProductById(product.id);
      },
    },
  ];

  return {
    getActions,
  };
};

export default useProductActions;
