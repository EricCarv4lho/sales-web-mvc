"use client";

import { useEffect, useState } from "react";
import FetchSalesRecordsAction from "@/app/actions/FetchSalesRecordsAction";
import FetchSellersAction from "@/app/actions/FetchSellersAction";
import CreateSaleAction from "@/app/actions/CreateSaleAction";
import UpdateSaleAction from "@/app/actions/UpdateSaleAction";
import SalesCard from "@/app/components/SalesCard";
import SalesTable from "@/app/components/SalesTable";
import FormNewSale from "@/app/components/FormNewSale";
import { DollarSign, Plus, Search } from "lucide-react";
import Link from "next/link";
import ModalDeleteSales from "@/app/components/ModalDeleteSales";
import DeleteSaleAction from "@/app/actions/DeleteSaleAction";

enum SaleStatus {
    Pendente = 0,
    Faturado = 1,
    Cancelado = 2,
}

interface SellerDto {
    id: number;
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
    departmentName?: string;
    isActive?: boolean;
}

interface SalesRecord {
    id: number;
    date: string;
    amount: number;
    status: string;
    sellerName: string;
    sellerDto: SellerDto;
}

interface Seller {
    id: number;
    name: string;
}

interface SaleModelProps {
    id?: number;
    date: string;
    amount: number;
    status: string;
    sellerId: number;
}


export default function SalesPage() {
    const [sales, setSales] = useState<SalesRecord[]>([]);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingSale, setEditingSale] = useState<SalesRecord | null>(null);

    async function fetchData() {
        try {
            const [salesResult, sellersResult] = await Promise.all([
                FetchSalesRecordsAction(),
                FetchSellersAction()
            ]);

            if (salesResult.success) {
                setSales(salesResult.data);
            }

            if (sellersResult.success) {
                setSellers(sellersResult.data);
            }

        } catch (error) {
            console.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateSale = async (data: SaleModelProps) => {
        try {
            const result = await CreateSaleAction(data as any);
            if (result.success) {
                setIsModalOpen(false);
                fetchData(); // Refresh list
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error creating sale", error);
        }
    };

    const handleUpdateSale = async (data: SaleModelProps) => {
        try {
            const result = await UpdateSaleAction(data as any, data.id as number);
            if (result.success) {
                setIsModalOpen(false);
                setEditingSale(null);
                fetchData(); // Refresh list
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error updating sale", error);
        }
    };

    const onEditClick = (sale: SalesRecord) => {
        setEditingSale(sale);
        setIsModalOpen(true);
    };

    const handleDeleteSale = async (id: number) => {
        const result = await DeleteSaleAction(id);
        if (result.success) {
            fetchData();
        } else {
            alert("Erro ao excluir: " + result.message);
        }
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingSale(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-blue-900 font-medium">Carregando vendas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 p-4 sm:p-6 flex flex-col relative">
            {/* Header */}
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                        Vendas
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Histórico completo de vendas
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/sales/search"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-sm text-sm font-medium"
                    >
                        <Search className="h-4 w-4" />
                        Pesquisar
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Venda
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="w-full">
                <div className="sm:hidden">
                    <SalesCard sales={sales} onEdit={onEditClick} onDelete={handleDeleteSale} />
                </div>
                <div className="hidden sm:block">
                    <SalesTable sales={sales} onEdit={onEditClick} onDelete={handleDeleteSale} />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <FormNewSale
                        sellers={sellers}
                        onCancel={handleModalClose}
                        onSubmit={editingSale ? handleUpdateSale : handleCreateSale}
                        initialData={
                            editingSale
                                ? {
                                    id: editingSale.id,
                                    date: editingSale.date,
                                    amount: editingSale.amount,
                                    status: editingSale.status,
                                    sellerId: editingSale.sellerDto?.id || 0,
                                }
                                : undefined
                        }
                    />
                </div>
            )}



        </div>
    );
}
