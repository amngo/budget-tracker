import { createSlice } from "@reduxjs/toolkit";
import supabase from "supabaseClient";
import { login, logout } from "./authThunk";

interface AuthState {
  session: any;
  error: any;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getSession: (state) => {
      const session = supabase.auth.session();
      state.session = session;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.session = supabase.auth.session();
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.session = null;
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.session = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.session = null;
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { getSession } = authSlice.actions;

export default authSlice.reducer;
