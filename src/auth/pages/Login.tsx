import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../ui";
import axiosClient from "../../config/axiosClient";
import { useAuth } from "../../hooks";
import { Heading } from "../components";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

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
      navigate("/projects");
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  return (
    <div>
      <Heading />
      <form className=" p-10 rounded-lg">
        {msg.length !== 0 && <Alert error={error} msg={msg} />}
        <h1 className="text-indigo-700 text-2xl capitalize text-center">
          log in
        </h1>
        <input
          className="input"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <input
            className="btn-primary"
            type="submit"
            value="Login"
            onClick={handleSubmit}
          />
        </div>
      </form>
      <nav className="flex flex-col items-center justify-between ">
        <Link
          className="text-slate-500 text-sm md:text-base hover:text-indigo-600 "
          to="register"
        >
          Don't have an account?
        </Link>
        <Link
          className="text-slate-500 text-sm md:text-base hover:text-indigo-600"
          to="recover-pass"
        >
          Forgot your password?
        </Link>
      </nav>
    </div>
  );
};
