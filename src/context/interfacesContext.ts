import { Params } from "react-router-dom";

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
}

export interface ValuePropsProjects {
  projects: Project;
  setProjects: React.Dispatch<React.SetStateAction<any>>;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<any>>;
  submitProject: (project: Project) => Promise<void>;
  getProject: (id: any) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
