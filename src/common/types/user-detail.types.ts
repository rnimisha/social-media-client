export type UserDetailType = {
  id: number;
  email: string;
  username: string;
  name: string;
  createdAt: Date;
  profilePic: string;
  coverPic: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
};

export default UserDetailType;
