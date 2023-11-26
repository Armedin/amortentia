import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableSortableLabel,
  TableCell,
  TableRow,
  Typography,
  Badge,
  Button,
} from '@kukui/ui';
import Image from 'next/image';
import {
  displayAmount,
  displayUnitPrice,
  formatAmountWithSymbol,
} from '@admin/utils/prices';
import { useState } from 'react';
import { Product } from '@admin/interfaces/product';
import { ChevronDownSolid } from '@kukui/icons';
import styled from '@emotion/styled';
import useTable from '@admin/components/table/use-table';
import useProductActions from './use-product-actions';
import Actions from '@admin/components/table/Actions';
import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';

const ThumbnailImage = styled(Image)({
  background: '#f5f8fa',
  objectFit: 'cover',
  borderRadius: '.475rem',
});

const headCells = [
  {
    id: 'name',
    label: 'Product',
    sortable: true,
  },
  {
    id: 'sku',
    label: 'Sku',
    sortable: true,
  },
  {
    id: 'quantity',
    label: 'QTY',
    sortable: true,
  },
  {
    id: 'price',
    label: 'Price',
    sortable: true,
  },
  { id: 'status', label: 'Status' },
  {
    id: 'actions',
    label: 'Actions',
  },
];

const ProductRow = ({ row }: { row: Product }) => {
  const { getActions } = useProductActions(row);

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
          <img src={getUploadImgUrl(row.thumbnail, 150)} />

          <Typography sx={{ marginLeft: '1rem', fontSize: '0.85rem' }}>
            {row.title}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">----</TableCell>
      <TableCell align="right">--</TableCell>
      <TableCell align="right">
        <Typography sx={{ fontWeight: 600, fontSize: '0.825rem' }}>
          {formatAmountWithSymbol({
            amount: row.price,
            currency: 'EUR',
          })}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Badge color="success" content="Published" />
      </TableCell>
      <TableCell align="right">
        <Actions actions={getActions()} />
      </TableCell>
    </TableRow>
  );
};

const ProductTable = ({ products }: { products: Product[] }) => {
  const { orderDirection, getComparator, orderBy, onSortableClick } =
    useTable();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headCells.map((cell, index) => (
            <TableCell key={cell.id} align={index !== 0 ? 'right' : 'inherit'}>
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
        {products.sort(getComparator(orderDirection, orderBy)).map(product => (
          <ProductRow key={product.id} row={product} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
