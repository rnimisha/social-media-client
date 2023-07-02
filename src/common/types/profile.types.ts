export type ProfileType = {
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

export type UpdateProfileResType = {
  id: number;
  email: string;
  username: string;
  name: string;
  profilePic: string;
  coverPic: string;
  updatedAt?: Date;
};
