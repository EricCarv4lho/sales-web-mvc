"use client"

import { useEffect, useState } from "react"
import FetchSellersAction from "../actions/FetchSellersAction"
import { LargeNumberLike } from "crypto"

interface Seller {
    id: number,
    name: string,
     email : string,
    baseSalary: number,
   birthDate : string,
    departmentId: number,
    departmentName: string;
}


export default function SellersTable () {

    const [sellers, setSellers] = useState<Seller[]>([]);

  const fetchSellers = async () => {
    const result = await FetchSellersAction();

    if(result.success) {
      
       
        const data = result.data;

         const formatted = data.map((s: any) => ({
    ...s,
    birthDate: new Date(s.birthDate).toLocaleDateString("pt-BR"),
  }));
        
        setSellers(formatted);
    } 
    else{
    console.error(result.message);
      
    }
  }

  
  useEffect(() => {
      fetchSellers();
    }, []);
  

   

    return (
        <div className="hidden sm:block overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">
                Salário
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">
                Data de Nascimento
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>

            {sellers.map((s) => (
                <tr key={s.id} className="border-b">
              <td className="px-4 py-3">{s.name}</td>
              <td className="px-4 py-3">{s.email}</td>
              <td className="px-4 py-3">{s.baseSalary}</td>
              <td className="px-4 py-3">{s.birthDate}</td>
              <td className="px-4 py-3 flex gap-2">
                <button className="rounded-lg border border-blue-600 px-3 py-1 text-blue-600">
                  Editar
                </button>
                <button className="rounded-lg border border-red-500 px-3 py-1 text-red-500">
                  Excluir
                </button>
              </td>
            </tr>
            ))}
            
            
          </tbody>
        </table>
      </div>
    )
}