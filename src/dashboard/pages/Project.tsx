import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import { FiEdit } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
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
    <div className="h-screen">
      {msg.length !== 0 && <Alert error={error} msg={msg} />}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <HiOutlineChevronRight />
          <h1 className=" md:text-xl text-gray-500">
            {project?.name} | {project?.client}
          </h1>
        </div>
        {admin && (
          <Link
            className="flex items-center gap-3 bg-indigo-600 py-2 px-5 rounded-full hover:bg-indigo-900 transition-colors delay-75 text-white"
            to={`/projects/edit/${params.id}`}
          >
            Edit
            <FiEdit className="text-xl" />
          </Link>
        )}
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
                completed={task.completed}
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
      {admin && (
        <>
          <div className="fixed  right-10 bottom-6">
            <button
              className=" flex items-center delay-100 transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800  gap-1 hover:gap-2"
              type="button"
              onClick={handleModalTask}
            >
              <p>Create Task</p>
              <BsPlus className="text-2xl" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p>Collaborators</p>
            <Link
              className=" delay-100 transition-all px-5 py-3 rounded-full text-white bg-orange-600 hover:bg-orange-800  gap-1 hover:gap-2"
              to={`/projects/new-collaborator/${project._id}`}
            >
              Add
            </Link>
          </div>
        </>
      )}
      {admin && (
        <>
          {project?.collaborators?.length ? (
            <div className="bg-white shadow-sm rounded-lg mt-5 ">
              {project.collaborators?.map((collaborator: CollaboratorInt) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))}
            </div>
          ) : (
            <p>
              No collaborators yet - Add a Collaborator - click on button "Add"
            </p>
          )}
        </>
      )}

      <ModalTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </div>
  );
};
