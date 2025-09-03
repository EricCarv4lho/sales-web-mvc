import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";
import { useSearchParams } from "react-router-dom";


function SimpleSalesPage() {
  const [simpleStartDate, setSimpleStartDate] = useState(null);
  const [simpleFinalDate, setSimpleFinalDate] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupFinalDate, setGroupFinalDate] = useState(null);
  const [searchParams] = useSearchParams();
  const [sales, setSales] = useState([]);
 
    function formatDate(date) {
    return date?.toISOString().split("T")[0]; // yyyy-MM-dd
  }
  

  useEffect(() => {
  const start = searchParams.get("startDate");
  const end = searchParams.get("finalDate");

  // Converter string para objeto Date
  const startDateObj = start ? new Date(start) : null;
  const endDateObj = end ? new Date(end) : null;

  if (startDateObj) setSimpleStartDate(startDateObj);
  if (endDateObj) setSimpleFinalDate(endDateObj);

  if (!startDateObj || !endDateObj) return;

  const fetchData = async () => {
    try {
      const s = formatDate(startDateObj);
      const e = formatDate(endDateObj);

      const data = await fetchSales(s, e);
      setSales(data);
    } catch (err) {
      console.error("Erro ao buscar vendas:", err);
    }
  };

  fetchData();
}, [searchParams]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const start = formatDate(simpleStartDate);
      const final = formatDate(simpleFinalDate);
      const data = await fetchSales(start, final);
      setSales(data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }
  };


  return (
    <div className="min-h-screen pt-32 flex flex-col items-center gap-5 ">
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
      <div className="w-full flex items-center mt-12 justify-between px-10">
        
        <h1 className="text-5xl text-center  text-white">Vendas Simples</h1>
        <Link to="/sales">
          <button className="text-white bg-gradient-to-r cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg text-2x1 px-5 py-2.5 text-center me-2 mb-2">
            Voltar
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white  shadow-md rounded px-3 pt-3 pb-3 mb-5 max-w-md w-full"
      >
        <p className="text-xl font-semibold text-blue-600 mb-4">
          Pesquisa simples
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-blue-800">Data Inicial</label>

          <DatePicker
            selected={simpleStartDate}
            onChange={(date) => setSimpleStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/aaaa"
            className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>

          <label className="text-blue-800">Data Final</label>

          <DatePicker
            selected={simpleFinalDate}
            onChange={(date) => setSimpleFinalDate(date)}
            placeholderText="dd/mm/aaaa"
            dateFormat="dd/MM/yyyy"
            className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Filtrar
          </button>
        </div>
      </form>
      <button
        id="buttonCreate"
        className="text-white bg-gradient-to-r  cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg text-2x1 px-5 py-2.5 text-center me-2 mb-2"
      >
        Total de Vendas:{" "}
        {sales
          .reduce((sum, sale) => sum + sale.amount, 0)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
      </button>
      <div
        id="tabela"
        className="flex justify-center w-full max-h-[700px] overflow-y-auto"
      >
        <table className="w-3/4">
          <thead className=" sticky top-0 bg-blue-600 z-10">
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Id
            </th>
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Data
            </th>
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Vendedor
            </th>
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Departamento
            </th>
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Valor
            </th>
            <th className="border text-amber-50 border-gray-300 px-4 py-2">
              Status
            </th>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sale.id}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {new Date(sale.date).toLocaleDateString("pt-BR")}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sale.sellerDto.name}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sale.sellerDto.departmentName}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sale.sellerDto.baseSalary.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="border text-amber-50 border-gray-300 px-4 py-2">
                  {sale.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default SimpleSalesPage;
