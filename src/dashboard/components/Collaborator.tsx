import { Collaborator as CollaboratorInt } from "../../context/interfacesContext";

export const Collaborator = ({ _id, name, email }: CollaboratorInt) => {
  return <div className="p-5">{name}</div>;
};
