import { AppDispatch } from "app/store";
import { login } from "features/auth/authThunk";
import React from "react";
import { useDispatch } from "react-redux";

function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="h-full p-2 m-auto">
      <div className="text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p>Please sign in to get started or retrieve your saved data.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(login())}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
