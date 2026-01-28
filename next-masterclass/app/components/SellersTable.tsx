"use client";

import { useState } from "react";
import ModalDeleteSeller from "./ModalDeleteSeller";
import { Edit, Trash2 } from "lucide-react";

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

export default function SellersTable({
  sellerList,
  onDelete,
  onEdit,
}: TableSellerProps) {
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(0);

  const onCloseModal = () => {
    setModalDelete(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="hidden sm:block overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Salário
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Data de Nascimento
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Departamento
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sellerList.map((s) => (
            <tr key={s.id} className="hover:bg-blue-50/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {s.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {s.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {formatCurrency(s.baseSalary)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {s.birthDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {s.departmentName || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-50 rounded-md"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setModalDelete(true);
                      setSelectedSellerId(s.id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded-md"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalDelete && (
        <ModalDeleteSeller
          onDelete={() => onDelete(selectedSellerId)}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
}
