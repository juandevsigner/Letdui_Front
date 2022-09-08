import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { useProjects } from "../../hooks";
import { FormProject } from "../components";
import axiosClient from "../../config/axiosClient";

export const EditProject = () => {
  const params = useParams();
  const { project, getProject, deleteProject } = useProjects();
  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleClick = (id: string) => {
    //TODO:CAMBAIRL EL CONFIRM POR UN MODAL
    if (confirm("Remove Project? Really?")) {
      deleteProject(id);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl text-center font-bold text-indigo-600">
          Edit Project:{" "}
          <span className="font-normal text-gray-500">{project?.name}</span>
        </h1>
        <button
          type="button"
          className="flex items-center gap-3 bg-red-600 py-2 px-5 rounded-full hover:bg-red-900 transition-colors delay-75 text-white"
          onClick={() => handleClick(project._id)}
        >
          Delete Project
          <HiTrash className="text-xl" />
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};
