/* eslint-disable jsx-a11y/label-has-associated-control */
import { AppDispatch, RootState } from "app/store";
import { expenseCategories, incomeCategories } from "data";
import { addEntry } from "features/entry/entryThunk";
import { closeModal } from "features/modal/modalSlice";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface InputProps {
  entry_type: string;
  date: string;
  account: string;
  category: string;
  amount: any;
  title: string;
}
const initialState = {
  entry_type: "income",
  date: moment().format("YYYY-MM-DDTHH:mm"),
  account: "cash",
  category: "Food & Drinks",
  amount: "",
  title: "",
};

function Input() {
  const [value, setValue] = useState<InputProps>(initialState);
  const { open } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue({ ...initialState, date: moment().format("YYYY-MM-DDTHH:mm") });
  }, [open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountType = (accountType: string) => {
    setValue({ ...value, account: accountType });
  };

  const handleEntryType = (entry_type: string) => {
    setValue({ ...value, entry_type });
  };

  const handleClear = () => {
    setValue(initialState);
  };

  const handleSubmit = () => {
    dispatch(
      addEntry({
        ...value,
        date: moment(value.date).format("YYYY-MM-DDTHH:mmZ"),
      }),
    );
    dispatch(closeModal());
  };

  return (
    <div>
      <h1 className="text-2xl">New Entry</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <div>
            <label htmlFor="date" className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              placeholder=""
              value={value.date}
              onChange={handleChange}
              className="w-[250px] max-w-xs input input-sm input-bordered"
            />
          </div>
          <div>
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder=""
              value={value.title}
              onChange={handleChange}
              maxLength={20}
              className="w-[250px] max-w-xs input input-sm input-bordered"
            />
          </div>
          <div>
            <label htmlFor="type" className="label">
              <span className="label-text">Entry Type</span>
            </label>
            <div className="btn-group">
              <button
                type="button"
                className={`btn btn-xs ${
                  value.entry_type === "income" ? "btn-active" : ""
                }`}
                onClick={() => handleEntryType("income")}
              >
                Income
              </button>
              <button
                type="button"
                className={`btn btn-xs ${
                  value.entry_type === "expense" ? "btn-active" : ""
                }`}
                onClick={() => handleEntryType("expense")}
              >
                Expense
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="account" className="label">
              <span className="label-text">Account</span>
            </label>
            <div className="btn-group" id="account">
              <button
                type="button"
                className={`btn btn-xs ${
                  value.account === "cash" ? "btn-active" : ""
                }`}
                onClick={() => handleAccountType("cash")}
              >
                Cash
              </button>
              <button
                type="button"
                className={`btn btn-xs ${
                  value.account === "debit" ? "btn-active" : ""
                }`}
                onClick={() => handleAccountType("debit")}
              >
                Debit
              </button>
              <button
                type="button"
                className={`btn btn-xs ${
                  value.account === "credit" ? "btn-active" : ""
                }`}
                onClick={() => handleAccountType("credit")}
              >
                Credit
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              id="category"
              placeholder=""
              value={value.category}
              onChange={handleChange}
              className="w-[250px] max-w-xs select select-primary select-sm"
            >
              {value.entry_type === "income"
                ? incomeCategories.map((category: string) => (
                    <option key={category}>{category}</option>
                  ))
                : expenseCategories.map((category: string) => (
                    <option key={category}>{category}</option>
                  ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="amount" className="label">
              <span className="label-text">Amount</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="amount"
                id="amount"
                placeholder="0.00"
                value={value.amount}
                onChange={handleChange}
                className="w-[250px] max-w-xs input input-sm input-bordered"
              />
              <span>USD</span>
            </label>
          </div>
        </div>

        <div className="space-x-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
