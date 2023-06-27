import { FollowUserType, FollowerType, FollowingType } from '@/common/types';
import { Box, Divider, Flex } from '@chakra-ui/react';
import { useAppSelector } from '@/store/hook';
import ProfileView from './ProfileView';
import AppButton from './ui/AppButton';

type PropsType = {
  type: 'followings' | 'followers';
  data: FollowingType | FollowerType;
};

function FollowCard({ type, data }: PropsType) {
  const currentUser = useAppSelector((state) => state.user);
  const userData =
    type === 'followings'
      ? (data as FollowingType).followingUser
      : (data as FollowerType).followerUser;
  const isFollowing = true;

  return (
    <Box mt={2}>
      <Flex py={4} px={8}>
        <ProfileView
          name={userData.name}
          profilePic={userData.profilePic || undefined}
          username={userData.username}
        />
        <AppButton text={isFollowing ? 'Unfollow' : 'Follow'} />
      </Flex>

      <Divider borderColor="blackAlpha.400" />
    </Box>
  );
}

export default FollowCard;
