import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { FiEdit } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdPersonAddAlt1, MdOutlineTask } from "react-icons/md";
import { useProjects, useAdmin } from "../../hooks";
import { Alert, Spinner } from "../../ui";
import {
  Task,
  ModalTask,
  Collaborator,
  ModalDeleteCollaborator,
} from "../components";
import {
  Task as TaskInterface,
  Collaborator as CollaboratorInt,
} from "../../context/interfacesContext";
import ModalDeleteTask from "../components/ModalDeleteTask";

let socket: any;

export const Project = () => {
  const params = useParams();

  const {
    project,
    getProject,
    load,
    handleModalTask,
    error,
    msg,
    submitTaskProject,
    deleteTaskProject,
    editTaskProject,
    newStateProject,
  } = useProjects();

  const admin = useAdmin();
  useEffect(() => {
    getProject(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open project", params.id);
  }, []);

  useEffect(() => {
    socket.on("task add", (task: any) => {
      if (task.project === project._id) {
        submitTaskProject(task);
      }
    });
    socket.on("task deleted", (task: any) => {
      if (task.project === project._id) {
        deleteTaskProject(task);
      }
    });

    socket.on("up task", (task: any) => {
      if (task.project._id === project._id) {
        editTaskProject(task);
      }
    });

    socket.on("new state", (task: any) => {
      if (task.project._id === project._id) {
        newStateProject(task);
      }
    });

    return () => {
      socket.off("tarea agregada");
      socket.off("tarea eliminada");
      socket.off("tarea actualizada");
      socket.off("tarea estado");
    };
  });

  if (load) return <Spinner />;

  return (
    <div className=" p-5">
      {msg.length !== 0 && <Alert error={error} msg={msg} />}
      <div className="flex justify-between items-center my-2">
        <div className="flex items-center">
          <HiOutlineChevronRight />
          <h1 className="text-sm md:text-xl text-gray-500">
            {project?.name} | {project?.client}
          </h1>
        </div>
        {admin && (
          <Link
            className="flex items-center gap-3 bg-indigo-600 py-2 px-5 rounded-full hover:bg-indigo-900 transition-colors delay-75 text-white"
            to={`/projects/edit/${params.id}`}
          >
            <p className="hidden md:inline">Edit</p>

            <FiEdit className="text-xl" />
          </Link>
        )}
      </div>
      <p className="text-xl font-semibold text-indigo-600 text-center mb-2">
        Task List
      </p>
      <div className="overflow-x-scroll w-full bar">
        {project?.tasks?.length ? (
          <div className="flex flex-col">
            <div className="flex gap-2">
              {project?.tasks.map((task: TaskInterface) => (
                <Task
                  key={task._id}
                  name={task.name}
                  date={task.deliveryDate}
                  id={task._id}
                  description={task.description}
                  priority={task.priority}
                  state={task.state}
                  completed={task.completed}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <FaRegSadCry className="text-4xl text-indigo-600" />
            <p className="text-xl text-indigo-600 text-center mb-2">
              No homework here!
            </p>
            <p>Add a Task </p>
          </div>
        )}
      </div>
      {admin && (
        <>
          <div className="fixed  right-10 bottom-6">
            <button
              className=" flex items-center delay-100 transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800  gap-1 hover:gap-2"
              type="button"
              onClick={handleModalTask}
            >
              <p className="hidden md:inline">Create Task</p>
              <BsPlus className="text-2xl hidden md:inline" />
              <MdOutlineTask className="inline md:hidden text-2xl" />
            </button>
          </div>
          <div className="fixed  right-28 md:right-52 bottom-6">
            <Link
              className=" flex items-center delay-100 transition-all px-5 py-3 rounded-full text-white bg-orange-600 hover:bg-orange-800  gap-1 hover:gap-2"
              to={`/projects/new-collaborator/${project._id}`}
            >
              <p className="hidden md:inline">Add Collaborator</p>

              <BsPlus className="text-2xl hidden md:inline" />
              <MdPersonAddAlt1 className="inline md:hidden text-2xl" />
            </Link>
          </div>
        </>
      )}
      {admin && (
        <div className="overflow-x-scroll w-full bar">
          {project?.collaborators?.length ? (
            <>
              <p className="text-center mt-3">Collaborators</p>

              <div className="flex gap-2 shadow-sm rounded-lg mt-2">
                {project.collaborators?.map((collaborator: CollaboratorInt) => (
                  <Collaborator
                    key={collaborator._id}
                    collaborator={collaborator}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center">
              No collaborators yet - Add a Collaborator
            </p>
          )}
        </div>
      )}

      <ModalTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </div>
  );
};
