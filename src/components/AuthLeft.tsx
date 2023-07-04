import { GridItem, VStack, Grid, Text, Box } from '@chakra-ui/react';
import AppHeading from './ui/AppHeading';

function AuthLeft({ children }: { children: JSX.Element }) {
  return (
    <Box width={['98%', '94%', '80%']}>
      <Grid minH="100vh" templateColumns="repeat(2, 1fr)" alignItems="center">
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack>
            <AppHeading
              text="Connectify"
              fontsize="clamp(2.5rem, 0.625rem + 6vw, 4rem)"
            />
            <Text>Meet and interact with people</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>{children}</GridItem>
      </Grid>
    </Box>
  );
}

export default AuthLeft;
