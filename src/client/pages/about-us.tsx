import { Box, Container, Typography } from '@kukui/ui';
import HeroHeader from '@store/components/about/HeroHeader';
import ProductResults from '@store/components/shop/ProductResults';
import SidebarFilters from '@store/components/shop/SidebarFilters';

const ShopPage = () => {
  return (
    <Box>
      <HeroHeader />
      <Box sx={{ padding: '60px 0' }}>
        <Container>
          <Box sx={{ marginBottom: '68px' }}>
            <Typography variant="h1" sx={{ marginBottom: '12px' }}>
              A perfect synergy between passion, nature and science
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              Shkodra is one of the oldest cities of Albania with a millennial
              residential history. Located between the shores of Lake Shkodra
              close to the rivers Drin, Buna and Kir, nearby the Dinaric Alps,
              Shkodra is culturally the most important city in Albania. It is
              considered the “cradle of the Albanian culture”.
            </Typography>
            <Typography>
              This is where the story of Amortentia begins, when in 2012, the
              passion for fragrances and nature started its journey to be then
              transformed into a venture that would eventually become a leader
              in creating Phytocosmetic products based on essential oils and
              vegetable extracts. After much research in the field, in 2017, the
              first cosmetics that advertise the Amortentia brand started
              production.
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '68px' }}>
            <Typography variant="h1" sx={{ marginBottom: '12px' }}>
              What we care most
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              “Our way of doing” is based on solid principles: excellent quality
              of natural ingredients; rigorous selection of the best essential
              and vegetable oils; formulas that offer the maximum benefits for
              different skin types, and research that intertwine in full harmony
              the traditional Galenic way and modern cosmetology.
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              <Box
                sx={{
                  fontWeight: 700,
                  textDecoration: 'underline',
                  display: 'inline-block',
                }}
              >
                Only the most vital plants
              </Box>{' '}
              arrive in our laboratory. We apply the most recommended techniques
              to obtain excellent vegetable extracts, and we select the purest
              oils.
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              <Box
                sx={{
                  fontWeight: 700,
                  textDecoration: 'underline',
                  display: 'inline-block',
                }}
              >
                Cultivated in Albania
              </Box>{' '}
              in plantations recommended for medicinal plants, lavender is the
              treasured flower for Amortentia. We work carefully with only the
              freshest flowers: therefore, our extracts contain active
              principles with rich values.
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              <Box
                sx={{
                  fontWeight: 700,
                  textDecoration: 'underline',
                  display: 'inline-block',
                }}
              >
                Following a manufacturing process
              </Box>{' '}
              that adheres to European norms, the formulas are subject to
              verifications of preservation, stability and tolerance, thus
              ensuring safe use in the wide range of homeopathic cures.
            </Typography>
          </Box>
          <Box>
            If you have a favorite scent you'd like to see featured or if you
            have allergies to a certain ingredient, please email us at{' '}
            <Box
              component="a"
              sx={{ textDecoration: 'underline' }}
              href="mailto:amortentia.albania@gmail.com"
            >
              amortentia.albania@gmail.com
            </Box>{' '}
            for a custom order.
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ShopPage;
