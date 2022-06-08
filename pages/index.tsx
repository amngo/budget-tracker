import { RootState } from "app/store";
import ExpensesChart from "components/Charts/ExpensesChart";
import HistoryChart from "components/Charts/HistoryChart";
import IncomeChart from "components/Charts/IncomeChart";
import Hero from "components/Hero";
import Header from "components/Layout";
import Modal from "components/Modal";
import Transactions from "components/Transactions";
import { getSession } from "features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "supabaseClient";

function Home() {
  const { session } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSession());
    supabase.auth.onAuthStateChange((event, sessionData) => {
      console.log({ event, sessionData });
      dispatch(getSession());
    });
  }, [dispatch]);

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <Header />
      <Modal />

      {session ? (
        <div className="container flex flex-col h-full p-4 space-y-4 sm:p-8 sm:space-y-8 xl:space-y-0 xl:flex-row xl:items-center xl:justify-center xl:space-x-8">
          <div className="flex flex-col space-y-4 sm:space-y-8 xl:max-w-1/2">
            <div className="flex justify-around sm:space-x-8 xl:justify-start xl:space-x-8">
              <IncomeChart />
              <ExpensesChart />
            </div>
            <HistoryChart />
          </div>
          <Transactions />
        </div>
      ) : (
        <Hero />
      )}
    </div>
  );
}

export default Home;
