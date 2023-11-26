import { useInView } from 'react-intersection-observer';

const initial = {
  transition:
    'clip-path 1.08s cubic-bezier(.57,.01,.29,.99),transform .88s ease,-webkit-clip-path 1.08s cubic-bezier(.57,.01,.29,.99)',
  clipPath: 'inset(0 0 100%)',
  transform: 'translateY(-28px)',
};

const ImageAppearFromTop = ({ children }: { children?: React.ReactNode }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <div ref={ref}>
      <div
        style={{
          ...initial,
          ...(inView && {
            clipPath: 'inset(0 0 0)',
            transform: 'translateY(0)',
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ImageAppearFromTop;
