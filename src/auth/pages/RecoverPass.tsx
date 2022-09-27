import { useState, FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { Alert } from "../../ui/Alert";
import axiosClient from "../../config/axiosClient";
import { Heading } from "../components";

export const RecoverPass = () => {
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (email === "") {
      setMsg("Email are required");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    try {
      const { data } = await axiosClient.post("/users/recover-password", {
        email,
      });
      setMsg(data.msg);
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 5000);

      setEmail("");
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
      <form className="  p-10 rounded-lg">
        {msg.length !== 0 && <Alert error={error} msg={msg} />}
        <h1 className="text-indigo-700 text-2xl capitalize text-center">
          Recover <span className="font-semibold">your password</span>
        </h1>
        <input
          className="input"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div>
          <input
            className="btn-primary"
            type="submit"
            value="Send Instructions"
            onClick={handleSubmit}
          />
        </div>
      </form>
      <nav className="text-center">
        <Link
          className="text-slate-500 text-sm  md:text-base hover:text-indigo-600 "
          to="/"
        >
          Do you have an account? Login
        </Link>
      </nav>
    </div>
  );
};
