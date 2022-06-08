import { RootState } from "app/store";
import Spinner from "components/Spinner";
import { Entry } from "models";
import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getDaysOfMonth } from "utils";

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: any) => {
          return `$${value}`;
        },
        color: "rgb(166, 173, 186)",
      },
    },
    x: {
      ticks: {
        color: "rgb(166, 173, 186)",
      },
      grid: {
        display: false,
      },
    },
  },
};

function HistoryChart() {
  const currentDate = useSelector((state: RootState) => state.date.currentDate);
  const { value, month } = useSelector((state: RootState) => state.entries);

  const groupedExpenseEntries: { [key: string]: Entry[] } = Object.fromEntries(
    getDaysOfMonth(currentDate).map((day: string) => [day, []]),
  );

  const groupedIncomeEntries: { [key: string]: Entry[] } = Object.fromEntries(
    getDaysOfMonth(currentDate).map((day: string) => [day, []]),
  );

  if (currentDate.localeCompare(month) !== 0)
    return (
      <div className="relative p-6 bg-base-200 rounded-3xl h-[350px] w-full">
        <Spinner />
      </div>
    );

  value.forEach((entry: Entry) => {
    const date = moment(entry.date).format("MMM D");

    if (entry.entry_type === "expense") {
      groupedExpenseEntries[date].push(entry);
    } else {
      groupedIncomeEntries[date].push(entry);
    }
  });

  const accumulatedExpense = Object.fromEntries(
    Object.entries(groupedExpenseEntries).map(([date, entries]) => {
      return [
        date,
        entries.reduce((acc, entry: Entry) => {
          return acc + entry.amount;
        }, 0),
      ];
    }),
  );

  const accumulatedIncome = Object.fromEntries(
    Object.entries(groupedIncomeEntries).map(([date, entries]) => {
      return [
        date,
        entries.reduce((acc, entry: Entry) => {
          return acc + entry.amount;
        }, 0),
      ];
    }),
  );

  return (
    <div className="relative p-6 bg-base-200 rounded-3xl h-[350px] w-full">
      <Line
        options={options}
        data={{
          labels: Object.keys(accumulatedExpense).reverse(),
          datasets: [
            {
              label: "Expenses",
              data: Object.values(accumulatedExpense).reverse(),
              backgroundColor: "rgb(255, 77, 109)",
              borderColor: "rgb(255, 77, 109)",
              pointRadius: 2,
              spanGaps: false,
            },
            {
              label: "Income",
              data: Object.values(accumulatedIncome).reverse(),
              backgroundColor: "rgb(87, 204, 153)",
              borderColor: "rgb(87, 204, 153)",
              pointRadius: 2,
              spanGaps: false,
            },
          ],
        }}
      />
    </div>
  );
}

export default HistoryChart;
