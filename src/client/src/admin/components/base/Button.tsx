import styled from '@emotion/styled';
import { Button as KukuiButton, ButtonProps } from '@kukui/ui';

const StyledButton = styled(KukuiButton)<ButtonProps>(props => ({
  ...(props.size === 'large' && {
    height: '46px',
    fontSize: '0.875rem',
  }),
}));

const Button = ({ ...props }: ButtonProps) => {
  const { sx, ...other } = props;
  return (
    <StyledButton
      sx={{ height: '40px', fontSize: '0.8rem', ...(sx || {}) }}
      {...other}
    />
  );
};

export default Button;
