import { AuthType, TokenType } from '@/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthType = {
  name: '',
  access_token: '',
  refresh_token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<TokenType>) => {
      const { access_token, refresh_token } = action.payload;

      return {
        ...state,
        access_token,
        refresh_token,
      };
    },
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
