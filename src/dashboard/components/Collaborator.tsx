import { useProjects } from "../../hooks/useProjects";

export const Collaborator = (collaborator: any) => {
  const { handleDeleteCollaborator } = useProjects();
  const { name, email } = collaborator.collaborator;

  return (
    <div className="p-5 border-b flex justify-between">
      <div>
        <p className="capitalize"> {name}</p>
        <p className="text-xs text-gray-600"> {email}</p>
      </div>
      <div>
        <button
          className="bg-red-500 py-2 px-3 rounded-full text-white"
          type="button"
          onClick={() => handleDeleteCollaborator(collaborator.collaborator)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
