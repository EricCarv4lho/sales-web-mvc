import { useEffect, useState } from "react";
import { fetchDepartments } from "../services/api";
import { Link } from "react-router-dom";
import { createDepartmentApi } from "../services/api";
import { deleteDepartment } from "../services/api";
import { useNavigate } from "react-router-dom";

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [createDepartment, setCreateDepartment] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const navigate = useNavigate();
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
  <header>
<nav className="dark:bg-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700   fixed w-full top-0 start-0  dark:border-gray-600 shadow-md">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-amber-50">
              Sales Web MVC
            </span>

           
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link to={"/"}>
                  <a
                    href=""
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </a>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/departments"}
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Departmentos
                  </Link>
                </li>
                 <li>
                  <Link
                    to={"/sellers"}
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Vendedores
                  </Link>
                </li>
              <li>
                    <Link to={"/sales"} className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">

                  
                    Vendas
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>


      <div
        id="titulo"
        className=" flex flex-col items-center justify-center mt-20  p-6"
      >
        <h1 className="text-amber-50 text-5xl font-bold  mb-8">
          Departamentos
        </h1>
      </div>

      <div id="tabela" className="flex justify-center flex-grow">
        <table className="w-2/4   border-collapse ">
          <tbody>
            <button
              onClick={() => setCreateDepartment(true)}
              className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              CRIAR
            </button>
            {departments.map((dep) => (
              <tr key={dep.id}>
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
                      className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Editar
                    </button>
                  </Link>

                  <Link to={`/departments/detalhes/${dep.id}`}>
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Detalhes
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      setOpenModalDelete(true);
                      setDepartmentId(dep.id);
                      console.log(dep.id);
                    }}
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    if (!trimedName) {
                      alert("Type a valid name to department.");
                      return;
                    }

                    try {
                      const createdDepartment = await createDepartmentApi({
                        name: trimedName,
                      });

                      if (createdDepartment) {
                        setDepartments([...departments, createdDepartment]);
                        setDepartmentName("");
                        setCreateDepartment(false);
                        alert("Departamento criado com sucesso!");
                        navigate("/departments");
                      }
                      // Se for null, o alert de erro já foi mostrado na API e nada acontece
                    } catch (error) {
                      console.error("Error ocurred when creating a new department..");
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {openModalDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Tem certeza que deseja deletar este departamento?
              </h2>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpenModalDelete(false)}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    try {
                      await deleteDepartment(departmentId);
                      setOpenModalDelete(false);
                      var data = await fetchDepartments();
                      setDepartments(data);
                    } catch (err) {
                      console.log("erro ao deletar", err);
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  DELETAR
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
