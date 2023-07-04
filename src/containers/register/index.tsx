import withAccess from '@/common/hoc/withAccess';
import AuthLeft from '@/components/AuthLeft';
import { Box, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RegisterForm from '@/components/form/RegisterForm';
import formBox from '../login/styles';

function Register() {
  return (
    <Center>
      <AuthLeft>
        <Box sx={formBox} textAlign="center">
          <Center my="20px">
            <Box w="90%">
              <RegisterForm />
            </Box>
          </Center>
          <Box>
            Already registered? <Link to="/login">Login</Link>
          </Box>
        </Box>
      </AuthLeft>
    </Center>
  );
}

export default withAccess(Register);
