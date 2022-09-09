import { useState, useEffect, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import {
  Provider,
  ValuePropsProjects,
  Project,
  Task,
} from "./interfacesContext";

const ProjectsContext = createContext({} as ValuePropsProjects);

const ProjectsProvider = ({ children }: Provider) => {
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>({});
  const [task, setTask] = useState<any>({});
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [modalDeleteTask, setModalDeleteTask] = useState<boolean>(false);

  const navigate = useNavigate();

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
      const projectUpdate = { ...project };
      projectUpdate.tasks = [...project.tasks, data];
      setProject(projectUpdate);
      setModal(false);
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

      const projectUpdate = { ...project };
      projectUpdate.task = projectUpdate.task.map((taskState: Task) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(projectUpdate);
    } catch (error) {}
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
    console.log(task);
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
      console.log(data);

      setModalDeleteTask(!modalDeleteTask);
      setMsg("Task has been delete correctly");
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 3000);
      /*  const projectUpdate = { ...project };
      projectUpdate.tasks = projectUpdate.tasks.filter(
        (taskState: Task) => taskState.id !== task.id
      );
      setProject(projectUpdate); */

      setTask({});
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
