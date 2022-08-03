import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTap: 'bookmarks',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentTap: (state, action) => {
      state.currentTap = action.payload;
    },
  },
});

export const getCurrentTap = (state) => state.user.currentTap;

export const { updateCurrentTap } = userSlice.actions;
export default userSlice.reducer;
