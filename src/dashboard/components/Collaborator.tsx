import { useProjects } from "../../hooks/useProjects";
import { HiTrash } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";

export const Collaborator = (collaborator: any) => {
  const { handleDeleteCollaborator } = useProjects();
  const { name, email } = collaborator.collaborator;

  return (
    <div className="p-2 mb-0 border-b flex flex-col justify-between items-center bg-white shadow-sm rounded-lg">
      <BsPersonCircle className="text-2xl" />
      <div className="text-center">
        <p className="capitalize"> {name}</p>
        <p className="text-xs text-gray-600"> {email}</p>
      </div>
      <div>
        <button
          className="bg-red-500 p-2 mt-1  rounded-full text-white"
          type="button"
          onClick={() => handleDeleteCollaborator(collaborator.collaborator)}
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
};
