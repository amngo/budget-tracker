import { AppDispatch, RootState } from "app/store";
import { logout } from "features/auth/authThunk";
import { nextDate, prevDate } from "features/date/dateSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSelector((state: RootState) => state.auth);
  const { currentDate } = useSelector((state: RootState) => state.date);
  return (
    <header className="sticky top-0 z-10 w-full bg-neutral text-neutral-content">
      <div className="container flex items-center justify-between py-2">
        <button type="button" className="w-1/4 btn btn-ghost">
          Money Logger
        </button>
        {session ? (
          <div className="flex items-center justify-center w-1/2">
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => dispatch(prevDate())}
              >
                «
              </button>
              <button type="button" className="btn">
                {currentDate}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => dispatch(nextDate())}
              >
                »
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="w-1/4 text-right">
          {session ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dispatch(logout())}
            >
              Sign out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
