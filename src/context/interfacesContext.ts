export interface Provider {
  children: JSX.Element | JSX.Element[];
}

export interface ValuePropsAuth {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  LogoutAuth: () => void;
}

export interface Project {
  _id?: any;
  id: string | null;
  name: string;
  description: string;
  client: string;
  deliveryDate: string;
  //TODO: tipar las funciones
  map?: any;
  length?: () => void | undefined;
  find?: () => void | undefined;
  tasks: Task;
  collaborators: Collaborator;
  creator?: string;
  filter?: any;
}

export interface Collaborator {
  email: string;
  name: string;
  _id?: string;
  map?: any;
  length?: () => void;
}

export interface Task {
  _id?: any;
  length?: () => void;
  map?: any;
  deliveryDate?: string | undefined;
  name: string;
  description: string;
  priority: string;
  date: string | undefined;
  id?: any;
  project?: string;
  state?: boolean;
  completed: any;
}

export interface CollaboratorInt {
  email: string;
  name: string;
  _id?: any;
}
export interface ValuePropsProjects {
  projects: Project;
  setProjects: React.Dispatch<React.SetStateAction<any>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<any>>;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  submitProject: (project: Project) => Promise<void>;
  getProject: (id: any) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  deleteTask: () => Promise<void>;
  submitTask: (task: Task) => Promise<void>;
  handleEditTask: (task: Task) => Promise<void>;
  submitCollaborator: (email: string) => Promise<void>;
  addCollaborator: (email: object) => Promise<void>;
  handleDeleteCollaborator: (collaborator: CollaboratorInt) => void;
  deleteCollaborator: () => Promise<void>;
  handleSearch: () => void;
  logoutProjects: () => void;
  submitTaskProject: (task: any) => void;
  deleteTaskProject: (task: any) => void;
  editTaskProject: (task: any) => void;
  newStateProject: (task: any) => void;
  handleModalDeleteTask: (task: any) => any;
  handleModalTask: () => void;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalDeleteTask: boolean;
  setModalDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
  modalDeleteCollaborator: boolean;
  setModalDeleteCollaborator: React.Dispatch<React.SetStateAction<boolean>>;
  search: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  collaborator: CollaboratorInt;
  setCollaborator: React.Dispatch<React.SetStateAction<CollaboratorInt>>;
}
