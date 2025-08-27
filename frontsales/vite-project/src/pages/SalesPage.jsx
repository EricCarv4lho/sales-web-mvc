import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

function SalesPage() {
  const [simpleStartDate, setSimpleStartDate] = useState(null);
  const [simpleFinalDate, setSimpleFinalDate] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupFinalDate, setGroupFinalDate] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Registros de Vendas
      </h1>

      {/* Pesquisa simples */}
      <form className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-10 max-w-md w-full">
        <p className="text-xl font-semibold text-blue-600 mb-4">
          Pesquisa simples
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-blue-800">Data Inicial</label>

          <DatePicker
            selected={simpleStartDate}
            onChange={(date) => setSimpleFinalDate(date)}
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
          <Link to={"/sales/simple"}><button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Pesquisar
          </button></Link>
        </div>
      </form>

      {/* Pesquisa agrupada */}
      <form className="bg-white shadow-md rounded px-6 pt-6 pb-8 max-w-md w-full">
        <p className="text-xl font-semibold text-blue-600 mb-4">
          Pesquisa agrupada
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-blue-800">Data Inicial</label>
          <DatePicker
            selected={groupStartDate}
            onChange={(date) => setGroupStartDate(date)}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>
          <label className="text-blue-800">Data Final</label>

          <DatePicker
            selected={groupFinalDate}
            onChange={(date) => setGroupFinalDate(date)}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
            isClearable
                        className="border border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"

          ></DatePicker>
          <Link to={"/sales/group"}
          ><button
            type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"

          >
            Pesquisar
          </button></Link>
        </div>
      </form>
    </div>
  );
}

export default SalesPage;
