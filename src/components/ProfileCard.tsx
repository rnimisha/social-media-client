import { ProfileType } from '@/common/types';
import { BASEURL } from '@/constants';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '@/store/hook';
import { useNavigate } from 'react-router-dom';
import CoverImg from '../assets/images/nocover.png';
import AppButton from './ui/AppButton';

type PropsType = {
  userDetail: ProfileType;
};
function ProfileCard({ userDetail }: PropsType) {
  const currUser = useAppSelector((state) => state.user);
  const isSameUser = userDetail.id === currUser.id;
  const navigate = useNavigate();

  const handleShowFollow = (type: 'followers' | 'followings') => {
    navigate(`/profile/${userDetail.username}/${type}`);
  };
  return (
    <Center py={6}>
      <Box
        w="full"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="sm"
        rounded="md"
        overflow="hidden"
      >
        <Image
          h="220px"
          w="full"
          src={
            userDetail.coverPic !== null
              ? `${BASEURL}/uploads/profile/${userDetail.coverPic}`
              : CoverImg
          }
          objectFit="cover"
        />
        <Flex justify="center" mt={-12}>
          <Avatar
            size="xl"
            name={userDetail.username}
            src={`${BASEURL}/uploads/profile/${userDetail.profilePic}`}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {userDetail.name}
            </Heading>
            <Text color="gray.500">{userDetail.username}</Text>
          </Stack>

          <Stack direction="row" justify="center" spacing={6}>
            <Stack
              spacing={0}
              align="center"
              cursor="pointer"
              onClick={() => {
                handleShowFollow('followers');
              }}
            >
              <Text fontWeight={600}>{userDetail.followerCount}</Text>
              <Text fontSize="sm" color="gray.500">
                Followers
              </Text>
            </Stack>
            <Stack
              spacing={0}
              align="center"
              cursor="pointer"
              onClick={() => {
                handleShowFollow('followings');
              }}
            >
              <Text fontWeight={600}>{userDetail.followingCount}</Text>
              <Text fontSize="sm" color="gray.500">
                Followings
              </Text>
            </Stack>
          </Stack>

          {!isSameUser && (
            <Stack direction="row" justify="center" spacing={6}>
              <Stack spacing={0} align="center" mt={8}>
                <AppButton text="Follow" />
              </Stack>
              <Stack spacing={0} align="center" mt={8}>
                <AppButton text="Message" />
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </Center>
  );
}

export default ProfileCard;
