"use client";

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

interface SalesTableProps {
    sales: SalesRecord[];
}

export default function SalesTable({ sales, onEdit }: SalesTableProps & { onEdit?: (sale: SalesRecord) => void }) {
    const getStatusColor = (status: SaleStatus) => {
        switch (status) {
            case SaleStatus.Faturado:
                return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20";
            case SaleStatus.Pendente:
                return "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20";
            case SaleStatus.Cancelado:
                return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10";
            default:
                return "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10";
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

    return (
        <div className="hidden sm:block overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
            <table className="w-full border-collapse">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Data
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Vendedor
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Valor
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        {onEdit && (
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                #{sale.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {formatDate(sale.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className="flex flex-col">
                                    <span>{sale.sellerName}</span>
                                    <span className="text-xs text-gray-400 font-normal">{sale.sellerDto?.email || "-"}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                                {formatCurrency(sale.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                                        sale.status
                                    )}`}
                                >
                                    {getStatusLabel(sale.status)}
                                </span>
                            </td>
                            {onEdit && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button
                                        onClick={() => onEdit(sale)}
                                        className="text-blue-600 hover:text-blue-900 font-medium"
                                    >
                                        Editar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
