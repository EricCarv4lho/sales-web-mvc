"use client";

import CreateNewSeller from "@/app/actions/CreateNewSeller";
import DeleteSeller from "@/app/actions/DeleteSeller";
import FetchSellersAction from "@/app/actions/FetchSellersAction";
import FetchDepartmentsAction from "@/app/actions/FetchDepartmentsAction";
import UpdateSeller from "@/app/actions/UpdateSeller"; // New action
import FormNewSeller from "@/app/components/FormNewSeller";
import FormUpdateSeller from "@/app/components/FormUpdateSeller";
import SellersCard from "@/app/components/SellersCards";
import SellersTable from "@/app/components/SellersTable";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

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



interface Department {
  id: number;
  name: string;
}

interface SellerModelProps {
  name: string;
  email: string;
  baseSalary: number;
  birthDate: string;
  departmentId: number;
}

export default function SellersPage() {
  const [formNewSeller, setFormNewSeller] = useState(false);
  const [formUpdateSeller, setFormUpdateSeller] = useState(false);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const fetchData = async () => {
    const [sellersRes, departmentsRes] = await Promise.all([
      FetchSellersAction(),
      FetchDepartmentsAction(),
    ]);

    if (sellersRes.success) {
      // Format date for display or keep as is? 
      // Existing code formatted it. Let's keep consistency.
      const data = sellersRes.data;
      const formatted = data.map((s: any) => ({
        ...s,
        birthDate: new Date(s.birthDate).toLocaleDateString("pt-BR"),
      }));
      setSellers(formatted);
    }

    if (departmentsRes.success) {
      setDepartments(departmentsRes.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSeller = async (id: number) => {
    const result = await DeleteSeller(id);
    if (result.success) {
      setSellers((prev) => prev.filter((s) => s.id !== id));
      setFormUpdateSeller(false);
    } else {
      alert("Erro ao excluir: " + result.message);
    }
  };

  const onSubmitCreateSeller = async (data: SellerModelProps) => {
    const result = await CreateNewSeller(data);
    if (result.success) {
      await fetchData();
      setFormNewSeller(false);
    } else {
      alert("Erro ao criar vendedor: " + result.message);
    }
  };

  const onUpdate = async (data: Seller) => {
    

    const result = await UpdateSeller(data);
    if (result.success) {
      await fetchData();
      setFormUpdateSeller(false);
    } else {
      alert("Erro ao atualizar: " + result.message);
    }
  }

  const handleEditClick = (seller: Seller) => {
    setSelectedSeller(seller);
    setFormUpdateSeller(true);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 flex flex-col">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Gerenciar Vendedores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Controle de equipe e comissões
          </p>
        </div>
        <button
          onClick={() => setFormNewSeller(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="h-5 w-5" />
          Novo Vendedor
        </button>
      </header>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        <SellersCard
          onDelete={handleDeleteSeller}
          onEdit={handleEditClick}
          sellerList={sellers}
        />
      </div>

      <SellersTable
        sellerList={sellers}
        onDelete={handleDeleteSeller}
        onEdit={handleEditClick}
      />

      {formNewSeller && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setFormNewSeller(false)}
          ></div>
          <div className="relative z-10 w-full flex justify-center">
            <FormNewSeller
              onCreate={onSubmitCreateSeller}
              departments={departments}
              onCancel={() => setFormNewSeller(false)}
            />
          </div>
        </div>
      )}

      {formUpdateSeller && selectedSeller && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setFormUpdateSeller(false)}
          ></div>
          <div className="relative z-10 w-full flex justify-center">
            <FormUpdateSeller
              initialData={selectedSeller}
              onUpdate={onUpdate}
              onDelete={handleDeleteSeller}
              departments={departments}
              onCancel={() => setFormUpdateSeller(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
