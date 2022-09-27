import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Spinner } from "../ui";
import { Header, Sidebar } from "../dashboard";
import { useProjects } from "../hooks";

export const PrivateRoutes = () => {
  const { auth, load } = useAuth();
  const { sidebar } = useProjects();
  if (load) return <Spinner />;
  return (
    <>
      {auth?._id ? (
        <div>
          <div>
            <Header />
          </div>
          <div
            className={`${
              !sidebar ? "-left-48  md:-left-72 lg:-left-96" : "left-0"
            } absolute  bg-slate-100 h-screen shadow-xl transition-all delay-75 duration-500`}
          >
            <Sidebar />
          </div>
          <main className="px-10  bg-slate-200 h-screen  bg-cover bg-center">
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
