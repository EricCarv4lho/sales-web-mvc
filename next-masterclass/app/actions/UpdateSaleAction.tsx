"use server";

import { cookies } from "next/headers";

interface SaleUpdateProps {

    date: string;
    amount: number;
    status: number;
    sellerId: number;
}

export default async function UpdateSaleAction(sale: SaleUpdateProps, id: number) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "Não autenticado" };
        }

        const response = await fetch(
            `http://localhost:5225/api/SalesRecords/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(sale),
            }
        );

        if (!response.ok) {
            return { success: false, message: "Erro ao atualizar venda" };
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: "Erro de conexão" };
    }
}
