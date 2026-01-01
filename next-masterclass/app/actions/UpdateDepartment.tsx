"use server";

import { cookies } from "next/headers";

interface Department {
  id: number;
  name: string;
}

export default async function UpdateDepartment({ id, name }: Department) {
  try {
    const cookieStore = await cookies();

    const dataBody: {
      Name: string;
    } = { Name: name };

    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      `http://localhost:5225/api/Departments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataBody),
      }
    );
    console.log(id);

    console.log(response);
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: "Erro ao atualizar",
      };
    }

    if (response.status === 204) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
