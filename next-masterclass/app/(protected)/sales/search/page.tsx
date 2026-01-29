"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/app/components/SearchForm";
import SalesCard from "@/app/components/SalesCard";
import SalesTable from "@/app/components/SalesTable";
import GroupedSalesCard from "@/app/components/GroupedSalesCard";
import GroupedSalesTable from "@/app/components/GroupedSalesTable";
import FetchSimpleSearchAction from "@/app/actions/FetchSimpleSearchAction";
import FetchGroupedSearchAction from "@/app/actions/FetchGroupedSearchAction";
import { Search, TrendingUp } from "lucide-react";
import DeleteSaleAction from "@/app/actions/DeleteSaleAction";

function SalesSearchContent() {
    const searchParams = useSearchParams();
    const minDate = searchParams.get("minDate");
    const maxDate = searchParams.get("maxDate");

    const [activeTab, setActiveTab] = useState<"simple" | "grouped">("simple");
    const [simpleData, setSimpleData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    async function fetchData() {
        if (!minDate || !maxDate) return;

        setLoading(true);
        setHasSearched(true);
        try {
            if (activeTab === "simple") {
                const result = await FetchSimpleSearchAction(minDate, maxDate);
                if (result.success) setSimpleData(result.data);
            } else {
                const result = await FetchGroupedSearchAction(minDate, maxDate);
                if (result.success) setGroupedData(result.data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [activeTab, minDate, maxDate]);

    const handleDeleteSale = async (id: number) => {
        const result = await DeleteSaleAction(id)
        if (result.success) {
            fetchData()
        } else {
            alert(result.message)
        }
    }

    const calculateTotalSales = () => {
        if (activeTab === "simple") {
            return simpleData.reduce((sum: number, sale: any) => sum + sale.amount, 0);
        } else {
            return groupedData.reduce((sum: number, group: any) => {
                return sum + group.sales.reduce((groupSum: number, sale: any) => groupSum + sale.amount, 0);
            }, 0);
        }
    };

    const getTotalCount = () => {
        if (activeTab === "simple") {
            return simpleData.length;
        } else {
            return groupedData.reduce((sum: number, group: any) => sum + group.sales.length, 0);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <div className="flex flex-col gap-6">
            <SearchForm />

            {/* Results Summary */}
            {hasSearched && !loading && (simpleData.length > 0 || groupedData.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total de Vendas</p>
                                <p className="text-xl font-bold text-gray-900">{getTotalCount()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Valor Total</p>
                                <p className="text-xl font-bold text-green-600">{formatCurrency(calculateTotalSales())}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                <nav className="flex gap-2">
                    <button
                        onClick={() => setActiveTab("simple")}
                        className={`
                            flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all
                            ${activeTab === "simple"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }
                        `}
                    >
                        Pesquisa Simples
                    </button>
                    <button
                        onClick={() => setActiveTab("grouped")}
                        className={`
                            flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all
                            ${activeTab === "grouped"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }
                        `}
                    >
                        Pesquisa Agrupada
                    </button>
                </nav>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-blue-900 font-medium">Pesquisando vendas...</p>
                </div>
            ) : !hasSearched ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Selecione um período para pesquisar</p>
                    <p className="text-sm text-gray-400 mt-1">Use os filtros acima para começar</p>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeTab === "simple" ? (
                        simpleData.length > 0 ? (
                            <>
                                <div className="sm:hidden">
                                    <SalesCard sales={simpleData} onDelete={handleDeleteSale} />
                                </div>
                                <div className="hidden sm:block">
                                    <SalesTable sales={simpleData} onDelete={handleDeleteSale} />
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Nenhuma venda encontrada no período selecionado</p>
                            </div>
                        )
                    ) : (
                        groupedData.length > 0 ? (
                            <>
                                <div className="sm:hidden">
                                    <GroupedSalesCard groupedSales={groupedData} onDelete={handleDeleteSale} />
                                </div>
                                <div className="hidden sm:block">
                                    <GroupedSalesTable groupedSales={groupedData} onDelete={handleDeleteSale} />
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Nenhuma venda encontrada no período selecionado</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default function SalesSearchPage() {
    return (
        <div className="min-h-screen bg-blue-50 p-4 sm:p-6 flex flex-col">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    <Search className="h-6 w-6 text-blue-600" />
                    Pesquisa de Vendas
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Filtre e analise o histórico de vendas por período
                </p>
            </header>

            <Suspense fallback={<div>Carregando filtros...</div>}>
                <SalesSearchContent />
            </Suspense>
        </div>
    );
}
