import { RiErrorWarningFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";

interface AlertProp {
  msg: string;
  error: boolean;
}

export const Alert = ({ msg, error = true }: AlertProp) => {
  return (
    <div
      className={`${
        error ? "bg-red-600" : "bg-green-600"
      } w-full  flex justify-between items-center  rounded-lg py-2 my-4 px-3 text-center text-white`}
    >
      <p>{msg}</p>
      {error ? (
        <RiErrorWarningFill className="text-2xl" />
      ) : (
        <BsCheckCircleFill className="text-2xl" />
      )}
    </div>
  );
};
