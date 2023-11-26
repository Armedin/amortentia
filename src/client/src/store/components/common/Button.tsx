import React, { FC } from 'react';
import styled from '@emotion/styled';
import {
  Button as KukuiButton,
  ButtonProps as KukuiButtonProps,
} from '@kukui/ui';

interface ButtonProps extends KukuiButtonProps {}

const StyledButton = styled(KukuiButton)<ButtonProps>(
  {
    backgroundColor: '#222',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    fontSize: '12px',
    borderRadius: 0,
    padding: '15.5px 30px',
    height: 'auto',
  },
  props => ({
    ...(props.color === 'primary' && {
      backgroundColor: 'var(--text-primary)',
      '&:hover': {
        backgroundColor: '#222',
      },
    }),
    ...(props.disabled && {
      color: 'rgba(0, 0, 0, 0.26) !important',
      backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
    }),
  })
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <StyledButton {...props} ref={ref} />;
  }
);

Button.displayName = 'Button';

export default Button;
