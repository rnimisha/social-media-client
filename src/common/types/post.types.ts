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
type CommentByType = {
  name: string;
  username: string;
  profilePic: string;
};

export type CommentType = {
  id: number;
  userId: number;
  postId: number;
  description: string;
  createdAt: Date;
  commentBy?: CommentByType;
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

export type NewPostType = {
  id: number;
  description: string;
  createdAt: Date | string;
  userId: number;
  images: PostImageType[];
};
