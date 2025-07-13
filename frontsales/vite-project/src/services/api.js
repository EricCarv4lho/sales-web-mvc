const API_BASE = "http://localhost:5000/api";

export async function fetchDepartments() {
    const response = await fetch(`${API_BASE}/departments`);
    if(!response.ok) throw new error("Error when searching departments.");
    return response.json();

}
