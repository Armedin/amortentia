import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortableLabel,
  TableBody,
  Box,
  Typography,
  Badge,
} from '@kukui/ui';
import useTable from '@admin/components/table/use-table';
import { Order } from '@admin/interfaces/order';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import useOrderActions from './use-order-actions';
import Actions from '@admin/components/table/Actions';

const headCells = [
  {
    id: 'name',
    label: 'Order',
  },
  {
    id: 'date',
    label: 'Date added',
    sortable: true,
  },
  {
    id: 'customer',
    label: 'Customer',
  },
  {
    id: 'total',
    label: 'Total',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

const OrderRow = ({ row }: { row: Order }) => {
  const { getActions } = useOrderActions(row);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            img: { width: '75px', height: '75px', objectFit: 'cover' },
          }}
        >
          <Typography sx={{ fontSize: '0.85rem' }}>{'#' + row.id}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(
          new Date(row.created_at)
        )}
      </TableCell>
      <TableCell align="left">
        {row.shipping_address.first_name + ' ' + row.shipping_address.last_name}
      </TableCell>
      <TableCell>
        {formatAmountWithSymbol({
          amount: row.total as any,
          currency: 'EUR',
        })}
      </TableCell>
      <TableCell>
        <Badge content={row.status} />
      </TableCell>
      <TableCell>
        <Actions actions={getActions()} />
      </TableCell>
    </TableRow>
  );
};

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const { orderDirection, getComparator, orderBy, onSortableClick } =
    useTable();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headCells.map((cell, index) => (
            <TableCell key={cell.id} align={index !== 0 ? 'left' : 'inherit'}>
              {cell.sortable ? (
                <TableSortableLabel
                  onClick={() => onSortableClick(cell.id as any)}
                  direction={orderBy === cell.id ? orderDirection : 'asc'}
                >
                  {cell.label}
                </TableSortableLabel>
              ) : (
                cell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.sort(getComparator(orderDirection, orderBy)).map(order => (
          <OrderRow key={order.id} row={order} />
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
