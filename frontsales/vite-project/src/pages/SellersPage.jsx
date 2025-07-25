import { useEffect, useState } from "react";
import { fetchSellers } from "../services/api";

import { Link } from "react-router-dom";

import { createSellerApi } from "../services/api";

import { fetchDepartments } from "../services/api";

import Select from "react-select";
function SellersPage() {
  const [sellers, setSellers] = useState([]);

  const [createSeller, setCreateSeller] = useState(false);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchSellers()
      .then((data) => setSellers(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [baseSalary, setBaseSalary] = useState("");

  const [departmentId, setDepartmentId] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !birthDate || !baseSalary) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const newSeller = await createSellerApi({
        name: trimmedName,
        email: trimmedEmail,
        birthDate,
        baseSalary: parseFloat(baseSalary),
        departmentId: departmentId,
      });

      // Atualiza a lista de sellers
      setSellers([...sellers, newSeller]);

      // Limpa o formulário
      setName("");
      setEmail("");
      setBirthDate("");
      setBaseSalary("");
      setCreateSeller(false);
    } catch (error) {
      console.error("Erro ao criar vendedor:", error);
      alert("Erro ao criar vendedor.");
    }
  };

  const handleChange = (e) => {
    setDepartmentId(e.value);
  };

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
        <h1 className="text-amber-50 text-5xl font-bold  mb-8">Sellers</h1>
      </div>

      <div id="tabela" className="flex justify-center flex-grow ">
        <table className="w-3/4   border-collapse ">
          <thead>
            <tr className="">
              <td className="border text-amber-50 border-gray-300 px-4 py-2">
                NOME
              </td>
              <td className="border text-amber-50 border-gray-300 px-4 py-2">
                EMAIL
              </td>
              <td className="border text-amber-50 border-gray-300 px-4 py-2">
                DATA DE NASCIMENTO
              </td>
              <td className="border text-amber-50 border-gray-300 px-4 py-2">
                SALARIO
              </td>
              <td className="border text-amber-50 border-gray-300 px-4 py-2">
                DEPARTAMENTO
              </td>
            </tr>
          </thead>
          <tbody>
            {sellers.map((sel) => (
              <tr key={sel.id}>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sel.name}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sel.email}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">

                  {sel.birthDate}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sel.baseSalary}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sel.departmentName}
                </td>
                <td>
                  <div
                    id="botoes"
                    className=" flex flex-row justify-center gap-5"
                  >
                    <Link to={`/sellers/editar/${sel.id}`}>
                      {" "}
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r  cursor-pointer from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Editar
                      </button>
                    </Link>

                    <Link to={`/sellers/detalhes/${sel.id}`}>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 md:flex-row  justify-center ">
        <button id="buttonCreate"
          onClick={() => setCreateSeller(true) 
           
          }
          className="  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 cursor-pointer hover:bg-gradient-to-br text-amber-50 rounded-lg text-sm font-bold px-5 py-2.5 text-center me-2 mb-2"
        >
          CRIAR
        </button>
        {createSeller && (
          <div className="py-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-96 "
          >
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Data de nascimento"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Salário base"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <Select
                options={departments.map((dep) => ({
                  value: dep.id,
                  label: dep.name,
                }))}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateSeller(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Enviar
              </button>
            </div>
          </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellersPage;
