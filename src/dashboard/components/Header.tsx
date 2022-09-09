import React from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

export const Header = () => {
  return (
    <header className="px-4 py-5  shadow-sm">
      <div className="flex justify-between md:items-center">
        <h2 className="text-xl text-indigo-600 font-semibold ">Letdui APP</h2>
        <input
          type="seacrh"
          placeholder="Find a project"
          className="rounded-full p-2 lg:w-96 block border border-indigo-200"
        />
        <div className="flex items-center gap-4">
          <Link
            className="font-semibold  text-indigo-500 hover:text-indigo-800 transition-colors"
            to="/projects"
          >
            Projects
          </Link>
          <button className="rounded-full  hover:bg-gray-400 hover:text-gray-100 p-2 flex items-center gap-2 transition-colors delay-75">
            Logout
            <IoMdExit className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};
