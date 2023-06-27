import { BASEURL } from '@/constants';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  textDecoration,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  name: string;
  // eslint-disable-next-line react/require-default-props
  profilePic?: string;
  username: string;
};
function ProfileView({ name, profilePic, username }: PropsType) {
  const navigate = useNavigate();
  const navigateProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
  };
  return (
    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
      <Avatar
        name={name}
        cursor="pointer"
        src={`${BASEURL}/uploads/profile/${profilePic}`}
        onClick={navigateProfile}
        _hover={{ opacity: 0.5 }}
      />

      <Box>
        <Heading
          size="sm"
          cursor="pointer"
          onClick={navigateProfile}
          _hover={{ textDecoration: 'underline' }}
        >
          {name}
        </Heading>
        <Text
          cursor="pointer"
          onClick={navigateProfile}
          _hover={{ textDecoration: 'underline' }}
        >
          {username}
        </Text>
      </Box>
    </Flex>
  );
}

export default ProfileView;
