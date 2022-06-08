import { AppDispatch } from "app/store";
import { expenseCategoryIcons } from "data";
import { deleteEntry } from "features/entry/entryThunk";
import { Entry } from "models";
import moment from "moment";
import React, { useState } from "react";
import { FaRegMoneyBillAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  entry: Entry;
}

function TransactionItem({ entry }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="flex items-center justify-between p-2 border-b border-b-base-300 hover:bg-base-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center w-2/3 space-x-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral tooltip tooltip-right"
          data-tip={entry.category}
        >
          {entry.entry_type === "income" ? (
            <FaRegMoneyBillAlt className="w-5 h-5" />
          ) : (
            expenseCategoryIcons[entry.category]
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-sm font-bold text-md">{entry.title}</span>
          <span className="text-xs">{moment(entry.date).format("h:mm A")}</span>
        </div>
      </div>
      <span className="flex justify-center w-1/6">
        <button
          type="button"
          className={`btn btn-ghost btn-sm ${hover ? "" : "hidden"}`}
          onClick={() => dispatch(deleteEntry(entry.id))}
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </span>
      <div className="flex flex-col items-end w-1/3 space-y-1 text-sm">
        <span
          className={`font-bold ${
            entry.entry_type === "income" ? "text-green-500" : "text-red-500"
          }`}
        >
          {entry.entry_type === "income" ? "+" : "-"}
          {entry.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <span className="badge badge-xs">{entry.account}</span>
      </div>
    </div>
  );
}

export default TransactionItem;
