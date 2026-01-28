"use server";

import { cookies } from "next/headers";

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
    status: number;
    sellerName: string;
    sellerDto: SellerDto;
}

interface GroupedSales {
    departmentName: string;
    sales: SalesRecord[];
}

interface SearchResult {
    success: boolean;
    data: GroupedSales[];
    message?: string;
}

export default async function SearchSalesGroupedAction(
    startDate: string,
    finalDate: string
): Promise<SearchResult> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("authToken")?.value;

        if (!token) {
            return {
                success: false,
                data: [],
                message: "Não autenticado",
            };
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Format dates for API (ISO format)
        const url = `${apiUrl}/api/SalesRecords/grouping?startDate=${startDate}&finalDate=${finalDate}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                data: [],
                message: errorText || "Erro ao buscar vendas agrupadas",
            };
        }

        const data = await response.json();

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        console.error("Error searching grouped sales:", error);
        return {
            success: false,
            data: [],
            message: "Erro ao buscar vendas agrupadas",
        };
    }
}
