"use client";

import { useEffect, useState } from "react";
import FetchSellersAction from "../actions/FetchSellersAction";
import ModalDeleteSeller from "./ModalDeleteSeller";
import DeleteSeller from "../actions/DeleteSeller";

interface Seller {
  id: number;
  name: string;
  email: string;
  baseSalary: number;
  birthDate: string;
  departmentId: number;
  departmentName: string;
}


interface TableSellerProps {
  sellerList: Seller[];
  onDelete: (id: number) => {};
}

export default function SellersCard({sellerList, onDelete}: TableSellerProps) {

  const [modalDelete, setModalDelete] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(0);

  
    const onCloseModal = () => {
      setModalDelete(false);
    };
  

  return (
    <div>
      {sellerList.map((s) => (
        <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="font-semibold text-blue-900"></p>
          <p className="text-sm text-gray-600">{s.name}</p>
          <p className="text-sm text-gray-600">{s.email}</p>
          <p className="mt-2 text-sm font-medium">Salário: {s.baseSalary}</p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg border border-blue-600 px-3 py-2 text-blue-600">
              Editar
            </button>
            <button onClick={() => {
              setModalDelete(true);
              setSelectedSellerId(s.id)}} className="flex-1 rounded-lg border border-red-500 px-3 py-2 text-red-500">
              Excluir
            </button>
          </div>
        </div>
      ))}

      

      {modalDelete && (
        <ModalDeleteSeller onDelete={() => onDelete(selectedSellerId)} onClose={onCloseModal} />
      )}

    </div>
  );
}
