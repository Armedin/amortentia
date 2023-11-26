import Hero from '@store/components/home/Hero';
import InstagramPhotos from '@store/components/home/InstagramPhotos';
import Newsletter from '@store/components/home/Newsletter';
import Recommended from '@store/components/home/Recommended';
import WhatMakesUsSpecial from '@store/components/home/WhatMakesUsSpecial';

const Home = () => {
  return (
    <>
      <Hero />
      <Recommended />
      <WhatMakesUsSpecial />
      <InstagramPhotos />
      <Newsletter />
    </>
  );
};

export default Home;
