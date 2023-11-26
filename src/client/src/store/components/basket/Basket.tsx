import Button from '@store/components/common/Button';
import { ArrowRight, Xmark } from '@kukui/icons';
import { Box, ClickAwayListener, IconButton, Typography } from '@kukui/ui';
import { Transition } from 'react-transition-group';
import { useCart } from '@store/context/CartContext';
import BasketItem from './BasketItem';
import { useEffect, useMemo } from 'react';
import { formatAmountWithSymbol } from '@admin/utils/prices';
import { useRouter } from 'next/router';

const duration = 350;

const basketStyles: any = {
  entering: { transform: 'translateX(100%)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(100%)' },
  exited: { transform: 'translateX(100%)' },
};

const backdropStyles: any = {
  entering: { opacity: 0.5, visibility: 'visible' },
  entered: { opacity: 0.5, visibility: 'visible' },
  exiting: { opacity: 0, visibility: 'hidden' },
  exited: { opacity: 0, visibility: 'hidden' },
};

const Basket = () => {
  const { cart, subtotal, totalItems, isOpen, updateOpenState } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }
  }, [isOpen]);

  return (
    <Transition
      in={isOpen}
      timeout={{ enter: 0, exit: duration }}
      unmountOnExit
    >
      {state => (
        <>
          <Box
            sx={{
              transition: `opacity ${duration}ms ease-in-out, visibility ${duration}ms ease-in-out`,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#363636',
              opacity: 0,
              visibility: 'hidden',
              zIndex: 99,
              ...backdropStyles[state],
            }}
          />
          <ClickAwayListener onClickAway={() => updateOpenState(false)}>
            <Box
              sx={{
                background: '#fff',
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100%',
                maxWidth: '420px',
                height: '100%',
                boxShadow: '1px 8px 24px 2px rgb(0 0 0 / 14%)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                transition: `transform ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
                transform: 'translateX(100%)',
                ...basketStyles[state],
              }}
            >
              <Box sx={{ padding: '16px 24px 0 24px', overflow: 'scroll' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    {totalItems} added to your basket
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateOpenState(false)}
                  >
                    <Xmark fontSize="inherit" />
                  </IconButton>
                </Box>
                <Box sx={{ paddingTop: '24px', flex: 1 }}>
                  {cart.items?.map(item => (
                    <BasketItem item={item} />
                  ))}
                </Box>
              </Box>
              <Box sx={{ padding: '12px 24px', position: 'sticky' }}>
                <Box
                  sx={{
                    padding: '16px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                    Subtotal
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
                    {formatAmountWithSymbol({
                      amount: subtotal,
                      currency: 'EUR',
                    })}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  color="primary"
                  onClick={() => {
                    router.push('/checkout');
                    updateOpenState(false);
                  }}
                >
                  Checkout
                  <ArrowRight sx={{ fontSize: 15, marginLeft: 6 }} />
                </Button>
              </Box>
            </Box>
          </ClickAwayListener>
        </>
      )}
    </Transition>
  );
};

export default Basket;
