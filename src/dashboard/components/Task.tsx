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
    <div className="rounded-lg shadow-sm p-4 flex flex-col justify-between items-center bg-white w-60">
      <div>
        <p className="text-xs  font-semibold mb-1 flex gap-2">{name}</p>
        <hr />
        <p className="text-xs mb-1">{description}</p>
        <hr />
        <p className="text-xs  mb-1">{dateFormat(date)}</p>
        <hr />
        <p className="text-xs flex gap-2 font-semibold mb-1">
          Priority:{" "}
          <span className="text-gray-600 font-normal block">{priority}</span>{" "}
        </p>
        {state && (
          <p className="text-xs text-green-500 mb-1">
            Completed by:{" "}
            <span className="font-semibold capitalize ">{completed?.name}</span>
          </p>
        )}
      </div>
      <div className="flex  gap-2">
        {admin && (
          <>
            <button
              type="button"
              className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 "
              onClick={() => handleEditTask(TaskObject)}
            >
              <FiEdit className="text-xl" />
            </button>
            <button
              type="button"
              className="flex items-center justify-between delay-100 w-full cursor-pointer transition-all  p-2 rounded-full text-white bg-red-600 hover:bg-red-800 "
              onClick={() => handleModalDeleteTask(TaskObject)}
            >
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
