import { FiEdit } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { Task as TaskInterface } from "../../context/interfacesContext";
import { dateFormat } from "../../helpers/dateFormat";
import { useProjects, useAdmin } from "../../hooks";

export const Task = ({
  name,
  description,
  priority,
  id,
  date,
  state,
  completed,
}: TaskInterface) => {
  const { handleEditTask, handleModalDeleteTask, completeTask } = useProjects();

  const admin = useAdmin();

  const TaskObject: TaskInterface = {
    name,
    description,
    priority,
    id,
    date,
    state,
    completed,
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
        {state && (
          <p className="text-xs text-green-500">
            Completed by:{" "}
            <span className="font-semibold capitalize ">{completed.name}</span>
          </p>
        )}
      </div>
      <div className="flex md:flex-col gap-2">
        {admin && (
          <>
            <button
              type="button"
              className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 "
              onClick={() => handleEditTask(TaskObject)}
            >
              <p className="hidden md:flex">Edit</p>

              <FiEdit className="text-xl" />
            </button>
            <button
              type="button"
              className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-red-600 hover:bg-red-800 "
              onClick={() => handleModalDeleteTask(TaskObject)}
            >
              <p className="hidden md:flex">Delete</p>

              <HiTrash className="text-xl" />
            </button>
          </>
        )}

        <button
          onClick={() => completeTask(TaskObject.id)}
          type="button"
          className={` ${
            state
              ? "bg-lime-600 hover:bg-lime-800"
              : "bg-gray-500 hover:bg-gray-700"
          } flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white  `}
        >
          <p className="hidden md:flex">{state ? "Complete" : "Incomplete"}</p>
          {state ? (
            <BsCheck className="text-white text-xl" />
          ) : (
            <GrFormClose className="text-white text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};
