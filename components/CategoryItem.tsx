import React from "react";

const CIRCUMFERENCE = 24 * 2 * Math.PI;

interface Props {
  name: string;
  color: string;
  icon: JSX.Element;
  transactionCount: number;
  totalCost: number;
  budget: number;
}

function CategoryItem({
  name,
  color,
  icon,
  transactionCount,
  totalCost,
  budget,
}: Props) {
  return (
    <div className="flex items-center justify-between w-full py-1 bg-base-300">
      <div className="flex items-center space-x-2">
        <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
          <svg className="-rotate-90 w-14 h-14">
            <circle
              className="text-base-100"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r="24"
              cx="28"
              cy="28"
            />
            <circle
              className={color}
              strokeWidth="2"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={
                CIRCUMFERENCE - (totalCost / budget) * CIRCUMFERENCE
              }
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="24"
              cx="28"
              cy="28"
            />
          </svg>
          <span className={`absolute ${color}`}>{icon}</span>
        </div>
        <div className="flex flex-col">
          <h2>{name}</h2>
          <div className="text-xs text-base-content/60">
            {transactionCount} transactions
          </div>
        </div>
      </div>
      <div className="text-sm">
        ${totalCost} /{" "}
        <span className="text-2xs text-base-content/60">${budget}</span>
      </div>
    </div>
  );
}

export default CategoryItem;
