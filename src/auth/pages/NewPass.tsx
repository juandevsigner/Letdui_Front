import { useState, FormEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { Alert } from "../../ui/Alert";
import { FaRegSadCry } from "react-icons/fa";

export const NewPass = () => {
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [tokenValid, setTokenValid] = useState<boolean>(false);
  const [changePass, setChangePass] = useState<boolean>(false);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/recover-password/${token}`);
        setTokenValid(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  });

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([password, passwordRepeat].includes("")) {
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
      const url = `/users/recover-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setMsg(data.msg);
      setError(false);
      setTimeout(() => {
        setMsg("");
        setError(true);
      }, 5000);
      setPassword("");
      setPasswordRepeat("");
      setChangePass(true);
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 5000);
    }
  };

  return (
    <div className="text-center">
      {tokenValid ? (
        <div>
          <h1 className="text-indigo-700 text-2xl capitalize text-center">
            Create <span className="font-semibold">a new password</span>
          </h1>
          <form className="my-5 bg-white  p-10 rounded-lg">
            {msg.length !== 0 && <Alert error={error} msg={msg} />}
            <input
              className=" p-2 border-b w-full border-indigo-300 mt-5"
              placeholder="Create Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className=" p-2 border-b w-full border-indigo-300 mt-5"
              placeholder="Repeat Password"
              type="password"
              value={passwordRepeat}
              onChange={e => setPasswordRepeat(e.target.value)}
            />
            <div>
              <input
                className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-full mt-5"
                type="submit"
                value="Create New Password"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaRegSadCry className="text-red-500 text-5xl" />
          <h1 className="text-red-500 text-2xl capitalize text-center">
            Invalid <span className="font-semibold">Token!</span>
          </h1>
        </div>
      )}
      {changePass && (
        <Link
          className="text-slate-500 text-center text-2xl  md:text-base hover:text-indigo-600 "
          to="/"
        >
          Now Go Login!
        </Link>
      )}
    </div>
  );
};
