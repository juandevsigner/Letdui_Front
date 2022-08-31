import { RiErrorWarningFill } from "react-icons/ri";

interface AlertProp {
  msg: string;
}

export const Alert = ({ msg }: AlertProp) => {
  return (
    <div className="w-full  flex justify-between items-center bg-red-600 rounded-lg py-2 my-4 px-3 text-center text-white">
      <p>{msg}</p>
      <RiErrorWarningFill className="text-2xl" />
    </div>
  );
};
