import { Order } from '@admin/interfaces/order';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@kukui/ui';
import { LineItem } from '@store/interfaces/line-item.interface';
import getUploadImgUrl from 'src/shared/utils/getUploadImgUrl';

const Item = ({ item }: { item: LineItem }) => {
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
      <img src={getUploadImgUrl(item.thumbnail, 150)} />
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
            fontWeight: 400,
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
      </Box>

      <Box
        sx={{
          fontWeight: 600,
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

const Summary = ({ order }: { order: Order }) => {
  return (
    <Card sx={{ paddingTop: '1rem', position: 'relative' }}>
      <CardHeader>
        <CardTitle>
          <h2>Summary</h2>
        </CardTitle>
      </CardHeader>
      <CardContent sx={{ paddingTop: 0 }}>
        {order.items?.map(item => (
          <Item key={item.id} item={item} />
        ))}
        <Box
          sx={{
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#303030',
            fontWeight: 500,
          }}
        >
          <Typography>Total</Typography>
          <Typography
            sx={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.75 }}
          >
            {formatAmountWithSymbol({
              amount: order.total as any,
              currency: 'EUR',
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
