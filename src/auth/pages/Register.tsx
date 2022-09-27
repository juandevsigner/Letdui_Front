import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../ui/Alert";
import axiosClient from "../../config/axiosClient";
import { Heading } from "../components";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([name, email, password, passwordRepeat].includes("")) {
      setMsg("All fields are required");
      setTimeout(() => {
        setMsg("");
      }, 3000);

      return;
    }
    if (password.length <= 6) {
      setMsg("Create a password with minimum 7 characters");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    if (password !== passwordRepeat) {
      setMsg("Passwords are not the same");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    try {
      const { data } = await axiosClient.post("/users", {
        name,
        email,
        password,
      });
      setMsg(data.msg);
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 5000);

      setEmail("");
      setName("");
      setPassword("");
      setPasswordRepeat("");
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

      <form className="my-5  p-10 rounded-lg">
        {msg.length !== 0 && <Alert error={error} msg={msg} />}
        <h1 className="text-indigo-700 text-2xl capitalize text-center">
          Create <span className="font-semibold">an account</span>
        </h1>
        <input
          className="input"
          placeholder="Enter Your Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Enter Your Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Create Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="input"
          placeholder="Repeat Password"
          type="password"
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
        />
        <div>
          <input
            className="btn-primary"
            type="submit"
            value="Create Account"
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
