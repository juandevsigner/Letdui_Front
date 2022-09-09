import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

interface ProjectProps {
  name: string;
  _id: string;
  client: string;
}

export const PreviewProject = ({ name, _id, client }: ProjectProps) => {
  return (
    <div className="border-b p-5 flex justify-between items-center ">
      <p className="font-semibold">
        {client}{" "}
        <span className="text-base text-indigo-500 font-light">| {name} </span>
      </p>

      <Link
        to={`${_id}`}
        className="flex items-center justify-between  text-indigo-600 hover:text-red-600 transition-all delay-75 gap-1 hover:gap-2"
      >
        View <IoIosArrowForward className="text-xl" />
      </Link>
    </div>
  );
};
