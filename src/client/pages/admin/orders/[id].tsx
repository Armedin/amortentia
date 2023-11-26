import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order } from '@admin/interfaces/order';
import { orderService } from '@admin/services/order.service';
import { Box } from '@kukui/ui';
import ShippingAddress from '@admin/components/order/ShippingAddress';
import Summary from '@admin/components/order/Summary';

const OrderPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setLoading(true);
    orderService
      .getOrderById(id as string)
      .then(res => setOrder(res))
      .finally(() => setLoading(false));
  }, [router.isReady]);

  return loading || order === null ? (
    <p>Loading</p>
  ) : (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          alignItems: 'flex-start',
          gap: '2rem',
        }}
      >
        <ShippingAddress address={order.shipping_address} />
        <Summary order={order} />
      </Box>
    </Box>
  );
};
export default OrderPage;
