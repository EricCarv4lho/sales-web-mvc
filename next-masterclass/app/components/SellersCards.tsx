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
  departmentName?: string;
  isActive?: boolean;
}


interface TableSellerProps {
  sellerList: Seller[];
  onDelete: (id: number) => void;
  onEdit: (seller: Seller) => void;
}

export default function SellersCard({ sellerList, onDelete, onEdit }: TableSellerProps) {

  const [modalDelete, setModalDelete] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(0);


  const onCloseModal = () => {
    setModalDelete(false);
  };


  return (
    <div>
      {sellerList.map((s) => (
        <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="font-semibold text-blue-900">{s.name}</p>
          <p className="text-sm text-gray-600">{s.email}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Departamento:</span> {s.departmentName || "-"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Nascimento:</span> {s.birthDate}
            </p>
            <p className="text-sm font-medium">
              Salário: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(s.baseSalary)}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onEdit(s)}
              className="flex-1 rounded-lg border border-blue-600 px-3 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Editar
            </button>
            <button onClick={() => {
              setModalDelete(true);
              setSelectedSellerId(s.id)
            }} className="flex-1 rounded-lg border border-red-500 px-3 py-2 text-red-500 hover:bg-red-50 transition-colors">
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
