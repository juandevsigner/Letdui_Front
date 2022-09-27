import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { useProjects } from "../../hooks";
import { FormProject, ModalDeleteProject } from "../components";
import axiosClient from "../../config/axiosClient";

export const EditProject = () => {
  const params = useParams();
  const { project, getProject, deleteProject, handleModalDeleteProject } =
    useProjects();
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
      <div className="flex justify-between md:justify-center items-center md:gap-6  p-5">
        <h1 className="text-xl text-center  text-indigo-600">
          Edit Project:{" "}
          <span className="font-normal text-gray-500">{project?.name}</span>
        </h1>
        <button
          type="button"
          className="flex items-center gap-3 bg-red-600 py-2 px-5 rounded-full hover:bg-red-900 transition-colors delay-75 text-white"
          onClick={handleModalDeleteProject}
        >
          <p className="hidden md:inline">Delete Project</p>

          <HiTrash className="text-xl" />
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
      <ModalDeleteProject id={project._id} />
    </>
  );
};
