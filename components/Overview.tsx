import { RootState } from "app/store";
import { Entry } from "models";
import React from "react";
import { useSelector } from "react-redux";

function Overview() {
  const entries = useSelector((state: RootState) => state.entries.value);
  const incomeTotal = entries.reduce((acc, entry: Entry) => {
    return acc + (entry.entry_type === "income" ? entry.amount : 0);
  }, 0);
  const expenseTotal = entries.reduce((acc, entry: Entry) => {
    return acc + (entry.entry_type === "expense" ? entry.amount : 0);
  }, 0);

  return (
    <div className="grid w-full grid-cols-3 shadow stats">
      <div className="stat">
        <div className="stat-title">Income</div>
        <div className="text-green-500 stat-value">
          {incomeTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Expenses</div>
        <div className="text-red-500 stat-value">
          {expenseTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Total</div>
        <div
          className={`stat-value ${
            incomeTotal >= expenseTotal ? "text-green-500" : "text-red-500"
          }`}
        >
          {(incomeTotal - expenseTotal).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
    </div>
  );
}

export default Overview;
