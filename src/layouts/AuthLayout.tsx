import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-[url('../assets/background.svg')] bg-cover bg-center">
      <main className="container mx-auto md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
