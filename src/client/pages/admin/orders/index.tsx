import OrdersTable from '@admin/components/order/table/OrdersTable';
import { Order } from '@admin/interfaces/order';
import { orderService } from '@admin/services/order.service';
import { Box, Input, Card, CardHeader, CardContent } from '@kukui/ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    orderService.getAllOrders().then(res => {
      setOrders(res);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <OrdersTable orders={orders} />
      </CardContent>
    </Card>
  );
};

export default Orders;
