import { useEffect, useState } from "react";
import { fetchGroupSales, fetchSales, fetchSimpleSales } from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [salesSimple, setSalesSimple] = useState([]);
  const [salesGroup, setSalesGroup] = useState([]);
  const [dateInitSimple, setDateInitSimple] = useState(null);
  const [dateFinalSimple, setDateFinalSimple] = useState(null);
  const [dateInitGroup, setDateInitGroup] = useState(null);
  const [dateFinalGroup, setDateFinalGroup] = useState(null);
  const [displaySales, setDisplaySales] = useState([]);
  const [groupSales, setGroupSales] = useState(false); // <-- novo estado

  function formatDate(date) {
    console.log(date);
    return new Date(date).toISOString().split("T")[0];
    // retorna "2025-09-15"
  }

  useEffect(() => {
    fetchSales().then((data) => {
      setSales(data);
      setDisplaySales(data);
    });
  }, []);

  const handleSimpleSubmit = async (e) => {
    e.preventDefault();
    setSalesSimple(true)
    setGroupSales(false);
    const initial = dateInitSimple ? formatDate(dateInitSimple) : "";
    const end = dateFinalSimple ? formatDate(dateFinalSimple) : "";

    console.log(initial);
    try {
      const result = await fetchSimpleSales(initial, end);

      setDisplaySales(result);
    } catch (err) {
      console.log(err.message || "Erro ao buscar vendas.");
    }

    console.log(new Date(dateInitSimple).toLocaleDateString("pt-BR"));
  };

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    setGroupSales(true);
    setSalesSimple(false);
    const initial = dateInitGroup ? formatDate(dateInitGroup) : "";
    const end = dateFinalGroup ? formatDate(dateFinalGroup) : "";

    console.log(initial);
    try {
      const result = await fetchGroupSales(initial, end);
      setSalesGroup(result);
      console.log(result);
    } catch (err) {
      console.log(err.message || "Erro ao buscar vendas.");
    }

    console.log(new Date(dateInitGroup).toLocaleDateString("pt-BR"));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center text-center text-white gap-10">
      <h1 className="text-5xl font-bold">Página de Vendas</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Vendas Simples */}
        <form className="bg-slate-700 rounded-lg p-2 shadow-md space-y-2 ">
          <p className="text-lg font-semibold">Vendas Simples</p>
          <div className="flex  gap-2">
            <DatePicker
              selected={dateInitSimple}
              onChange={(date) => setDateInitSimple(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Inicial"
              className="border bg-slate-50 text-black border-gray-300 rounded px-3 py-2"
              showPopperArrow={false}
              isClearable
            />
            <DatePicker
              selected={dateFinalSimple}
              onChange={(date) => setDateFinalSimple(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Final"
              className="border bg-slate-50 text-black border-gray-300 rounded px-3 py-2"
              showPopperArrow={false}
              isClearable
            />
          </div>
          <button
            onClick={handleSimpleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
          >
            Filtrar
          </button>
        </form>

        {/* Vendas Agrupadas */}
        <form className="bg-slate-700 rounded-lg p-2 shadow-md space-y-2">
          <p className="text-lg font-semibold">Vendas Agrupadas</p>
          <div className="flex  gap-2">
            <DatePicker
              selected={dateInitGroup}
              onChange={(date) => setDateInitGroup(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Inicial"
              className="border bg-slate-50 text-black border-gray-300 rounded px-3 py-2 "
              showPopperArrow={false}
              isClearable
            />
            <DatePicker
              selected={dateFinalGroup}
              onChange={(date) => setDateFinalGroup(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data Final"
              className="border bg-slate-50 text-black border-gray-300 rounded px-3 py-2"
              showPopperArrow={false}
              isClearable
            />
          </div>
          <button
            onClick={handleGroupSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
          >
            Filtrar
          </button>
        </form>
      </div>

      {/* Tabela com Scroll */}
      <div className="w-full max-w-6xl overflow-x-auto max-h-[500px] overflow-y-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="sticky top-0 bg-blue-800 text-white ">
            <tr>
              <th className="px-4 py-3 border border-gray-600">DATA</th>
              <th className="px-4 py-3 border border-gray-600">VALOR</th>
              <th className="px-4 py-3 border border-gray-600">STATUS</th>
              <th className="px-4 py-3 border border-gray-600">VENDEDOR</th>
              
            </tr>
          </thead>

          {salesSimple && (
            <tbody>
              {displaySales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-800 transition">
                  <td className="px-4 py-2 border border-gray-700">
                    {new Date(sale.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {sale.amount}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {sale.status}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {sale.sellerName}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          )}

          {/* Tabela Agrupada */}
          {groupSales && (
            <tbody>
              {salesGroup.map((group) => (
                <React.Fragment key={group.departmentName}>
                  {/* Linha de título do departamento */}
                  <tr className="bg-blue-900 text-white font-bold">
                    <td colSpan={6} className="px-4 py-2">
                      Departamento: {group.departmentName}
                    </td>
                  </tr>
                  {/* Vendas do departamento */}
                  {group.sales.map((s) => (
                    <tr key={s.id}>
                      
                      <td className="px-4 py-2">
                        {new Date(s.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-2">
                        {s.amount.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="px-4 py-2">{s.status}</td>
                      
                      <td className="px-4 py-2">{s.sellerName}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Botão Criar */}
      <button
        id="buttonCreate"
        onClick={() => alert("Abrir modal de criação")}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        CRIAR
      </button>
    </div>
  );
}

export default SalesPage;
