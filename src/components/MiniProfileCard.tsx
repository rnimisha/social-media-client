/* eslint-disable react-hooks/rules-of-hooks */
import { FollowUserType } from '@/common/types';
import { BASEURL } from '@/constants';
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function MiniProfileCard({ user }: { user: FollowUserType }) {
  const navigate = useNavigate();

  const navigateOnClick = () => [navigate(`/profile/${user.username}`)];
  return (
    <Center py={3}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '80%' }}
        height={{ md: '5rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        padding={8}
        _hover={{ bgColor: 'primary.100' }}
        onClick={navigateOnClick}
        cursor="pointer"
      >
        <Flex flex={1} alignItems="center">
          <Avatar
            size="md"
            name={user.username}
            src={`${BASEURL}/uploads/profile/${user.profilePic}`}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
          mt={2}
        >
          <Heading fontSize="md" fontFamily="body">
            {user.name}
          </Heading>
          <Text fontWeight={600} color="gray.500" size="sm" mb={4}>
            @{user.username}
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}

export default MiniProfileCard;
