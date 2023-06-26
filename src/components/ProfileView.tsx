import { BASEURL } from '@/constants';
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';

type PropsType = {
  name: string;
  // eslint-disable-next-line react/require-default-props
  profilePic?: string;
  username: string;
};
function ProfileView({ name, profilePic, username }: PropsType) {
  return (
    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
      <Avatar name={name} src={`${BASEURL}/uploads/profile/${profilePic}`} />

      <Box>
        <Heading size="sm">{name}</Heading>
        <Text>{username}</Text>
      </Box>
    </Flex>
  );
}

export default ProfileView;
