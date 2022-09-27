import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineWavingHand } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth, useProjects } from "../../hooks";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebar, setSidebar } = useProjects();
  const handleNewProject = () => {
    navigate("new-project");
    setSidebar(!sidebar);
  };

  const handleProject = () => {
    navigate("/projects");
    setSidebar(!sidebar);
  };
  const { auth } = useAuth();
  return (
    <aside className="md:w-72 lg:w-96 px-5 py-10 relative">
      <button
        onClick={() => setSidebar(!sidebar)}
        type="button"
        className="text-2xl bg-indigo-600 rounded-r-md p-1 text-white absolute top-5 -right-8 hover:bg-indigo-800 transition-colors delay-100 "
      >
        {sidebar ? <RiCloseLine /> : <HiOutlineMenuAlt3 />}
      </button>
      <div className="flex items-center gap-2">
        <p className="text-xl capitalize font-semibold">HI {auth?.name}!</p>
        <MdOutlineWavingHand className="text-2xl" />
      </div>

      <button
        type="button"
        className={`${
          location.pathname === "/projects"
            ? "bg-indigo-600 hover:bg-indigo-800 text-white"
            : "hover:bg-gray-200"
        }  justify-between  flex items-center mt-5 rounded-full py-2 px-4   transition-colors delay-75 w-full`}
        onClick={handleProject}
      >
        <p>Projects</p>

        <IoIosArrowForward className="text-xl" />
      </button>
      <button
        type="button"
        className={`${
          location.pathname === "/projects/new-project"
            ? "bg-indigo-600 hover:bg-indigo-800 text-white"
            : "hover:bg-gray-200"
        }  justify-between  flex items-center mt-5 rounded-full py-2 px-4 w-full  transition-colors delay-75`}
        onClick={handleNewProject}
      >
        <p>New Project</p>

        <IoIosArrowForward className="text-xl" />
      </button>
    </aside>
  );
};
