import styled from '@emotion/styled';
import { Box, Button } from '@kukui/ui';
import firstCollectionImg from '@assets/images/img1-1.jpeg';
import secondCollectionImg from '@assets/images/img1-2.jpeg';
import thirdCollectionImg from '@assets/images/img1-3.jpeg';

const CollectionItem = styled('div')({
  width: '33%',
  padding: '12.5px',
  float: 'left',

  '.item__wrapper': {
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      content: '""',
      display: 'block',
      marginTop: '75%',
    },
  },

  a: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  '.image__wrapper': {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    transform: 'scale(1)',
  },

  '.image': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage:
        'linear-gradient( to top, rgb(4 4 4 / 45%), rgb(54 54 54 / 0%) )',
    },
  },
});
const CollectionContent = styled('div')({
  position: 'absolute',
  width: '100%',
  bottom: '40px',
  padding: '0 40px',
  top: 'auto',
  left: 0,
  textAlign: 'left',
  color: '#fff',

  h2: {
    fontSize: '25px',
    textTransform: 'uppercase',
  },
});

const StyledButton = styled(Button)({
  color: '#fff',
  fontWeight: 600,
  textTransform: 'uppercase',
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: '2px solid #fff',
  backgroundColor: 'transparent',
  borderRadius: 0,
});

const Collections = () => {
  return (
    <Box
      sx={{
        marginTop: '15px',
        padding: '0 14px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <CollectionItem>
        <div className="item__wrapper">
          <a href="">
            <div className="image__wrapper">
              <div
                className="image"
                style={{ backgroundImage: `url(${firstCollectionImg.src})` }}
              />
            </div>
          </a>

          <CollectionContent>
            <h2>Bestseller</h2>
            <StyledButton>See More</StyledButton>
          </CollectionContent>
        </div>
      </CollectionItem>
      <CollectionItem>
        <div className="item__wrapper">
          <a href="">
            <div className="image__wrapper">
              <div
                className="image"
                style={{ backgroundImage: `url(${secondCollectionImg.src})` }}
              />
            </div>
          </a>

          <CollectionContent>
            <h2>New Arrivals</h2>
            <StyledButton>See More</StyledButton>
          </CollectionContent>
        </div>
      </CollectionItem>
      <CollectionItem>
        <div className="item__wrapper">
          <a href="">
            <div className="image__wrapper">
              <div
                className="image"
                style={{ backgroundImage: `url(${thirdCollectionImg.src})` }}
              />
            </div>
          </a>

          <CollectionContent>
            <h2>Deals & Steals</h2>
            <StyledButton>See More</StyledButton>
          </CollectionContent>
        </div>
      </CollectionItem>
    </Box>
  );
};

export default Collections;
