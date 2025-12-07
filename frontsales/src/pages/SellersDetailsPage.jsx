
import { useEffect, useState } from "react";
import { fetchOneSeller } from "../services/api";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";


function SellersDetailsPage() {
  
const { id } = useParams();

const [seller, setSeller] = useState({});

  useEffect(() => {
    fetchOneSeller(id)
      .then((data) => setSeller(data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="h-screen overflow-y-auto">

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
      {/* Conteúdo de cima */}
      <div className="h-screen flex justify-center items-center">
        
        
       
         <div className=" bg-white flex flex-col gap-5 p-10 w-3/12 justify-center ">
<p className="bg-gray-100">Nome: {seller.name}</p>
         <p  className="bg-gray-100">Email: {seller.email}</p>
         
         <p  className="bg-gray-100">Data de nascimento: {new Date(seller.birthDate).toLocaleDateString('pt-BR')}</p>
         <p  className="bg-gray-100">Salario: {seller.baseSalary}</p>
         <p  className="bg-gray-100">Departamento: {seller.departmentName}</p>


         <div>
         <Link to={'/sellers'}>
         <button type="button" 
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
           dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Voltar
           </button></Link>

         </div>
         </div>
         
        </div>
      
      
      </div>

    
  );
}

export default SellersDetailsPage;
