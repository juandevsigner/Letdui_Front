import { useProjects } from "./useProjects";
import { useAuth } from "./useAuth";

export const useAdmin = () => {
  const { project } = useProjects();
  const { auth } = useAuth();

  return project.creator === auth._id;
};
