"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [minDate, setMinDate] = useState(searchParams.get("minDate") || "");
    const [maxDate, setMaxDate] = useState(searchParams.get("maxDate") || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (minDate) params.set("minDate", minDate);
        else params.delete("minDate");

        if (maxDate) params.set("maxDate", maxDate);
        else params.delete("maxDate");

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
                <label className="text-xs font-semibold text-gray-500 uppercase">Data Inicial</label>
                <input
                    type="date"
                    value={minDate}
                    onChange={(e) => setMinDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm h-[42px]"
                />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-auto">
                <label className="text-xs font-semibold text-gray-500 uppercase">Data Final</label>
                <input
                    type="date"
                    value={maxDate}
                    onChange={(e) => setMaxDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm h-[42px]"
                />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-auto sm:justify-end">
                <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm font-medium h-[42px]"
                >
                    <Search className="h-4 w-4" />
                    Pesquisar
                </button>
            </div>
        </form>
    );
}
