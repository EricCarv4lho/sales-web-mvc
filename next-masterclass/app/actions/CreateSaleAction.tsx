"use server";
import { cookies } from "next/headers";

interface SaleModelProps {
    date: string;
    amount: number;
    status: number;
    sellerId: number;
}

export default async function CreateSaleAction(data: SaleModelProps) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "Não autenticado" };
        }

        const response = await fetch("http://localhost:5225/api/SalesRecords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                message: result.message || "Erro ao criar venda",
            };
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: "Erro de conexão com o servidor" };
    }
}
