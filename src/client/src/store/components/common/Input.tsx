import styled from '@emotion/styled';
import { Input as KukuiInput } from '@kukui/ui';

const StyledInput = styled(KukuiInput)({
  border: '1px solid #333',
  borderRadius: '0',
});

const Input = ({ ...props }: any) => {
  return <StyledInput {...props} />;
};

export default Input;
