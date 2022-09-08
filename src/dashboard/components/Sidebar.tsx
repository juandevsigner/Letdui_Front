import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineWavingHand } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../hooks";

export const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <div className="flex items-center gap-2">
        <p className="text-xl capitalize font-semibold">HI {auth?.name}!</p>
        <MdOutlineWavingHand className="text-2xl" />
      </div>

      <Link
        className="bg-indigo-600 justify-between flex items-center mt-5 rounded-full py-2 px-4 text-white hover:bg-indigo-800 transition-colors delay-75"
        to="new-project"
      >
        <p>New Project</p>

        <IoIosArrowForward className="text-xl" />
      </Link>
    </aside>
  );
};
