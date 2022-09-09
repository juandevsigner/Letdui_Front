import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "../../ui";
import { useProjects } from "../../hooks";
import { Project } from "../../context/interfacesContext";

export const FormTask = () => {
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string | undefined>("");
  const [priority, setPriority] = useState<string>("");

  const { submitTask, task } = useProjects();

  const params = useParams();

  const project = params.id;

  useEffect(() => {
    if (task?.id) {
      setId(task.id);
      setName(task.name);
      setDescription(task.description);
      setDate(task.date?.split("T")[0]);
      setPriority(task.priority);

      return;
    }
    setId("");
    setName("");
    setDescription("");
    setDate("");
    setPriority("");
  }, [task]);

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([name, description, priority, date].includes("")) {
      setMsg("All fields are required");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    await submitTask({ name, description, priority, date, project, id });
    setId("");
    setName("");
    setDescription("");
    setDate("");
    setPriority("");
  };

  return (
    <>
      <h3 className="text-xl font-semibold">
        {id ? "Edit Task" : "Create Task"}
      </h3>
      <form className="my-10">
        {msg.length !== 0 && <Alert error={error} msg={msg} />}
        <div>
          <input
            placeholder="Name Task"
            type="text"
            className="p-2 border-b w-full border-indigo-300 mt-5"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            placeholder="Description Task"
            className="p-2 border-b w-full border-indigo-300 mt-5"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label className="text-xs mt-5">Delivery Date</label>
          <input
            type="date"
            className="p-2 border-b w-full border-indigo-300 mb-2"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="p-2 border-b w-full border-indigo-300 mt-5"
          >
            <option>-- Select Priority --</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            className="mt-7 delay-100 w-full cursor-pointer transition-all px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800 transition-colors"
            value={id ? "Save Changes" : "Create Task"}
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </>
  );
};
