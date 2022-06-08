import { Entry } from "models";
import moment from "moment";
import React from "react";

interface Props {
  entry: Entry;
}

function ViewEntry({ entry }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">
        {moment(entry.date).format("M/D/YYYY, h:mm A")}
      </h1>
    </div>
  );
}

export default ViewEntry;
