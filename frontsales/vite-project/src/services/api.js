const API_BASE = "https://localhost:7264/api";

export async function fetchDepartments() {
    const response = await fetch(`${API_BASE}/departments`);
    if(!response.ok) throw new Error("Error when searching departments.");
    return response.json();

}

export async function fetchSellers(){
  const response = await fetch(`${API_BASE}/sellers`);
  if(!response.ok) throw new Error("Error when searching sellers.")
    return response.json();
}

export async function deleteSellers(id) {
  const response = await fetch(`${API_BASE}/sellers/${id}`, {
    method: "DELETE",
    }
  
  );
 if(!response.ok){
  throw new Error("Erro ao deletar vendedor");
 }
 return true;


}


export async function deleteDepartment(id) {
  const response = await fetch(`${API_BASE}/departments/${id}`, {
    method: "DELETE",
    }
  
  );
 if(!response.ok){
  throw new Error("Erro ao deletar vendedor");
 }
 return true;


}

export async function createSellerApi(seller){
  const response = await fetch(`${API_BASE}/sellers`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seller),
  });

  if(!response.ok) {
     throw new Error("Erro ao salvar vendedor");
  }

  const data = await response.json();
  return data;
}

export async function createDepartmentApi(department) {
  const response = await fetch(`${API_BASE}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro da API:", errorText);
    throw new Error("Erro ao salvar departamento");
  }

  const data = await response.json();
  return data;
}
