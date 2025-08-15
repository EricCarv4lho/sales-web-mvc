import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOneDepartment } from "../services/api";
function DepartmentDetailsPage() {

const { id } = useParams();
const [department, setDepartment] = useState({});

  useEffect(() => {
    fetchOneDepartment(id)
      .then((data) => setDepartment(data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="h-screen overflow-y-auto">
      {/* Conteúdo de cima */}
      <div className="h-screen flex justify-center items-center">
        
        
       
         <div className=" bg-white flex flex-col gap-5 p-10 w-3/12 justify-center ">
         
<p className=" text-4xl font-bold">{department.name}</p>
<p className ="bg-gray-300">Vendedores: </p>

<ul className="flex flex-col gap-5">
  {department?.sellers?.map((s) => (
    <li className="bg-gray-100" key={s.id}>{s.name}</li>
  ))}
</ul>


         <div>
         <Link to={'/departments'}>
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


export default DepartmentDetailsPage;