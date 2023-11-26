import { formatAmountWithSymbol } from '@admin/utils/prices';
import { Minus, Plus } from '@kukui/icons';
import { Box, Typography } from '@kukui/ui';
import { useCart } from '@store/context/CartContext';
import { LineItem } from '@store/interfaces/line-item.interface';
import Link from 'next/link';
import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';

const CheckoutItem = ({ item }: { item: LineItem }) => {
  const { removeItemFromCart, updateCartItem } = useCart();

  const handleDeleteItem = () => {
    removeItemFromCart(item.id);
  };

  const handleAddItem = () => {
    updateCartItem(item.id, { quantity: item.quantity + 1 });
  };

  const handleRemoveItem = () => {
    // Delete item instead!
    if (item.quantity === 1) {
      handleDeleteItem();
      return;
    }

    updateCartItem(item.id, { quantity: item.quantity - 1 });
  };

  return (
    <Box
      sx={{
        paddingBottom: 16,
        width: '100%',
        display: 'flex',
        img: {
          width: '66px',
          height: '74px',
          borderRadius: '6px',
          border: '1px solid #fad9d9',
          objectFit: 'cover',
          background: '#fff',
        },
      }}
    >
      <Link href={`/product/${item.id}`}>
        <img src={getUploadImgUrl(item.thumbnail, 150)} />
      </Link>

      <Box
        sx={{
          width: 'calc(100% - 66px - 120px)',
          margin: '0 12px 0 16px',
          lineHeight: 'normal',
        }}
      >
        <Typography
          sx={{
            color: '#303030',
            fontWeight: 600,
            fontSize: 14,
            textTransform: 'uppercase',
            marginBottom: 4,
            paddingTop: 4,
          }}
        >
          {item.title}
        </Typography>
        <Box
          sx={{
            color: '#6c6c6c',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          <Box component="span">{item.quantity}</Box>
          <Box component="span" sx={{ fontSize: 12, padding: '0 4px' }}>
            x
          </Box>
          <Box component="span">
            {formatAmountWithSymbol({
              amount: item.price,
              currency: 'EUR',
            })}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Box
            onClick={handleRemoveItem}
            sx={{
              width: 16,
              height: 16,
              border: '1px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Minus sx={{ fontSize: 10, color: '#222' }} />
          </Box>
          <Box
            onClick={handleAddItem}
            sx={{
              width: 16,
              height: 16,
              border: '1px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Plus sx={{ fontSize: 10, color: '#222' }} />
          </Box>
          <Box
            component="a"
            onClick={handleDeleteItem}
            sx={{
              fontSize: 10.5,
              color: '#6a6a6a',
              position: 'relative',
              textTransform: 'uppercase',
              display: 'inline-block',
              fontWeight: 600,
              cursor: 'pointer',
              '&:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                height: 1,
                bottom: -1,
                width: '100%',
                backgroundColor: '#909090',
              },
            }}
          >
            Remove
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          fontWeight: 700,
          color: '#303030',
          width: 120,
          textAlign: 'right',
          paddingTop: '18px',
          fontSize: 15,
          textTransform: 'uppercase',
        }}
      >
        {formatAmountWithSymbol({
          amount: item.quantity * item.price,
          currency: 'EUR',
        })}
      </Box>
    </Box>
  );
};

export default CheckoutItem;
