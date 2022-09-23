import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axiosClient from "../config/axiosClient";
import { useAuth } from "../hooks/useAuth";
import {
  Provider,
  ValuePropsProjects,
  Project,
  Task,
  CollaboratorInt,
} from "./interfacesContext";

let socket: any;

const ProjectsContext = createContext({} as ValuePropsProjects);

const ProjectsProvider = ({ children }: Provider) => {
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>({});
  const [task, setTask] = useState<any>({});
  const [load, setLoad] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [modalDeleteTask, setModalDeleteTask] = useState<boolean>(false);
  const [modalDeleteCollaborator, setModalDeleteCollaborator] =
    useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<any>({});
  const [search, setSearch] = useState<boolean>(false);

  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config: any = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const submitProject = async (project: Project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
    return;
  };

  const newProject = async (project: Project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);
      setMsg("Project has been create correctly");
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const editProject = async (project: Project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );

      //TODO: pendiente por revisar, pq no actualiza el state

      const projectsUpdate = await projects.map((projectState: Project) =>
        projectState._id === data._id ? data : projectState
      );

      setProjects(projectsUpdate);

      setMsg("Project has been update correctly");
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id: string) => {
    setLoad(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      navigate("/projects");
      console.log(error);
    }
    setLoad(false);
  };

  const deleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);
      const projectsUpdate = projects.filter(
        (projectState: Project) => projectState._id !== id
      );

      setProjects(projectsUpdate);

      setMsg("Project has been delete correctly");
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTask = () => {
    setModal(!modal);

    setTimeout(() => {
      setTask({});
    }, 500);
  };

  const createTask = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/task", task, config);

      setModal(false);
      //SOCKET
      socket.emit("new task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //TODO: pendiente por revisar, pq no actualiza el state
      const { data } = await axiosClient.put(`/task/${task.id}`, task, config);
      console.log(data);
      setModal(!modal);

      //SOCKETS
      socket.emit("update task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async (task: Task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }

    return;
  };

  const handleEditTask = async (task: Task) => {
    setTask(task);
    setModal(true);
  };

  const handleModalDeleteTask = (task: Task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //TODO: pendiente por revisar, pq no actualiza el state
      const { data } = await axiosClient.delete(`/task/${task.id}`, config);
      setModalDeleteTask(!modalDeleteTask);
      setMsg("Task has been delete correctly");

      //SOCKET
      socket.emit("remove task", task);
      //

      setTask({});
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email: string) => {
    const emailBody = {
      email,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/projects/team",
        emailBody,
        config
      );

      setCollaborator(data);
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setError(true);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
    }
  };

  const addCollaborator = async (email: object) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) return;

      const config: any = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/team/${project._id}`,
        email,
        config
      );

      setCollaborator({});
      setMsg(data.msg);
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setError(true);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
    }
  };

  const handleDeleteCollaborator = (collaborator: CollaboratorInt) => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  };

  const deleteCollaborator = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) return;

      const config: any = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const projectUpdate = { ...project };
      projectUpdate.collaborators = projectUpdate.collaborators.filter(
        (collaboratorState: any) => collaboratorState._id !== collaborator._id
      );

      setProject(projectUpdate);

      setMsg(data.msg);
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const completeTask = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) return;

      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(`/task/state/${id}`, {}, config);
      setTask({});

      //SOCKETS
      socket.emit("change state", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  //Sockets Functions
  const submitTaskProject = (task: any) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = [...projectUpdate.tasks, task];
    setProject(projectUpdate);
  };

  const deleteTaskProject = (task: any) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = projectUpdate.tasks.filter(
      (taskState: any) => taskState._id !== task._id
    );
    console.log(projectUpdate);
    console.log(task);
    setProject(projectUpdate);
  };

  const editTaskProject = (task: any) => {
    const projectUpdate = { ...project };
    projectUpdate.task = projectUpdate.task.map((taskState: Task) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdate);
  };

  const newStateProject = (task: any) => {
    const projectUpdate = { ...project };
    projectUpdate.tasks = projectUpdate.tasks.map((taksState: any) =>
      taksState._id === task._id ? task : taksState
    );
    setProject(projectUpdate);
  };

  const logoutProjects = () => {
    setProjects([]);
    setProject({});
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        project,
        setProject,
        submitProject,
        msg,
        setMsg,
        error,
        setError,
        getProject,
        deleteProject,
        load,
        setLoad,
        modal,
        setModal,
        submitTask,
        handleEditTask,
        task,
        setTask,
        handleModalTask,
        modalDeleteTask,
        setModalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
        submitCollaborator,
        addCollaborator,
        collaborator,
        setCollaborator,
        modalDeleteCollaborator,
        setModalDeleteCollaborator,
        handleDeleteCollaborator,
        deleteCollaborator,
        completeTask,
        search,
        setSearch,
        handleSearch,
        submitTaskProject,
        deleteTaskProject,
        editTaskProject,
        newStateProject,
        logoutProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
