import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useProjects } from "../../hooks";
import { Spinner } from "../../ui";

export const Project = () => {
  const params = useParams();

  const { project, getProject, load } = useProjects();
  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (load) return <Spinner />;

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">{name}</h1>
      <Link
        className="flex items-center gap-3 bg-indigo-600 py-2 px-5 rounded-full hover:bg-indigo-900 transition-colors delay-75 text-white"
        to={`/projects/edit/${params.id}`}
      >
        Edit
        <FiEdit className="text-xl" />
      </Link>
    </div>
  );
};
