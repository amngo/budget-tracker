import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "models";
import moment from "moment";
import { addEntry, deleteEntry, getEntries } from "./entryThunk";

interface EntriesState {
  value: Entry[];
  error: any;
  loading: boolean;
  filterType: string;
  month: string;
}

const initialState: EntriesState = {
  value: [],
  error: {},
  loading: false,
  filterType: "all",
  month: moment().format("MMM YYYY"),
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addEntry.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(addEntry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getEntries.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.month = action.payload.month;
        state.value = action.payload.entries;
      },
    );
    builder.addCase(getEntries.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteEntry.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteEntry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { setFilter } = entriesSlice.actions;

export default entriesSlice.reducer;
