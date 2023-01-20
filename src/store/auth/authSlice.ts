import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type typeStatus = "checking" | "authenticated" | "not-authenticated";
interface Iuser {
  name: string;
  uid: string;
  // id: string;
  // email: string;
}
interface IauthState {
  status: typeStatus;
  user: Iuser;
  errorMessage: string | null;
}

const initialState: IauthState = {
  status: "checking",
  user: {} as Iuser,
  errorMessage: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {} as Iuser;
      state.errorMessage = null;
    },
    onLogin: (state, action: PayloadAction<Iuser>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout: (state, action: PayloadAction<string | null>) => {
      state.status = "not-authenticated";
      state.user = {} as Iuser;
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
