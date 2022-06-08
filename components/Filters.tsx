import { AppDispatch, RootState } from "app/store";
import { setFilter } from "features/entry/entrySlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Filters() {
  const dispatch = useDispatch<AppDispatch>();
  const filterType = useSelector(
    (state: RootState) => state.entries.filter_type,
  );

  const handleClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="tabs">
      <button
        type="button"
        className={`tab tab-bordered ${
          filterType === "all" ? "tab-active" : ""
        }`}
        onClick={() => handleClick("all")}
      >
        All
      </button>
      <button
        type="button"
        className={`tab tab-bordered ${
          filterType === "income" ? "tab-active" : ""
        }`}
        onClick={() => handleClick("income")}
      >
        Income
      </button>
      <button
        type="button"
        className={`tab tab-bordered ${
          filterType === "expense" ? "tab-active" : ""
        }`}
        onClick={() => handleClick("expense")}
      >
        Expenses
      </button>
    </div>
  );
}

export default Filters;
