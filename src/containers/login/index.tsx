import LoginForm from '@/components/form/LoginForm';

// styles
import { Box, Center, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import AppHeading from '@/components/ui/AppHeading';
import withAccess from '@/common/hoc/withAccess';
import { Link } from 'react-router-dom';
import AuthLeft from '@/components/AuthLeft';
import { formBox } from './styles';

function Login() {
  return (
    <Center>
      <AuthLeft>
        <Box sx={formBox} textAlign="center">
          <Center my="20px">
            <Box width="90%">
              <LoginForm />
            </Box>
          </Center>
          <Box>
            No account? <Link to="/register">Register</Link>
          </Box>
        </Box>
      </AuthLeft>
    </Center>
  );
}

export default withAccess(Login);
