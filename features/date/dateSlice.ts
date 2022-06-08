import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface DateState {
  currentDate: string;
}

const initialState: DateState = {
  currentDate: moment().format("MMM YYYY"),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    prevDate: (state) => {
      state.currentDate = moment(state.currentDate, "MMM YYYY")
        .subtract(1, "months")
        .format("MMM YYYY");
    },
    nextDate: (state) => {
      state.currentDate = moment(state.currentDate, "MMM YYYY")
        .add(1, "months")
        .format("MMM YYYY");
    },
  },
});

export const { prevDate, nextDate } = dateSlice.actions;

export default dateSlice.reducer;
