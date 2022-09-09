import { FiEdit } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { Task as TaskInterface } from "../../context/interfacesContext";
import { dateFormat } from "../../helpers/dateFormat";
import { useProjects } from "../../hooks";
import { useEffect } from "react";

export const Task = ({
  name,
  description,
  priority,
  id,
  date,
  state,
}: TaskInterface) => {
  const { handleEditTask, handleModalDeleteTask } = useProjects();

  const TaskObject: TaskInterface = {
    name,
    description,
    priority,
    id,
    date,
    state,
  };
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">
      <div className="w-5/6">
        <p className="text-xs  font-semibold mb-2">
          Name:{" "}
          <span className="text-gray-600 text-base font-normal  block">
            {name}
          </span>
        </p>
        <p className="text-xs  font-semibold mb-2">
          Description:{" "}
          <span className="text-gray-600 text-base font-normal  block">
            {description}
          </span>{" "}
        </p>
        <p className="text-xs  font-semibold mb-2">
          Delivery Date:{" "}
          <span className="text-gray-600 text-base font-normal  block">
            {dateFormat(date)}
          </span>{" "}
        </p>
        <p className="text-xs  font-semibold mb-2">
          Priority:{" "}
          <span className="text-gray-600 text-base font-normal block">
            {priority}
          </span>{" "}
        </p>
      </div>
      <div className="flex md:flex-col gap-2">
        <button
          type="button"
          className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 transition-colors"
          onClick={() => handleEditTask(TaskObject)}
        >
          <p className="hidden md:flex">Edit</p>

          <FiEdit className="text-xl" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-red-600 hover:bg-red-800 transition-colors"
          onClick={() => handleModalDeleteTask(TaskObject)}
        >
          <p className="hidden md:flex">Delete</p>

          <HiTrash className="text-xl" />
        </button>

        {state ? (
          <button
            type="button"
            className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-lime-600 hover:bg-lime-800 transition-colors"
          >
            <p className="hidden md:flex">Complete</p>

            <BsCheck className="text-2xl" />
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center  justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition-colors"
          >
            <p className="hidden md:flex">Incomplete</p>

            <GrFormClose className="text-xl " />
          </button>
        )}
      </div>
    </div>
  );
};
