import { FormEvent, useState } from "react";
import { Alert, Spinner } from "../../ui";
import { useProjects } from "../../hooks";

export const FormCollaborator = () => {
  const [email, setEmail] = useState<string>("");

  const { submitCollaborator, load, msg, error, setMsg } = useProjects();

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (email === "") {
      setMsg("Email is required");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    await submitCollaborator(email);
    setEmail("");
  };

  if (load) return <Spinner />;

  return (
    <form className="bg-white p-5 rounded-lg shadow-sm w-full md:w-1/2">
      {msg.length !== 0 && <Alert error={error} msg={msg} />}
      <div className="my-5">
        <input
          className="p-2 border-b w-full border-indigo-300 "
          placeholder="Collaborator Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="mt-7 delay-100 w-full cursor-pointer transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 "
          value="Search"
          type="submit"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};
