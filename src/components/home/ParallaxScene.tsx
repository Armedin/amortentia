import styled from '@emotion/styled';
import { Box } from '@kukui/ui';
import Parallax from 'parallax-js';
import { useEffect, useRef } from 'react';

const ParallaxLayer = styled(Box)({
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  paddingBottom: '4rem',

  img: {
    maxWidth: '100%',
    height: 'auto',
    width: '100%',
  },

  'div:nth-of-type(3)': {
    marginTop: '2rem',
  },
});

const ParallaxScene = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneRef.current, {
      relativeInput: true,
      limitX: true,
      calibrateX: true,
      scalarX: 1,
    });

    parallaxInstance.enable();

    return () => parallaxInstance.disable();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f6f6f6', overflow: 'hidden' }} ref={sceneRef}>
      <ParallaxLayer data-depth="0.1">
        <img src="https://www.just.it/wp-content/uploads/2020/09/parallax-00-montagna.png" />
      </ParallaxLayer>
      <ParallaxLayer data-depth="0.15">
        <img src="https://www.just.it/wp-content/uploads/2020/09/parallax-01-lago.png" />
      </ParallaxLayer>
      <ParallaxLayer data-depth="0.22">
        <img src="https://www.just.it/wp-content/uploads/2020/09/parallax-02-prodotti.png" />
      </ParallaxLayer>
    </Box>
  );
};

export default ParallaxScene;
