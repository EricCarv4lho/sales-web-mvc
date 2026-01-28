"use client";

import React from "react";

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

interface GroupedSalesTableProps {
    groupedSales: GroupedSales[];
}

export default function GroupedSalesTable({ groupedSales }: GroupedSalesTableProps) {
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

    const calculateGrandTotal = () => {
        return groupedSales.reduce((sum, group) => sum + calculateTotal(group.sales), 0);
    };

    if (groupedSales.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">Nenhuma venda encontrada</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Vendedor
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Data
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Valor
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedSales.map((group, groupIndex) => (
                            <React.Fragment key={`dept-${group.departmentName}`}>
                                {/* Department Header Row */}
                                <tr className="bg-blue-50 border-y border-blue-200">
                                    <td colSpan={5} className="px-6 py-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-blue-900 text-sm">
                                                {group.departmentName}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-blue-700">
                                                    {group.sales.length} {group.sales.length === 1 ? "venda" : "vendas"}
                                                </span>
                                                <span className="text-sm font-semibold text-blue-900">
                                                    Subtotal: {formatCurrency(calculateTotal(group.sales))}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                {/* Sales Rows */}
                                {group.sales.map((sale, saleIndex) => (
                                    <tr
                                        key={sale.id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${saleIndex === group.sales.length - 1 ? "border-b-2 border-gray-200" : ""
                                            }`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-500">#{sale.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">{sale.sellerName}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sale.date)}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-blue-600">
                                                {formatCurrency(sale.amount)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                    sale.status
                                                )}`}
                                            >
                                                {getStatusLabel(sale.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}

                        {/* Grand Total Row */}
                        <tr className="bg-blue-900 text-white font-bold">
                            <td colSpan={3} className="px-6 py-4 text-sm uppercase tracking-wide">
                                Total Geral
                            </td>
                            <td colSpan={2} className="px-6 py-4 text-base">
                                {formatCurrency(calculateGrandTotal())}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
