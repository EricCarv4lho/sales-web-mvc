"use server"

import { cookies } from "next/headers";

export default async function FetchDepartmentsAction() {

try{
    const cookieStore = await cookies();

const token = cookieStore.get("token")?.value;

if (!token) {
      return { success: false, message: "Não autenticado" };
    }

    

const response = await fetch("http://localhost:5225/api/departments", {
    method: "GET",
    headers: {"Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
    },
    credentials: "include"
})


if(!response.ok){

    return {success: false, status: response.status}
}

const data = await response.json()

return {success: true, data}

}
catch(error){
    return {success: false, message: "Erro de conexão com a API"}
}  
}