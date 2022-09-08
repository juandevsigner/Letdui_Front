import { useState, FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "../../ui";
import { useProjects } from "../../hooks/useProjects";

export const FormProject = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const { submitProject, setMsg, msg, error, project } = useProjects();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setClient(project.client);
      setDeliveryDate(project.deliveryDate?.split("T")[0]);
    }
  }, [params]);

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([name, description, client, deliveryDate].includes("")) {
      setMsg("All fields are required");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    await submitProject({ name, description, client, deliveryDate, id });
    setId(null);
    setName("");
    setDescription("");
    setClient("");
    setDeliveryDate("");
  };

  return (
    <form className="py-10 bg-white shadow-sm rounded-xl px-5 md:w-1/2">
      {msg?.length !== 0 && <Alert error={error} msg={msg} />}
      <input
        type="text"
        className="p-2 border-b w-full border-indigo-300 mt-5 "
        placeholder="Name Client"
        value={client}
        onChange={e => setClient(e.target.value)}
      />
      <input
        type="text"
        className="p-2 border-b w-full border-indigo-300 mt-5 "
        placeholder="Name Project"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <textarea
        className="p-2 border-b w-full border-indigo-300 mt-5 "
        placeholder="Project Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <label className="text-gray-500 text-sm mt-5 p-2">Delivery Date</label>
      <input
        type="date"
        className="p-2 border-b w-full border-indigo-300  "
        placeholder="Name Project"
        value={deliveryDate}
        onChange={e => setDeliveryDate(e.target.value)}
      />
      <input
        className="bg-indigo-700 w-full cursor-pointer transition-colors hover:bg-indigo-900 text-white px-10 py-2 rounded-full mt-10"
        type="submit"
        value={id ? "Update Project" : "Create Project"}
        onClick={handleSubmit}
      />
    </form>
  );
};
