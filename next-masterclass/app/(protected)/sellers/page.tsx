"use client";

import CreateNewSeller from "@/app/actions/CreateNewSeller";
import FetchSellersAction from "@/app/actions/FetchSellersAction";
import FormNewSeller from "@/app/components/FormNewSeller";
import SellersCard from "@/app/components/SellersCards";
import SellersTable from "@/app/components/SellersTable";
import { useState } from "react";

export default function SellersPage() {
  interface Seller {
    id: number;
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
    departmentName: string;
  }

  const [formNewSeller, setFormNewSeller] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);

  interface SellerModelProps {
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
  }

  const onClose = () => {
    setFormNewSeller(false);
  };

  const fetchSellers = async () => {
    const result = await FetchSellersAction();

    if (result.success) {
      setSellers(result.data);
    } else {
      alert("Erro ao criar vendedor");
    }
  };

  const onSubmitCreateSeller = async (data: SellerModelProps) => {


    const result = await CreateNewSeller(data);
    if (result.success) {
      fetchSellers();
      setFormNewSeller(false);
    } else {
      alert("Erro ao criar departamento no servidor");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 flex flex-col">
      {/* Header */}

      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Vendedores
        </h1>
        <button
          onClick={() => setFormNewSeller(true)}
          className="w-full sm:w-auto rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo Vendedor
        </button>
      </header>

      {/* Mobile Cards */}
      <div className="flex  flex-col gap-4 sm:hidden">
        <SellersCard />
      </div>

      <SellersTable />

      {formNewSeller && (
        <div  onClick={() => {
              onClose();
            }} className="fixed  inset-0 cursor-pointer  flex flex-col  items-center justify-center bg-black/50 ">
          <div
           onClick={(e) => e.stopPropagation()}
            className="absolute w-full max-w-[400px]  bg-blue-300"
          >
            <FormNewSeller onCreate={onSubmitCreateSeller} />
          </div>
        </div>
      )}
    </div>
  );
}
