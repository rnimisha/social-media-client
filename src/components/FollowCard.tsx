import { FollowUserType, FollowerType, FollowingType } from '@/common/types';
import { Box, Divider, Flex } from '@chakra-ui/react';
import { useAppSelector } from '@/store/hook';
import useGetFollowings from '@/hooks/useGetFollowings';
import { useEffect, useState } from 'react';
import useFollow from '@/hooks/useFollow';
import { useParams } from 'react-router-dom';
import useUnfollow from '@/hooks/useUnfollow';
import ProfileView from './ProfileView';
import AppButton from './ui/AppButton';

type PropsType = {
  data: FollowingType | FollowerType;
};

function FollowCard({ data }: PropsType) {
  const { followtype } = useParams();
  const currentUser = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<FollowUserType | undefined>();
  const [isFollowing, setisFollowing] = useState<boolean>(false);
  const { data: currUserFollowings } = useGetFollowings({
    username: currentUser.username,
  });

  const extractUserData = (): void => {
    let extracted: FollowUserType;
    if (followtype === 'followings') {
      extracted = (data as FollowingType).followingUser;
    } else {
      extracted = (data as FollowerType).followerUser;
    }

    setUserData(extracted);
  };

  const checkIsFollowing = (): void => {
    if (currUserFollowings && userData && currUserFollowings.length > 0) {
      const match = currUserFollowings.find(
        (following) =>
          following.followingUser.username.toLowerCase() === userData.username
      );
      setisFollowing(!!match);
    } else if (currUserFollowings && currUserFollowings.length === 0) {
      setisFollowing(false);
    }
  };

  const { mutate: followUser, isSuccess: followSuccess } = useFollow({});
  const { mutate: unfollowUser, isSuccess: unfollowSuccess } = useUnfollow({});

  useEffect(() => {
    extractUserData();
    checkIsFollowing();
  }, [followtype, currUserFollowings, data, unfollowSuccess, followSuccess]);

  const clickAction = () => {
    if (!isFollowing && userData) {
      followUser({ userToFollowId: userData.id });
    } else if (userData) {
      unfollowUser(userData.id);
    }
  };

  return (
    <Box mt={2}>
      <Flex py={4} px={8}>
        {userData && (
          <ProfileView
            name={userData?.name}
            profilePic={userData?.profilePic || undefined}
            username={userData?.username}
          />
        )}

        {userData?.username.toLowerCase() !==
          currentUser.username.toLowerCase() && (
          <AppButton
            text={isFollowing ? 'Unfollow' : 'Follow'}
            action={() => {
              clickAction();
            }}
          />
        )}
      </Flex>

      <Divider borderColor="blackAlpha.400" />
    </Box>
  );
}

export default FollowCard;
