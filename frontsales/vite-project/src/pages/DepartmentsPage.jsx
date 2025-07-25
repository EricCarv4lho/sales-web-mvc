import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/api";

import { Link } from "react-router-dom";
import { createDepartmentApi } from "../services/api";

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  const [createDepartment, setCreateDepartment] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      id="content"
      className="flex-col justify-center items-center space-y-10"
    >
      <nav class=" dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-amber-50">
            Sales Web MVC
          </span>

          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  class="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/departments"}
                  class="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Departments
                </Link>
              </li>
              <li>
                  <Link
                    to={"/sellers"}
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sellers
                  </Link>
                </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        id="titulo"
        className=" flex flex-col items-center justify-center mt-20  p-6"
      >
        <h1 className="text-amber-50 text-5xl font-bold  mb-8">Departments</h1>
      </div>

      <div id="tabela" className="flex justify-center flex-grow">
        <table className="w-2/4   border-collapse ">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.id} onClick={() => setActi}>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {dep.name}
                </td>

                <div
                  id="botoes"
                  className=" flex flex-row justify-center gap-4"
                >
                  <Link to={`/departments/editar/${dep.id}`}>
                    {" "}
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r  cursor-pointer from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Editar
                    </button>
                  </Link>

                  <Link to={`/departments/detalhes/${dep.id}`}>
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r  cursor-pointer from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Detalhes
                    </button>
                  </Link>
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r cursor-pointer from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Deletar
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 md:flex-row  justify-center ">
        <button
          onClick={() => setCreateDepartment(true)}
          className="  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 cursor-pointer hover:bg-gradient-to-br text-amber-50 rounded-lg text-sm font-bold px-5 py-2.5 text-center me-2 mb-2"
        >
          CRIAR
        </button>
        {createDepartment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Novo Departamento
              </h2>

              <input
                type="text"
                placeholder="Nome do departamento"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCreateDepartment(false)}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    const trimedName = departmentName.trim();
                    console.log(trimedName)
                    if (!trimedName) {
                      alert("Type a valid name to department.");
                      return;
                    }

                    try {
                      const createdDepartment = await createDepartmentApi({
                        name: trimedName,
                      });
                      setDepartments([...departments, createdDepartment]);
                      setDepartmentName("");
                      
                      setCreateDepartment(false);
                    } catch (error) {
                      console.error(
                        "Error ocurred when creating a new department.."
                      );
                    }
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentsPage;
