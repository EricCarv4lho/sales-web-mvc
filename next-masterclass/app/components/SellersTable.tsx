"use client";

import { useEffect, useState } from "react";
import FetchSellersAction from "../actions/FetchSellersAction";
import { LargeNumberLike } from "crypto";
import DeleteSeller from "../actions/DeleteSeller";
import ModalDeleteSeller from "./ModalDeleteSeller";

interface Seller {
  id: number;
  name: string;
  email: string;
  baseSalary: number;
  birthDate: string;
  departmentId: number;
  departmentName: string;
  isActive: boolean
}

interface TableSellerProps {
  sellerList: Seller[];
  onDelete: (id: number) => {};
 
}

export default function SellersTable({sellerList, onDelete}: TableSellerProps) {

  const [modalDelete, setModalDelete] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(0);
  

 


  const onCloseModal = () => {
    setModalDelete(false);
  };

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
          {sellerList.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="px-4 py-3">{s.name}</td>
              <td className="px-4 py-3">{s.email}</td>
              <td className="px-4 py-3">{s.baseSalary}</td>
              <td className="px-4 py-3">{s.birthDate}</td>
              <td className="px-4 py-3 flex gap-2">
                <button className="rounded-lg border border-blue-600 px-3 py-1 text-blue-600">
                  Editar
                </button>
                <button
                  onClick={() => {
                    setModalDelete(true);
                    setSelectedSellerId(s.id)}}
                  className="rounded-lg border border-red-500 px-3 py-1 text-red-500"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalDelete && (
        <ModalDeleteSeller onDelete={() => onDelete(selectedSellerId)} onClose={onCloseModal} />
      )}
    </div>
  );
}
