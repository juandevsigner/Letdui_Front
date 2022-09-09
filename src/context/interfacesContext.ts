export interface Provider {
  children: JSX.Element | JSX.Element[];
}

export interface ValueProps {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
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
  length?: any;
  find?: any;
  tasks: Task;
}

export interface Task {
  _id?: any;
  length?: any;
  map?: any;
  deliveryDate?: string | undefined;
  name: string;
  description: string;
  priority: string;
  date: string | undefined;
  id?: string | undefined;
  project?: string;
  state?: boolean;
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
  deleteTask: () => Promise<void>;
  submitTask: (task: Task) => Promise<void>;
  handleEditTask: (task: Task) => Promise<void>;
  handleModalDeleteTask: (task: any) => any;
  handleModalTask: () => any;
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
}
