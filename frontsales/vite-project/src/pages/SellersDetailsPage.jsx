
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
