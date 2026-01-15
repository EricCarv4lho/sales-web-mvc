"use server";
import { cookies } from "next/headers";

interface SellerModelProps {
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
  }


export default async function CreateNewSeller(data: SellerModelProps) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch("http://localhost:5225/api/Sellers", {
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
        message: result.message || "Erro na API",
      };
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: "Erro de conexão com o servidor" };
  }
}
