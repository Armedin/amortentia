import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import { Minus, Plus, TrashCan } from '@kukui/icons';
import { Box, Typography } from '@kukui/ui';
import { useCart } from '@store/context/CartContext';
import { LineItem } from '@store/interfaces/line-item.interface';

const BasketItem = ({ item }: { item: LineItem }) => {
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
        paddingBottom: 18,
        marginBottom: 16,
        borderBottom: '1px solid #ededed',
        display: 'flex',
        paddingRight: 26,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          marginRight: 16,
          img: {
            width: '120px',
            height: '140px',
            objectFit: 'cover',
          },
        }}
      >
        <img src={getUploadImgUrl(item.thumbnail)} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 500, marginBottom: 6 }}>
          {item.title}
        </Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {item.quantity} ×{' '}
          {formatAmountWithSymbol({
            amount: item.price,
            currency: 'EUR',
          })}
        </Typography>
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
        </Box>
      </Box>

      <Box
        sx={{ position: 'absolute', top: 10, right: 6 }}
        onClick={handleDeleteItem}
      >
        <TrashCan sx={{ fontSize: 14, cursor: 'pointer', color: '#b1afaf' }} />
      </Box>
    </Box>
  );
};

export default BasketItem;
