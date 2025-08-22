import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchOneDepartment, updateDepartment } from "../services/api";
import { useEffect, useState } from "react";
function DepartmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [department, setDepartment] = useState({});

  useEffect(() => {
    fetchOneDepartment(id).then((data) => {
      setDepartment(data);
      setDepartmentName(data.name);
    });
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDepartment = {
      ...department,
      name: departmentName,
    };
try {
    const response = await updateDepartment(id, updatedDepartment);
    if (response) {
      alert("Departamento atualizado com sucesso!");
      navigate("/departments");
    } else {
      alert("Erro ao atualizar.");
    }}
    catch (error) {
      console.error("Erro ao atualizar o departamento:", error);
      alert(error.message || "Erro ao atualizar departamento.");
    }
  };

  return (
    <div>
      <div className="flex  flex-col justify-center items-center">
        <h1 className="text-2xl font-bold m-20 text-amber-50">
          Edite as informações abaixo:
        </h1>

        <form
          className="bg-white p-6 rounded shadow-lg w-96"
          onSubmit={handleSubmit}
        >
          <div>
            <h1>Departamento</h1>
            <input
              type="text"
              value={departmentName}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Link to={"/departments"}>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentEditPage;
