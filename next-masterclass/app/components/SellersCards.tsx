"use client";

import { useEffect, useState } from "react";
import FetchSellersAction from "../actions/FetchSellersAction";

interface Seller {
  id: number;
  name: string;
  email: string;
  baseSalary: number;
  birthDate: string;
  departmentId: number;
  departmentName: string;
}

export default function SellersCard() {
  const [sellers, setSellers] = useState<Seller[]>([]);

  const fetchSellers = async () => {
    const result = await FetchSellersAction();

    if (result.success) {
      const data = result.data;

      const formatted = data.map((s: any) => ({
        ...s,
        birthDate: new Date(s.birthDate).toLocaleDateString("pt-BR"),
      }));

      setSellers(formatted);
    } else {
      console.error(result.message);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div>
      {sellers.map((s) => (
        <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="font-semibold text-blue-900"></p>
          <p className="text-sm text-gray-600">{s.name}</p>
          <p className="text-sm text-gray-600">{s.email}</p>
          <p className="mt-2 text-sm font-medium">Salário: {s.baseSalary}</p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg border border-blue-600 px-3 py-2 text-blue-600">
              Editar
            </button>
            <button className="flex-1 rounded-lg border border-red-500 px-3 py-2 text-red-500">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
