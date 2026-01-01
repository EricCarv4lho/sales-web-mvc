"use server";
import { cookies } from "next/headers";

export default async function CreateNewDepartment(data: { name: string }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch("http://localhost:5225/api/Departments", {
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
