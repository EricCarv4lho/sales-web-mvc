"use client";

import { useState } from "react";
import { Search, Calendar } from "lucide-react";

interface SearchSalesFormProps {
    onSearch: (startDate: string, finalDate: string, mode: "simple" | "grouped") => void;
    loading?: boolean;
}

export default function SearchSalesForm({ onSearch, loading = false }: SearchSalesFormProps) {
    const [startDate, setStartDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [mode, setMode] = useState<"simple" | "grouped">("simple");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!startDate || !finalDate) {
            setError("Por favor, preencha ambas as datas");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(finalDate);

        if (start > end) {
            setError("A data inicial deve ser anterior à data final");
            return;
        }

        onSearch(startDate, finalDate, mode);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Mode Toggle */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Modo de Pesquisa
                </label>
                <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                    <button
                        type="button"
                        onClick={() => setMode("simple")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === "simple"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Simples
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("grouped")}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === "grouped"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        Agrupado
                    </button>
                </div>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Data Inicial
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="finalDate" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Data Final
                    </label>
                    <input
                        type="date"
                        id="finalDate"
                        value={finalDate}
                        onChange={(e) => setFinalDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        disabled={loading}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Search Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Pesquisando...
                    </>
                ) : (
                    <>
                        <Search className="h-4 w-4" />
                        Pesquisar Vendas
                    </>
                )}
            </button>

            {/* Info Text */}
            <p className="mt-3 text-xs text-gray-500 text-center">
                {mode === "simple"
                    ? "Pesquisa simples retorna uma lista de todas as vendas no período"
                    : "Pesquisa agrupada organiza as vendas por departamento"}
            </p>
        </form>
    );
}
