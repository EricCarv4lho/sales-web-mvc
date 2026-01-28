"use server";

import { cookies } from "next/headers";

interface Seller {
    id: number;
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
    departmentName?: string;

}


export default async function UpdateSeller(seller: Seller) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "Não autenticado" };
        }

        const response = await fetch(
            `http://localhost:5225/api/sellers/${seller.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(seller),
            }
        );

        if (!response.ok) {
            return { success: false, message: "Erro ao atualizar vendedor" };
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: "Erro de conexão" };
    }
}
