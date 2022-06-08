import { RootState } from "app/store";
import { colors, incomeCategories } from "data";
import { Entry } from "models";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const options = {
  maintainAspectRatio: false,
  cutout: "75%",
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

function IncomeChart() {
  const entries = useSelector((state: RootState) => state.entries.value);
  const incomeTotal = entries.reduce((acc, entry: Entry) => {
    return acc + (entry.entry_type === "income" ? entry.amount : 0);
  }, 0);
  const dict = Object.fromEntries(
    incomeCategories.map((category: string) => [category, 0]),
  );

  entries.forEach((entry: Entry) => {
    if (entry.entry_type === "income") dict[entry.category] += entry.amount;
  });

  const keys = Object.keys(dict);
  const values = Object.values(dict);

  return (
    <div className="relative w-[175px] h-[175px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[300px] xl:h-[300px] bg-base-200 rounded-3xl">
      <Doughnut
        options={options}
        data={{
          labels: keys,
          datasets: [
            {
              label: "Chart",
              data: values,
              backgroundColor: colors,
              borderWidth: 0,
              spacing: 0,
              hoverOffset: 10,
            },
          ],
        }}
      />
      <div className="absolute text-lg font-bold text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <h1 className="text-sm sm:text-base md:text-xl lg:text-3xl xl:text-2xl">
          Income
        </h1>
        <span className="text-xs text-green-500 sm:text-sm md:text-lg lg:text-xl">
          {incomeTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
}

export default IncomeChart;
