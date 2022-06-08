import { Entry } from "models";
import moment from "moment";
import React from "react";
import TransactionItem from "./TransactionItem";

interface Props {
  date: string;
  entries: Entry[];
}

function TransactionGroup({ entries, date }: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="flex items-center space-x-2 text-sm">
        <span className="badge badge-sm badge-accent">
          {moment(date, "MMM D").format("ddd")}
        </span>
        <span>{date}</span>
      </h1>
      <div>
        {entries.map((entry: Entry) => (
          <TransactionItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default TransactionGroup;
