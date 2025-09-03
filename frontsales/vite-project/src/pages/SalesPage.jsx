import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { fetchGroupSales, fetchSales } from "../services/api";
import { Link } from "react-router-dom";

function SalesPage() {
  const [simpleStartDate, setSimpleStartDate] = useState(null);
  const [simpleFinalDate, setSimpleFinalDate] = useState(null);
  const [groupStartDate, setGroupStartDate] = useState(null);
  const [groupFinalDate, setGroupFinalDate] = useState(null);
  const navigate = useNavigate();

  function formatDate(date) {
    return date?.toISOString().split("T")[0]; // yyyy-MM-dd
  }

  const handleSimpleSubmit = async (e) => {
    e.preventDefault();

    const start = formatDate(simpleStartDate);
    const final = formatDate(simpleFinalDate);
    let initial;
    let end;
    try {
      // Pega o ano atual
      const currentYear = new Date().getFullYear();

      // Cria a string "YYYY-01-01"
      const firstDayOfYear = `${currentYear}-01-01`;

      // Data de hoje no formato YYYY-MM-DD
      const today = new Date().toISOString().split("T")[0];

      // Verifica os parâmetros da URL
      initial =
        start === undefined ? firstDayOfYear : searchParams.get("startDate");
      end = final === undefined ? today : searchParams.get("finalDate");

      const data = await fetchSales(initial, end);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }

    navigate(`/sales/simple?startDate=${initial}&finalDate=${end}`);
  };

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    const start = formatDate(simpleStartDate);
    const final = formatDate(simpleFinalDate);
    let initial;
    let end;
    try {
      // Pega o ano atual
      const currentYear = new Date().getFullYear();

      // Cria a string "YYYY-01-01"
      const firstDayOfYear = `${currentYear}-01-01`;

      // Data de hoje no formato YYYY-MM-DD
      const today = new Date().toISOString().split("T")[0];

      // Verifica os parâmetros da URL
      initial =
        start === undefined ? firstDayOfYear : searchParams.get("startDate");
      end = final === undefined ? today : searchParams.get("finalDate");

      const data = await fetchSales(initial, end);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }
    navigate(
      `/sales/grouping?startDate=${initial}&finalDate=${end}`
    );
  };


  return (
    <div className="min-h-screen  flex flex-col items-center justify-start py-10">
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
                  <Link
                    to={"/sales"}
                    className="block py-2 px-3 text-amber-50 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
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
        <h1 className="text-5xl text-center p-5  text-white">
          Registros de Vendas
        </h1>
        <Link to="/">
          <button className="text-white bg-gradient-to-r cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg text-2x1 px-5 py-2.5 text-center me-2 mb-2">
            Voltar
          </button>
        </Link>
      </div>

      {/* Pesquisa simples */}
      <div className="flex justify-center gap-10">
      <form
        onSubmit={handleSimpleSubmit}
        className="bg-slate-500 shadow-md rounded px-6 pt-6 pb-8  max-w-md w-full"
      >
        <p className="text-xl font-semibold text-slate-50 mb-4">
          Pesquisa simples
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-slate-50">Data Inicial</label>

          <DatePicker
            selected={simpleStartDate}
            onChange={(date) => setSimpleStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/aaaa"
            className="border bg-slate-50 border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>

          <label className="text-slate-50">Data Final</label>

          <DatePicker
            selected={simpleFinalDate}
            onChange={(date) => setSimpleFinalDate(date)}
            placeholderText="dd/mm/aaaa"
            dateFormat="dd/MM/yyyy"
            className="border bg-slate-50 border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>
          <button
            type="submit"
            className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            Pesquisar
          </button>
        </div>
      </form>

      {/* Pesquisa agrupada */}
      <form
        onSubmit={handleGroupSubmit}
        className="bg-slate-500 shadow-md rounded px-6 pt-6 pb-8 max-w-md w-full"
      >
        <p className="text-xl font-semibold text-slate-50 mb-4">
          Pesquisa agrupada
        </p>
        <div className="flex flex-col gap-4">
          <label className="text-slate-50">Data Inicial</label>
          <DatePicker
            selected={groupStartDate}
            onChange={(date) => setGroupStartDate(date)}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            className="border bg-slate-50 border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            showPopperArrow={false}
            isClearable
          ></DatePicker>
          <label className="text-slate-50">Data Final</label>

          <DatePicker
            selected={groupFinalDate}
            onChange={(date) => setGroupFinalDate(date)}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
            isClearable
            className="border bg-slate-50 border-blue-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></DatePicker>

          <button
            type="submit"
            className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            Pesquisar
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default SalesPage;
