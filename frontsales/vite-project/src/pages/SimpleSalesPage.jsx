import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";
import { useSearchParams } from "react-router-dom";

function SimpleSalesPage() {
  const [simpleStartDate, setSimpleStartDate] = useState(null);
  const [simpleFinalDate, setSimpleFinalDate] = useState(null);
 
  const [searchParams] = useSearchParams();
  const [sales, setSales] = useState([]);

  function formatDate(date) {
    return date?.toISOString().split("T")[0]; // yyyy-MM-dd
  }

  useEffect(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("finalDate");

    // Converter string para objeto Date
   const [year, month, day] = start.split('-');
const startDateObj = start ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
   const [yearEnd, monthEnd, dayEnd] = end.split('-');
   const endDateObj = end ? new Date(Number(yearEnd), Number(monthEnd) - 1, Number(dayEnd)) : null;

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
    <div className="min-h-screen pt-32 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
  <header>
<nav className="dark:bg-gray-900 bg-gradient-to-r from-blue-900 via-blue-900 to-blue-1000   fixed w-full top-0 start-0  dark:border-gray-600 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <span className="text-2xl font-bold text-amber-50">Sales Web MVC</span>
        <ul className="hidden md:flex space-x-6 text-amber-50 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/departments">Departamentos</Link></li>
          <li><Link to="/sellers">Vendedores</Link></li>
          <li><Link to="/sales">Vendas</Link></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <div className="max-w-screen-xl mx-auto mt-12 px-4 flex gap-10 justify-between">
    {/* Coluna Esquerda */}
    <div className="w-[35%]">
      <h1 className="text-3xl font-semibold text-white mb-6">Vendas Simples</h1>

      <form onSubmit={handleSubmit} className="bg-slate-500 rounded-lg p-10 shadow-md text-gray-800">
        <p className="text-lg font-semibold text-slate-50 mb-4">Pesquisa simples</p>

          <div className=" flex mb-5 gap-5 text-center items-center">
          <label className="text-slate-50">Data Inicial</label>
          <DatePicker
            selected={simpleStartDate}
            onChange={(date) => setSimpleStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/aaaa"
            className="border bg-slate-50 border-gray-300 rounded px-3 py-2"
            showPopperArrow={false}
            isClearable
          />
</div>     <div className=" flex gap-7 text-center items-center ">
          <label className="text-slate-50">Data Final</label>
          <DatePicker
            selected={simpleFinalDate}
            onChange={(date) => setSimpleFinalDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/aaaa"
            className="border bg-slate-50 border-gray-300 rounded px-3 py-2"
            showPopperArrow={false}
            isClearable
          />
</div>
          <button
            type="submit"
            className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            Filtrar
          </button>
        
      </form>
    </div>

    {/* Coluna Direita */}
    <div className="w-[60%]">
      <div className="mb-4">
        <span className="text-white text-sm font-medium">
          Total de Vendas:{" "}
          <span className="font-bold text-green-300">
            {sales
              .reduce((sum, sale) => sum + sale.amount, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </span>
      </div>

      <div className="max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="sticky top-0 bg-slate-500 text-white">
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Vendedor</th>
              <th className="px-4 py-2">Departamento</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="px-4 py-2">{sale.id}</td>
                <td className="px-4 py-2">
                  {new Date(sale.date).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-2">{sale.sellerDto.name}</td>
                <td className="px-4 py-2">{sale.sellerDto.departmentName}</td>
                <td className="px-4 py-2">
                  {sale.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-4 py-2">{sale.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  );
}

export default SimpleSalesPage;
