export type FollowUserType = {
  id: number;
  username: string;
  profilePic: string | null;
  name: string;
};

export type FollowingType = {
  id: number;
  followingUser: FollowUserType;
};

export type FollowerType = {
  id: number;
  followerUser: FollowUserType;
};
