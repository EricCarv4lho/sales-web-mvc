"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, DollarSign } from "lucide-react";

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
    status: SaleStatus;
    sellerName: string;
    sellerDto: SellerDto;
}

interface GroupedSales {
    departmentName: string;
    sales: SalesRecord[];
}

interface GroupedSalesCardProps {
    groupedSales: GroupedSales[];
}

export default function GroupedSalesCard({ groupedSales }: GroupedSalesCardProps) {
    const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set());

    const toggleDepartment = (deptName: string) => {
        const newExpanded = new Set(expandedDepts);
        if (newExpanded.has(deptName)) {
            newExpanded.delete(deptName);
        } else {
            newExpanded.add(deptName);
        }
        setExpandedDepts(newExpanded);
    };

    const getStatusColor = (status: SaleStatus) => {
        switch (status) {
            case SaleStatus.Faturado:
                return "bg-green-100 text-green-800 border-green-200";
            case SaleStatus.Pendente:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case SaleStatus.Cancelado:
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusLabel = (status: SaleStatus) => {
        switch (status) {
            case SaleStatus.Faturado:
                return "Faturado";
            case SaleStatus.Pendente:
                return "Pendente";
            case SaleStatus.Cancelado:
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
    };

    const calculateTotal = (sales: SalesRecord[]) => {
        return sales.reduce((sum, sale) => sum + sale.amount, 0);
    };

    if (groupedSales.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">Nenhuma venda encontrada</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {groupedSales.map((group) => {
                const isExpanded = expandedDepts.has(group.departmentName);
                const total = calculateTotal(group.sales);

                return (
                    <div
                        key={group.departmentName}
                        className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden"
                    >
                        {/* Department Header */}
                        <button
                            onClick={() => toggleDepartment(group.departmentName)}
                            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-1 text-left">
                                <h3 className="font-bold text-gray-900 text-lg">
                                    {group.departmentName}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-sm text-gray-500">
                                        {group.sales.length} {group.sales.length === 1 ? "venda" : "vendas"}
                                    </span>
                                    <span className="text-sm font-semibold text-blue-600">
                                        {formatCurrency(total)}
                                    </span>
                                </div>
                            </div>
                            {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                        </button>

                        {/* Sales List */}
                        {isExpanded && (
                            <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                                {group.sales.map((sale) => (
                                    <div
                                        key={sale.id}
                                        className="rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-semibold text-gray-900">{sale.sellerName}</p>
                                                <p className="text-xs text-gray-400">ID: {sale.id}</p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                    sale.status
                                                )}`}
                                            >
                                                {getStatusLabel(sale.status)}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Data</span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {formatDate(sale.date)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Valor</span>
                                                <span className="text-base font-bold text-blue-600">
                                                    {formatCurrency(sale.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
