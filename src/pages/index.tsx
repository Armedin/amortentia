import Catalog from '@components/home/Catalog';
import Collections from '@components/home/Collections';
import ImageText from '@components/home/ImageText';
import InstagramPhotos from '@components/home/InstagramPhotos';
import Newsletter from '@components/home/Newsletter';
import ParallaxScene from '@components/home/ParallaxScene';
import Recommended from '@components/home/Recommended';
import Welcome from '@components/home/Welcome';

const Home = () => {
  return (
    <>
      <Welcome />
      <ParallaxScene />
      <Collections />
      <Recommended />
      <Catalog />
      <ImageText />
      {/* <Reviews /> */}
      <InstagramPhotos />
      <Newsletter />
    </>
  );
};

export default Home;
