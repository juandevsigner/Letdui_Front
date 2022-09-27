import { useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
import { FaUserAstronaut } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { PreviewProject } from "../components";
import { Spinner } from "../../ui";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { Project } from "../../context/interfacesContext";

let socket;

export const Projects = () => {
  const { projects, load } = useProjects();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("prueba");
    socket.on("respuesta", persona => {
      console.log("desde frontend", persona);
    });
  });

  if (load) return <Spinner />;

  return (
    <>
      <div className="h-screen ">
        {projects?.length ? (
          <>
            <p className="text-indigo-600 font-semibold text-center text-2xl capitalize py-5">
              Projects List
            </p>
            <div className=" overflow-y-scroll w-full h-3/5 md:h-4/6 lg:h-3/5 xl:h-4/5 bar p-2 ">
              <div>
                {projects.map(({ name, client, _id, creator }: any) => (
                  <PreviewProject
                    key={_id}
                    name={name}
                    client={client}
                    _id={_id}
                    creator={creator}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 flex flex-col justify-center items-center gap-2">
              <p className="text-indigo-800 font-semibold text-xl uppercase">
                It's very lonely here
              </p>
              <FaUserAstronaut className="text-5xl text-indigo-800" />
            </div>
          </>
        )}

        <div className="fixed right-10 bottom-6">
          <Link
            className=" flex items-center delay-100 transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800  gap-1 hover:gap-2"
            type="button"
            to="/projects/new-project"
          >
            <p>Create Project</p>
            <BsPlus className="text-2xl" />
          </Link>
        </div>
      </div>
    </>
  );
};
