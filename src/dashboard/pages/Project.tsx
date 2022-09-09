import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useProjects } from "../../hooks";
import { Alert, Spinner } from "../../ui";
import ModalTask from "../components/ModalTask";
import { Task } from "../components";
import { Task as TaskInterface } from "../../context/interfacesContext";
import ModalDeleteTask from "../components/ModalDeleteTask";

export const Project = () => {
  const params = useParams();

  const { project, getProject, load, handleModalTask, error, msg } =
    useProjects();
  useEffect(() => {
    getProject(params.id);
  }, []);

  if (load) return <Spinner />;

  return (
    <div className="h-screen">
      {msg.length !== 0 && <Alert error={error} msg={msg} />}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <HiOutlineChevronRight />
          <h1 className=" md:text-xl text-gray-500">
            {project?.name} | {project?.client}
          </h1>
        </div>

        <Link
          className="flex items-center gap-3 bg-indigo-600 py-2 px-5 rounded-full hover:bg-indigo-900 transition-colors delay-75 text-white"
          to={`/projects/edit/${params.id}`}
        >
          Edit
          <FiEdit className="text-xl" />
        </Link>
      </div>
      <div className="bg-white p-2  rounded-lg shadow-sm">
        {project?.tasks?.length ? (
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-indigo-600 text-center mb-5">
              Task List
            </p>
            {project?.tasks.map((task: TaskInterface) => (
              <Task
                key={task._id}
                name={task.name}
                date={task.deliveryDate}
                id={task._id}
                description={task.description}
                priority={task.priority}
                state={task.state}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <FaRegSadCry className="text-4xl text-indigo-600" />
            <p className="text-xl text-indigo-600 text-center mb-2">
              No homework here!
            </p>
            <p>Add a Task - click on button "Create Task" </p>
          </div>
        )}
      </div>
      <div className="fixed  right-10 bottom-6">
        <button
          className=" flex items-center delay-100 transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 transition-colors gap-1 hover:gap-2"
          type="button"
          onClick={handleModalTask}
        >
          <p>Create Task</p>
          <BsPlus className="text-2xl" />
        </button>
      </div>
      <ModalTask />
      <ModalDeleteTask />
    </div>
  );
};
