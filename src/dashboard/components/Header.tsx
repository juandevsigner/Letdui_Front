import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
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
    <header className="px-4 py-2 bg-white  shadow-sm">
      <div className="flex justify-between md:items-center">
        <Link to={"/projects"}>
          <img className="w-32" src={Logo} alt="letdui-app" />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSearch}
            type="button"
            className="border border-gray-300 rounded-full py-2 px-5 flex items-center justify-between gap-3"
          >
            <p className="hidden md:block">Search Project</p>

            <BiSearch className="text-xl" />
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full  hover:bg-gray-400 hover:text-gray-100 p-2 flex items-center gap-2 transition-colors delay-75"
          >
            <p className="hidden md:block">Logout</p>

            <IoMdExit className="text-xl" />
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};
