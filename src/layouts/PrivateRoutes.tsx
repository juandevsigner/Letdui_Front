import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Spinner } from "../ui";
import { Header, Sidebar } from "../dashboard";

export const PrivateRoutes = () => {
  const { auth, load } = useAuth();

  if (load) return <Spinner />;
  return (
    <>
      {auth?._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="flex-1 p-10 bg-slate-200">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
