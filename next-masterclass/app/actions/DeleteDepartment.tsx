"use server"

import { cookies } from "next/headers";

export default async function DeleteDepartment(id : number) {

 try { const cookieStore = await cookies()

 const token = cookieStore.get("token")?.value

 const response = await fetch(`http://localhost:5225/api/Departments/${id}`, {

    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    }
   




 })


 if(!response.ok) {

    return {success: false, status: response.status, message: "Falha ao Deletar"}
 }

 return {success: true, status: response.status, message: "Departamento deletado com sucesso!"}
}
catch (error) {
    return { success: false, message: "Erro de conexão com o servidor" };
  }
}