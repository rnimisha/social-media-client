import LoginForm from '@/components/form/LoginForm';

// styles
import { Box, Center, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import AppHeading from '@/components/ui/AppHeading';
import { formBox } from './styles';

function Login() {
  return (
    <Center>
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
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <Box sx={formBox} textAlign="center">
              <Center my="20px">
                <Box width="90%">
                  <LoginForm />
                </Box>
              </Center>
              <Box>No account? register </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}

export default Login;
