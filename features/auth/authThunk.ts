import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "supabaseClient";

export const login = createAsyncThunk("auth/login", async () => {
  const { error } = await supabase.auth.signIn({ provider: "google" });
  if (error) throw new Error(error.message);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
});
