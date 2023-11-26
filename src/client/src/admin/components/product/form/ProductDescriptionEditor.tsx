import { Box } from '@kukui/ui';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const StyledQuill = styled(ReactQuill)({
  fontFamily: 'inherit',
  '.ql-toolbar.ql-snow': {
    color: 'var(--text-default)',
    fontSize: '0.875rem',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.23)',

    '.ql-picker .ql-picker-label': {
      color: '#A1A5B7',
    },
    'button .ql-stroke': {
      stroke: '#A1A5B7',
    },
    '.ql-fill': {
      fill: '#A1A5B7',
    },
    '.ql-stroke': {
      stroke: '#A1A5B7',
    },
  },
  '.ql-container.ql-snow': {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  '.ql-editor': {
    color: 'var(--text-default)',
    height: '140px',
    fontFamily: 'proxima-soft, sans-serif',
    fontSize: '0.875rem',

    '&.ql-blank:before': {
      left: 'auto',
      right: 'auto',
      color: '#A1A5B7',
      fontStyle: 'normal',
    },
  },
});

const ProductDescriptionEditor = ({
  value,
  onChange,
}: {
  value?: string;
  onChange(content: string): void;
}) => {
  return (
    <StyledQuill
      placeholder="Product Description"
      value={value}
      theme="snow"
      onChange={(newValue, delta, source) => {
        if (source === 'user') {
          onChange(newValue);
        }
      }}
    />
  );
};

export default ProductDescriptionEditor;
