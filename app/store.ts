import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import dateReducer from "features/date/dateSlice";
import entriesReducer from "features/entry/entrySlice";
import modalReducer from "features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    entries: entriesReducer,
    auth: authReducer,
    modal: modalReducer,
    date: dateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
