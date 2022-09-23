import { useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
import { FaUserAstronaut } from "react-icons/fa";
import { PreviewProject } from "../components";
import { Spinner } from "../../ui";
import io from "socket.io-client";

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
      <div className="h-screen">
        {projects?.length ? (
          <div className="bg-white rounded-lg shadow-sm mt-5 p-5">
            <p className="text-indigo-600 font-semibold text-center text-2xl capitalize">
              Projects List
            </p>
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
      </div>
    </>
  );
};
