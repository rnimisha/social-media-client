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
  AvatarBadge,
  IconButton,
} from '@chakra-ui/react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useAppSelector } from '@/store/hook';
import { useNavigate } from 'react-router-dom';
import useUnfollow from '@/hooks/useUnfollow';
import useFollow from '@/hooks/useFollow';
import { useEffect, useState } from 'react';
import useGetFollowings from '@/hooks/useGetFollowings';
import AppButton from './ui/AppButton';
import CoverImg from '../assets/images/nocover.png';
import ChangeProfilePic from './form/ChangeProfilePic';
import AppModal from './ui/AppModal';

type PropsType = {
  userDetail: ProfileType;
};
function ProfileCard({ userDetail }: PropsType) {
  const navigate = useNavigate();
  const currUser = useAppSelector((state) => state.user);
  const isSameUser = userDetail.id === currUser.id;
  const [isFollowing, setisFollowing] = useState<boolean>(false);
  const [isChangeProfile, setIsChangeProfile] = useState<boolean>(false);

  const handleShowFollow = (type: 'followers' | 'followings') => {
    navigate(`/profile/${userDetail.username}/${type}`);
  };

  const { data: currUserFollowings } = useGetFollowings({
    username: currUser.username,
  });

  const checkIsFollowing = (): void => {
    if (currUserFollowings && currUserFollowings.length > 0) {
      const match = currUserFollowings.find(
        (following) =>
          following.followingUser.username.toLowerCase() ===
          userDetail.username.toLowerCase()
      );
      setisFollowing(!!match);
    } else if (currUserFollowings && currUserFollowings.length === 0) {
      setisFollowing(false);
    }
  };

  const { mutate: followUser, isSuccess: followSuccess } = useFollow({});
  const { mutate: unfollowUser, isSuccess: unfollowSuccess } = useUnfollow({});

  useEffect(() => {
    checkIsFollowing();
  }, [followSuccess, unfollowSuccess, currUserFollowings]);

  const clickAction = () => {
    if (!isFollowing) {
      followUser({
        userToFollowId: userDetail.id,
        username: userDetail.username,
      });
    } else {
      unfollowUser({ id: userDetail.id, username: userDetail.username });
    }
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
          >
            {isSameUser && (
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                color="primary.300"
                border="none"
                bgColor="primary.100"
                opacity={0.9}
                aria-label="Edit Profile Pic"
                icon={<MdOutlineModeEdit />}
                onClick={() => {
                  setIsChangeProfile(true);
                }}
              />
            )}
          </Avatar>
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
                <AppButton
                  text={isFollowing ? 'Unfollow' : 'Follow'}
                  action={() => {
                    clickAction();
                  }}
                />
              </Stack>
              <Stack spacing={0} align="center" mt={8}>
                <AppButton text="Message" />
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
      <AppModal
        isOpenModal={isChangeProfile}
        onClose={() => {
          setIsChangeProfile(false);
        }}
        title="Choose Picture"
      >
        <ChangeProfilePic />
      </AppModal>
    </Center>
  );
}

export default ProfileCard;
