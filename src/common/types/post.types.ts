export type PostImageType = {
  id: number;
  basename: string;
  postId: number;
};

export type LikeType = {
  id: number;
  userId: number;
  postId: number;
};

export type CommentType = {
  id: number;
  userId: number;
  postId: number;
  description: string;
  createdAt: Date;
};

export type AuthorType = {
  name: string;
  username: string;
  profilePic: string;
};

export type FeedPostType = {
  id: number;
  description: string;
  createdAt: Date | string;
  userId: number;
  images: PostImageType[];
  likes: LikeType[];
  comments: CommentType[];
  author?: AuthorType;
};
