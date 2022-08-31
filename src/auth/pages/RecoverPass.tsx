import React from "react";
import { Link } from "react-router-dom";

export const RecoverPass = () => {
  return (
    <div>
      <h1 className="text-indigo-700 text-2xl capitalize text-center">
        Recover <span className="font-semibold">your password</span>
      </h1>
      <form className="my-5 bg-white shadow-sm p-10 rounded-lg">
        <input
          className="capitalize p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Enter your email"
          type="email"
        />

        <div>
          <input
            className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-lg mt-5"
            type="submit"
            value="Send Instructions"
          />
        </div>
      </form>
      <nav className="text-center">
        <Link
          className="text-slate-500 text-sm  md:text-base hover:text-indigo-600 "
          to="/"
        >
          Do you have an account? Login
        </Link>
      </nav>
    </div>
  );
};
