"use client";

import { useMemo } from "react";

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

interface SalesCardProps {
    sales: SalesRecord[];
}

export default function SalesCard({ sales }: SalesCardProps) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Faturado":
                return "bg-green-100 text-green-800 border-green-200";
            case "Pendente":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Cancelado":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "Faturado":
                return "Faturado";
            case "Pendente":
                return "Pendente";
            case "Cancelado":
                return "Cancelado";
            default:
                return "Desconhecido";
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR");
    }

    return (
        <div className="flex flex-col gap-4">
            {sales.map((sale) => (
                <div key={sale.id} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{sale.sellerName}</p>
                            <p className="text-xs text-gray-400">ID: {sale.id}</p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                sale.status
                            )}`}
                        >
                            {getStatusLabel(sale.status)}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Data</span>
                            <span className="text-sm font-medium text-gray-700">{formatDate(sale.date)}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="text-sm text-gray-500">Valor</span>
                            <span className="text-lg font-bold text-blue-600">{formatCurrency(sale.amount)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
