import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchOneDepartment, updateDepartment } from "../services/api";
import { useEffect, useState } from "react";
function DepartmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [department, setDepartment] = useState({});

  useEffect(() => {
    fetchOneDepartment(id).then((data) => {
      setDepartment(data);
      setDepartmentName(data.name);
    });
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDepartment = {
      ...department,
      name: departmentName,
    };
try {
    const response = await updateDepartment(id, updatedDepartment);
    if (response) {
      alert("Departamento atualizado com sucesso!");
      navigate("/departments");
    } else {
      alert("Erro ao atualizar.");
    }}
    catch (error) {
      console.error("Erro ao atualizar o departamento:", error);
      alert(error.message || "Erro ao atualizar departamento.");
    }
  };

  return (
    <div>
     <header>
<nav className="dark:bg-gray-900 bg-gradient-to-r from-blue-900 via-blue-900 to-blue-1000   fixed w-full top-0 start-0  dark:border-gray-600 shadow-md">
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

      <div className="flex  flex-col justify-center items-center">
        <h1 className="text-2xl font-bold m-20 text-amber-50">
          Edite as informações abaixo:
        </h1>

        <form
          className="bg-white p-6 rounded shadow-lg w-96"
          onSubmit={handleSubmit}
        >
          <div>
            <h1>Departamento</h1>
            <input
              type="text"
              value={departmentName}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Link to={"/departments"}>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentEditPage;
