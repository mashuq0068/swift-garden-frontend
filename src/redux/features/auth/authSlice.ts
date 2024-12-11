import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  name: string | null;
  email: string | null;
  role: string | null;
}
const initialState: IUser = {
  name: null,
  email: null,
  role: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    logout : (state) => {
        state.name = null;
        state.email = null
        state.role = null
    }
  },
});

export const { setUser , logout } = authSlice.actions;
export default authSlice.reducer;
