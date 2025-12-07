const API_BASE = "https://localhost:7264/api";

export async function fetchDepartments() {
    const response = await fetch(`${API_BASE}/departments`);
    if(!response.ok) throw new Error("Error when searching departments.");
    return response.json();

}

export async function fetchOneDepartment(id) {
  const response = await fetch(`${API_BASE}/departments/${id}`)
  if(!response.ok) throw new Error("Error when searching department.")
    return response.json();
}

export async function fetchSellers(){
  const response = await fetch(`${API_BASE}/sellers`);
  if(!response.ok) throw new Error("Error when searching sellers.")
    return response.json();
}

export async function fetchOneSeller(id) {
   const response = await fetch(`${API_BASE}/sellers/${id}`);
  if(!response.ok) throw new Error("Error when searching seller.")
    return response.json();
}


export async function updateSeller(id ,seller) {
  try {
    const response = await fetch(`${API_BASE}/sellers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller), 
    });

    if (response.status === 204) {
      return true;
    }
    if(response.ok) {
      return await response.json();
    }
    
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar o vendedor.");
  } catch (error) {
    console.error("Erro no updateSeller", error);
    
    throw error;
  }

    
  
  

   

   
 
}


export async function updateDepartment(id, department) {
  try {
    const response = await fetch(`${API_BASE}/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department)
    });

    if (response.status === 204) {
      return true;
    }

    if (response.ok) {
      return await response.json();
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar o vendedor.");
  } catch (error) {
    console.error("Erro no updateSeller", error);
    
    throw error;
  }

 
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
if (!response.ok) {
    const errorText = await response.text();
    alert(errorText); // aqui mostra o erro do backend
    return null;
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
    alert(errorText); // aqui mostra o erro do backend
    return null;
  }



  const data = await response.json();
  return data;
}

export async function fetchSimpleSales(startDate,finalDate) {
  const response = await fetch(`${API_BASE}/SalesRecords/simple?startDate=${startDate}&finalDate=${finalDate}`);
  console.log(response);
  if(!response.ok) throw new Error("Error when searching sales.")
    return response.json();
}

export async function fetchSales() {
  const response = await fetch(`${API_BASE}/SalesRecords/all`);
  if(!response.ok) throw new Error("Error when searching sales.")
    return response.json();
}


export async function fetchGroupSales(startDate,finalDate) {
  const response = await fetch(`${API_BASE}/SalesRecords/grouping?startDate=${startDate}&finalDate=${finalDate}`);
  console.log(response);
  if(!response.ok) throw new Error("Error when searching sales.")
    return response.json();
}

export function formatDate(date) {
    date.toISOString().split('T')[0];
    return date;
  }


  export async function registerSaleApi(sale){
    const response = await fetch(`${API_BASE}/SalesRecords`, {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(sale)
    })

    if (!response.ok) {
    const errorText = await response.text();
    alert(errorText); // aqui mostra o erro do backend
    return null;
  }



  const data = await response.json();
  return data;
}

    
  
