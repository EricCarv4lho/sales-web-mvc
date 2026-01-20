
"use server"

import { cookies } from "next/headers"


export default async function DeleteSeller(id : number) {


    try {
    
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value

    const response = await fetch(`http://localhost:5225/api/Sellers/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
        
        
    })

    if(!response.ok){
        return {success: false, status: response.status, message: "Erro ao deletar vendedor."}
    };
    
   
 
    if(response.status === 204)
    return {success: true, status: response.status, message: "Vendedor deletado com sucesso!"} 
    else  {return {success: false, message: "Erro no servidor."}}
}

catch(error){
    return {success: false, message: "Erro no servidor."}
}




}

    
    
    
