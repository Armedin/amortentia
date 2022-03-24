import styled from '@emotion/styled';
import { Box, Container, Typography } from '@kukui/ui';
import { Phone, LocationPin, Envelope } from '@kukui/icons';

const NavigationLinks = styled('ul')({
  li: {
    marginBottom: '0.55rem',
  },
});

const ContactItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#222',
          color: 'rgba(255, 255, 255, 90%)',
          padding: '85px 0 75px 0',
          fontSize: '13px',
        }}
        className="footer"
      >
        <Container>
          <Box
            sx={{
              display: 'grid',
              flexWrap: 'wrap',
              gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
              gap: '1.5rem',
            }}
          >
            <Box>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              maximus quis massa sed tempor.
            </Box>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.35rem',
                  marginBottom: '0.85rem',
                  lineHeight: 1,
                }}
              >
                Contact Us
              </Typography>

              <ContactItem>
                <LocationPin sx={{ marginRight: '6px' }} fontSize="sm" />
                9870 St Vincent Place, Glasgow, DC 45
              </ContactItem>
              <ContactItem>
                <Phone sx={{ marginRight: '6px' }} fontSize="sm" />
                +84 100-2345-6799
              </ContactItem>
              <ContactItem>
                <Envelope sx={{ marginRight: '6px' }} fontSize="sm" />
                support@domain.com
              </ContactItem>
            </Box>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.35rem',
                  marginBottom: '0.85rem',
                  lineHeight: 1,
                }}
              >
                Categories
              </Typography>
              <NavigationLinks>
                <li>
                  <a href="">Wellness</a>
                </li>
                <li>
                  <a href="">Personal Care</a>
                </li>
                <li>
                  <a href="">Beauty</a>
                </li>
                <li>
                  <a href="">Home Care</a>
                </li>
              </NavigationLinks>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: '#d6a044',
          color: '#fff',
          padding: '14px 0',
          fontSize: '12px',
        }}
      >
        <Container>© Amortentia | Developed by Armedin Kuka</Container>
      </Box>
    </>
  );
};

export default Footer;
