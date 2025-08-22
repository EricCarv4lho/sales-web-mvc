import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchDepartments,
  fetchOneSeller,
  updateSeller,
} from "../services/api";
import { useState } from "react";
import Select from "react-select";

function SellersEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    fetchOneSeller(id)
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setBirthDate(new Date(data.birthDate).toLocaleDateString("pt-BR"));
        setBaseSalary(data.baseSalary);
        setDepartmentName(data.departmentName);
        setDepartmentId(data.departmentId);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetchDepartments()
      .then((data) => {
        setDepartments(data);
        // Define o departamento selecionado após carregar os departamentos
        const dep = data.find((d) => d.id === departmentId);
        if (dep) {
          setSelectedDepartment({ value: dep.id, label: dep.name });
        }
      })
      .catch((err) => console.error(err));
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !birthDate || !baseSalary) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      const wasUpdated = await updateSeller(id, {
        name: trimmedName,
        email: trimmedEmail,
        birthDate,
        baseSalary: parseFloat(baseSalary),
        departmentId,
      });

      if (wasUpdated) {
        // Atualiza a lista localmente sem depender da resposta da API
        const updatedList = sellers.map((seller) =>
          seller.id === id
            ? {
                ...seller,
                name: trimmedName,
                email: trimmedEmail,
                birthDate,
                baseSalary: parseFloat(baseSalary),
                departmentId,
              }
            : seller
        );

        setSellers(updatedList);

        alert("Vendedor atualizado com sucesso!");
        navigate("/sellers");
        return;
      }
      else {
        alert("Erro ao atualizar.");
      }
    } catch (error) {
      console.error("Erro ao atualizar vendedor:", error);
      alert(error.message || "Erro ao atualizar vendedor.");
    }
  };

  const handleChange = (e) => {
    setDepartmentId(e.value);
    setSelectedDepartment(e);
    console.log(e.value);
  };

  return (
    <div className="flex  flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-20 text-amber-50">
        Edite as informações abaixo:
      </h1>

      <form
        className="bg-white p-6 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Data de nascimento - dd/MM/yyyy"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Salário base"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />
        </div>

        <div>
          <Select
            placeholder="Departamento"
            options={departments.map((dep) => ({
              value: dep.id,
              label: dep.name,
            }))}
            value={selectedDepartment}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Link to={"/sellers"}>
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
  );
}

export default SellersEditPage;
