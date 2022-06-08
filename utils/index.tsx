import moment from "moment";

export const getRandomColor = (): string => {
  return `#${`${Math.random().toString(16)}"0000000"`.slice(2, 8)}`;
};

export const getDaysOfMonth = (date: string): string[] => {
  let daysInMonth = moment(date, "MMM YYYY").daysInMonth();
  const arrDays = [];

  while (daysInMonth) {
    const current = moment(date, "MMM YYYY").date(daysInMonth);
    arrDays.push(current.format("MMM D"));
    daysInMonth -= 1;
  }

  return arrDays;
};
