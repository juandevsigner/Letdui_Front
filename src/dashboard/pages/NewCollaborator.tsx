import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormCollaborator } from "../components";
import { useProjects } from "../../hooks";
import { Spinner } from "../../ui";

export const NewCollaborator = () => {
  const params = useParams();
  const { getProject, project, collaborator, addCollaborator } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  return (
    <>
      <h1 className=" text-xl  text-center">
        Add Collaborator to project:{" "}
        <span className="font-semibold">{project?.name}</span>
      </h1>
      <div className="mt-10 flex justify-center">
        <FormCollaborator />
      </div>

      <div className="flex justify-center mt-5">
        <div className="py-10 px-5 md:w-1/2">
          <h2 className="text-center mb-5 text-xl font-semibold">Result:</h2>
          <div className="flex flex-col justify-between items-center">
            <div className="flex gap-5 justify-between ">
              <p>
                Name:{" "}
                <span className="font-semibold capitalize">
                  {collaborator?.name}
                </span>
              </p>
            </div>

            <button
              onClick={() => addCollaborator({ email: collaborator?.email })}
              className="mt-7 delay-100 w-full cursor-pointer transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800"
            >
              Add to Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
