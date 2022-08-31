import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <h1 className="text-indigo-700 text-2xl capitalize text-center">
        Admin <span className="font-semibold">your projects</span>
      </h1>
      <form className="my-5 bg-white shadow-sm p-10 rounded-lg">
        <input
          className="capitalize p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Enter your email"
          type="email"
        />
        <input
          className="capitalize p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Enter your password"
          type="password"
        />
        <div>
          <input
            className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-lg mt-5"
            type="submit"
            value="Login"
          />
        </div>
      </form>
      <nav className="flex justify-between">
        <Link
          className="text-slate-500 text-sm md:text-base hover:text-indigo-600 "
          to="register"
        >
          Don't have an account?
        </Link>
        <Link
          className="text-slate-500 text-sm md:text-base hover:text-indigo-600 "
          to="recover-pass"
        >
          Forgot your password?
        </Link>
      </nav>
    </div>
  );
};
