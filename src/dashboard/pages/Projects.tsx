import React from "react";
import { useProjects } from "../../hooks/useProjects";
import { FaUserAstronaut } from "react-icons/fa";
import { Project } from "../../context/interfacesContext";
import { PreviewProject } from "../components";
import { Spinner } from "../../ui";

export const Projects = () => {
  const { projects, load } = useProjects();

  if (load) return <Spinner />;

  return (
    <>
      <div>
        {projects?.length ? (
          <div className="bg-white rounded-lg shadow-sm mt-5 p-5">
            <p className="text-indigo-600 font-semibold text-center text-2xl capitalize">
              Projects List
            </p>
            {projects.map(({ name, client, _id }: Project) => (
              <PreviewProject key={_id} name={name} client={client} _id={_id} />
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
