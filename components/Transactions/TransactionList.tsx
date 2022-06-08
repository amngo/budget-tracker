import { AppDispatch, RootState } from "app/store";
import Spinner from "components/Spinner";
import { getEntries } from "features/entry/entryThunk";
import { Entry } from "models";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionGroup from "./TransactionGroup";

function TransactionList() {
  const dispatch = useDispatch<AppDispatch>();
  const { value, filterType, loading } = useSelector(
    (state: RootState) => state.entries,
  );
  const { currentDate } = useSelector((state: RootState) => state.date);
  const groupedDates: { [key: string]: Entry[] } = {};

  value.forEach((entry) => {
    if (
      filterType.localeCompare(entry.entry_type) === 0 ||
      filterType === "all"
    ) {
      const date = moment(entry.date, "YYYY-MM-DDTHH:mm").format("MMM D");
      if (date in groupedDates) {
        groupedDates[date].push(entry);
      } else {
        groupedDates[date] = [];
        groupedDates[date].push(entry);
      }
    }
  });

  useEffect(() => {
    dispatch(
      getEntries(moment(currentDate, "MMM YYYY").format("YYYY-MM-DDTHH:mm")),
    );
  }, [dispatch, currentDate]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return value.length !== 0 ? (
    <div className="flex flex-col space-y-4 overflow-y-auto">
      {Object.entries(groupedDates).map((group) => (
        <TransactionGroup key={group[0]} date={group[0]} entries={group[1]} />
      ))}
    </div>
  ) : (
    <div>No entries found</div>
  );
}
export default TransactionList;
