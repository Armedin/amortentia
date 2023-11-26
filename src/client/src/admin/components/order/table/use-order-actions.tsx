import { ADMIN_ROUTES } from '@admin/utils/routes';
import { PenToSquare, TrashCan } from '@kukui/icons';
import { useRouter } from 'next/router';
import { ActionType } from '../../table/Actions';
import { Order } from '@admin/interfaces/order';

const useOrderActions = (order: Order) => {
  const router = useRouter();

  const getActions = (): ActionType[] => [
    {
      label: 'Edit',
      icon: <PenToSquare />,
      onClick: () => router.push(`${ADMIN_ROUTES.ORDERS}/${order.id}`),
    },
    {
      label: 'Delete',
      icon: <TrashCan />,
      onClick: () => {},
    },
  ];

  return {
    getActions,
  };
};

export default useOrderActions;
