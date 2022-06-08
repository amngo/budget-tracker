import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import type { RootState } from "app/store";
import moment from "moment";
import supabase from "supabaseClient";

export const getEntries = createAsyncThunk(
  "entry/getEntries",
  async (date: string) => {
    const user: User | null = supabase.auth.user();

    const { data, error } = await supabase
      .from("entries")
      .select()
      .order("date", { ascending: false })
      .eq("user_id", user?.id)
      .gte("date", date)
      .lte(
        "date",
        moment(date, "YYYY-MM-DDTHH:mm")
          .endOf("month")
          .format("YYYY-MM-DDTHH:mm"),
      );

    if (error) {
      throw new Error(error.message);
    }

    return {
      entries: data,
      month: moment(date, "YYYY-MM-DDTHH:mm").format("MMM YYYY"),
    };
  },
);

export const addEntry = createAsyncThunk(
  "entry/addEntry",
  async (entry: {}, { dispatch, getState }) => {
    const user: User | null = supabase.auth.user();
    const state = getState() as RootState;

    const insert = {
      user_id: user?.id,
      ...entry,
    };

    const { error } = await supabase.from("entries").upsert(insert, {
      returning: "minimal",
    });

    if (error) {
      throw new Error(error.message);
    }

    dispatch(getEntries(state.date.currentDate));
  },
);

export const deleteEntry = createAsyncThunk(
  "entry/deleteEntry",
  async (id: number, { dispatch, getState }) => {
    const user: User | null = supabase.auth.user();
    const state = getState() as RootState;

    const { error } = await supabase
      .from("entries")
      .delete()
      .match({ id, user_id: user?.id });

    if (error) {
      throw new Error(error.message);
    }

    dispatch(getEntries(state.date.currentDate));
  },
);
