import { AuthType } from '@/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthType = {
  username: '',
  access_token: '',
  refresh_token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthType>) => {
      const { access_token, refresh_token, username } = action.payload;
      return {
        ...state,
        access_token,
        refresh_token,
        username,
      };
    },
    logout: (state, _) => ({
      ...state,
      access_token: '',
      refresh_token: '',
      username: '',
    }),
  },
});

export const { setAuthData, logout } = authSlice.actions;

export default authSlice.reducer;
