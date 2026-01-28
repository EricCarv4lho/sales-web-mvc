"use server";

import { cookies } from "next/headers";

export default async function FetchSimpleSearchAction(minDate: string, maxDate: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "Não autenticado" };
        }

        const queryParams = new URLSearchParams({
            startDate: minDate,
            finalDate: maxDate
        });

        const response = await fetch(`http://localhost:5225/api/SalesRecords/simple?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            cache: "no-store"
        });

        if (!response.ok) {
            return { success: false, status: response.status, message: "Erro ao buscar vendas" };
        }

        const result = await response.json();
        return { success: true, data: result };

    } catch (error) {
        return { success: false, message: "Erro de conexão com a API" };
    }
}
