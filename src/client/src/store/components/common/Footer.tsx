import styled from '@emotion/styled';
import { Box, Container, Typography } from '@kukui/ui';
import { Phone, Envelope, LocationDot } from '@kukui/icons';
import { useEffect, useState } from 'react';
import { productService } from '@admin/services';
import Link from 'next/link';

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productService.getAllCategories().then(res => {
      if (Array.isArray(res)) {
        setCategories(res);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f8f8f8',
          padding: '85px 0 75px 0',
          fontSize: '14px',
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
              '@media(max-width:800px)': {
                gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
              },
            }}
          >
            <Box>
              Amortentia - a perfect synergy between nature and science that
              arises from a constant commitment to study and innovation.
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
                <LocationDot sx={{ marginRight: '6px' }} fontSize="sm" />
                Mbreti Gent Bexhisteni, Shkoder, AL
              </ContactItem>
              <ContactItem>
                <Phone sx={{ marginRight: '6px' }} fontSize="sm" />
                +355672315400
              </ContactItem>
              <ContactItem>
                <Envelope sx={{ marginRight: '6px' }} fontSize="sm" />
                <Box
                  component="a"
                  sx={{ textDecoration: 'underline' }}
                  href="mailto:amortentia.albania@gmail.com"
                >
                  amortentia.albania@gmail.com
                </Box>
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
                {categories.map(category => (
                  <li key={category.title}>
                    <Link href={`/category/${category.id}`} passHref>
                      <a>{category.title}</a>
                    </Link>
                  </li>
                ))}
                {/* <li>
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
                </li> */}
              </NavigationLinks>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: '#f8f8f8',
          padding: '14px 0',
          fontSize: '13px',
        }}
      >
        <Container>
          © Amortentia | Developed by{' '}
          <a href="https://www.majilabs.com" target="_blank">
            Armedin Kuka
          </a>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
