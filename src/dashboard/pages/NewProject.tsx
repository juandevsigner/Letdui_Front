import React from "react";
import { FormProject } from "../components";

export const NewProject = () => {
  return (
    <>
      <h1 className="text-2xl text-center  text-indigo-600 py-5">
        Create a <span className="font-semibold">Project</span>
      </h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};
