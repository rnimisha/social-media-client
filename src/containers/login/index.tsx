import LoginForm from "@/components/form/LoginForm";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function Login() {
  return (
    <Box>
      <Grid minH="100vh" templateColumns="repeat(2, 1fr)" alignItems="center">
        <GridItem colSpan={{ base: 2, lg: 1 }}>hello</GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <LoginForm />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Login;
