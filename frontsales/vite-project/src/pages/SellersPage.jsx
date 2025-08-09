import { useEffect, useState } from "react";
import { deleteSellers, fetchSellers } from "../services/api";

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
  const [sellerId, setSellerId] = useState(0);
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
       
       if(!newSeller){
          return
        }
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

  const [openModalDelete, setOpenModalDelete] = useState(false);

  return (
    <div
      id="content"
      className="flex-col justify-center items-center space-y-10"
    >
      <nav className="dark:bg-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700   fixed w-full top-0 start-0  dark:border-gray-600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-amber-50">
            Sales Web MVC
          </span>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
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

      <div
        id="titulo"
        className=" flex flex-col items-center justify-center mt-20  p-6"
      >
        <h1 className="text-amber-50 text-5xl font-bold  mb-8">Vendedores</h1>
      </div>

      <div id="tabela" className="flex justify-center flex-grow ">
        <table className="w-3/4   border-collapse ">
          <thead>
            <button
              id="buttonCreate"
              onClick={() => setCreateSeller(true)}
              className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              CRIAR
            </button>
            <tr className="">
              <td className="border bg-blue-600 text-amber-50 border-gray-300 px-4 py-2">
                NOME
              </td>
              <td className="border bg-blue-600 text-amber-50 border-gray-300 px-4 py-2">
                EMAIL
              </td>
              <td className="border bg-blue-600 text-amber-50 border-gray-300 px-4 py-2">
                DATA DE NASCIMENTO
              </td>
              <td className="border bg-blue-600 text-amber-50 border-gray-300 px-4 py-2">
                SALÁRIO
              </td>
              <td className="border bg-blue-600 text-amber-50 font-medium border-gray-300 px-4 py-2">
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
                  {new Date(sel.birthDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  R$ {sel.baseSalary}
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
                        className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Editar
                      </button>
                    </Link>

                    <Link to={`/sellers/detalhes/${sel.id}`}>
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
                       
                      onClick={() => { setOpenModalDelete(true);
                        setSellerId(sel.id)
                        console.log(sel.id)
                      }
                      }
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
        {openModalDelete && (
           <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                      <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800">
                         Tem certeza que deseja deletar este vendedor?
                        </h2>
          
                       
          
                        <div className="flex justify-end gap-2">
                          <button
                           onClick={() => setOpenModalDelete(false)}
                            className="text-gray-600 hover:text-gray-800 px-4 py-2"
                          >
                            Cancelar
                          </button>
                          <button 
                            onClick={ async () => { try{ await deleteSellers(sellerId);
                              setOpenModalDelete(false);
                              var data = await fetchSellers();
                            setSellers(data)}
                              catch (err) {
                                console.log('erro ao deletar', err);
                              }
                            }
                              
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                          >
                            DELETAR
                          </button>
                        </div>
                      </div>
                    </div>
        )}
        {createSeller && (
          <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-lg w-96"
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
                  type="text"
                  placeholder="Data de nascimento - dd/MM/yyyy"
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
                  placeholder="Departamento"
                  options={departments.map((dep) => ({
                    value: dep.id,
                    label: dep.name,
                  }))}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setCreateSeller(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
