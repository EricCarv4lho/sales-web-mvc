const API_BASE = "http://localhost:5000/api";

export async function fetchDepartments() {
    const response = await fetch(`${API_BASE}/departments`);
    if(!response.ok) throw new error("Error when searching departments.");
    return response.json();

}

export async function createDepartmentApi(department) {
  const response = await fetch("http://localhost:5000/api/departments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar departamento");
  }

  const data = await response.json();
  return data;
}

