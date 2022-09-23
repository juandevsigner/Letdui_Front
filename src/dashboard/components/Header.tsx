import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { useProjects } from "../../hooks";
import { useAuth } from "../../hooks";
import Logo from "../../assets/letduiLogo.svg";
import { Search } from "./Search";

export const Header = () => {
  const { handleSearch, logoutProjects } = useProjects();
  const { LogoutAuth } = useAuth();
  const handleLogout = () => {
    LogoutAuth();
    logoutProjects();
    localStorage.removeItem("token");
  };
  return (
    <header className="px-4 py-5  shadow-sm">
      <div className="flex justify-between md:items-center">
        <img className="w-32" src={Logo} alt="letdui-app" />
        <button onClick={handleSearch} type="button" className="font-semibold">
          Search Project
        </button>
        <div className="flex items-center gap-4">
          <Link
            className="font-semibold  text-indigo-500 hover:text-indigo-800 transition-colors"
            to="/projects"
          >
            Projects
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full  hover:bg-gray-400 hover:text-gray-100 p-2 flex items-center gap-2 transition-colors delay-75"
          >
            Logout
            <IoMdExit className="text-xl" />
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};
