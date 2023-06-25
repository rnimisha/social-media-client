import { UserDetailType } from '@/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserDetailType = {
  id: 0,
  email: '',
  username: '',
  name: '',
  createdAt: new Date(),
  profilePic: '',
  coverPic: '',
  followerCount: 0,
  followingCount: 0,
  postCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetailType>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
