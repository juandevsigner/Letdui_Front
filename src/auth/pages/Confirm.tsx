import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { BiLike } from "react-icons/bi";
import { FaRegSadCry } from "react-icons/fa";

export const Confirm = () => {
  const [confirmAccount, setConfirmAccount] = useState<boolean>(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await axiosClient(url);
        console.log(data);
      } catch (error: any) {
        setConfirmAccount(true);
      }
    };
    confirmAccount();
  }, []);

  return (
    <>
      {confirmAccount ? (
        <div className="flex flex-col items-center justify-center">
          <FaRegSadCry className="text-red-500 text-5xl" />
          <h1 className="text-red-500 text-2xl capitalize text-center">
            Invalid <span className="font-semibold">Token!</span>
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <BiLike className="text-indigo-700 text-7xl animate-bounce" />
          <h1 className="text-indigo-700 text-2xl capitalize text-center">
            Thanks for create <span className="font-semibold">an account!</span>
          </h1>
          <Link
            className="text-slate-500 text-sm  md:text-base hover:text-indigo-600 "
            to="/"
          >
            Go Login!
          </Link>
        </div>
      )}
    </>
  );
};
