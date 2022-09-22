import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useNavigate, Navigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Search = () => {
  const { handleSearch, search, projects } = useProjects();
  const [searchMod, setSearchMod] = useState<string>("");

  const projectsFilter =
    searchMod === ""
      ? []
      : projects?.filter((project: any) =>
          project.name.toLowerCase().includes(searchMod.toLowerCase())
        );
  return (
    <Transition.Root
      show={search}
      as={Fragment}
      afterLeave={() => setSearchMod("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
        onClose={handleSearch}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(project: any) =>
              (window.location.href = `/projects/${project._id}`)
            }
            value={projects}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={e => setSearchMod(e.target.value)}
              />
            </div>

            {projectsFilter?.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {projectsFilter.map((project: any) => (
                  <Combobox.Option
                    key={project._id}
                    value={project}
                    className={({ active }) =>
                      classNames(
                        "cursor-default select-none px-4 py-2",
                        active && "bg-indigo-600 text-white"
                      )
                    }
                  >
                    {project.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
