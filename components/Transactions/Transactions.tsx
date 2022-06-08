import Filters from "components/Filters";
import { openModal } from "features/modal/modalSlice";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Search from "./Search";
import TransactionList from "./TransactionList";

function Transactions() {
  const dispatch = useDispatch();
  return (
    <div className="p-8 space-y-4 bg-base-200 rounded-3xl xl:min-w-[500px] h-[800px] flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Transactions</h1>
        <button
          type="button"
          className="gap-2 btn btn-sm"
          onClick={() =>
            dispatch(openModal({ path: "components/Input", props: {} }))
          }
        >
          <FaPlus className="w-4 h-4" />
          New Entry
        </button>
      </div>
      <Filters />
      <Search />
      <TransactionList />
    </div>
  );
}

export default Transactions;
