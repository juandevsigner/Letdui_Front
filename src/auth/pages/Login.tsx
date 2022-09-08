import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../ui";
import axiosClient from "../../config/axiosClient";
import { useAuth } from "../../hooks";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const { setAuth } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setMsg("All fields are required");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/login", {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.token);
      setAuth(data);
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  return (
    <div>
      <h1 className="text-indigo-700 text-2xl capitalize text-center">
        Admin <span className="font-semibold">your projects</span>
      </h1>
      <form className=" bg-white p-10 rounded-lg">
        {msg.length !== 0 && <Alert error={error} msg={msg} />}
        <input
          className=" p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className=" p-2 border-b w-full border-indigo-300 mt-5"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <input
            className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-full mt-10"
            type="submit"
            value="Login"
            onClick={handleSubmit}
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
