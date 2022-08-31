import React from "react";
import { Link } from "react-router-dom";

export const NewPass = () => {
  return (
    <div>
      <h1 className="text-indigo-700 text-2xl capitalize text-center">
        Create <span className="font-semibold">a new password</span>
      </h1>
      <form className="my-5 bg-white shadow-sm p-10 rounded-lg">
        <input
          className="capitalize p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="New password"
          type="password"
        />
        <input
          className="capitalize p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Repeat password"
          type="password"
        />
        <div>
          <input
            className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-lg mt-5"
            type="submit"
            value="Create New Password"
          />
        </div>
      </form>
    </div>
  );
};
