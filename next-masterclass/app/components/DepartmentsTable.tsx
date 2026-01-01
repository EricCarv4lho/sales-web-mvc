"use client";

import { Card, CardContent } from "@/components/ui/card";

import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import FetchDepartmentsAction from "../actions/FetchDepartmentsAction";
import { useRouter } from "next/navigation";
import FormNewDepartment from "./FormNewDepartment";
import DepartmentsCards from "./DepartmentsCards";
import CreateNewDepartment from "../actions/CreateNewDepartment";
import FormUpdateDepartment from "./FormUpdateDepartment";
import UpdateDepartment from "../actions/UpdateDepartment";
import DeleteDepartment from "../actions/DeleteDepartment";

interface Department {
  id: number;
  name: string;
}

export default function DepartmentsTable() {
  const router = useRouter();
  const [formNewDepartment, setFormNewDepartment] = useState(false);

  const [formDepartmentDetails, setFormDepartmentDetails] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const [departments, setDepartments] = useState<Department[]>([]);

 

  const selectedDepartment = departments.find(
    (dep) => dep.id === selectedDepartmentId
  );

  const handleClickNewDepartment = () => {
    setFormNewDepartment(true);
  };

  interface DepartmentModelProps {
    name: string;
  }

  const fetchDepartments = async () => {
    const result = await FetchDepartmentsAction();

    if (result.success) {
      setDepartments(result.data);
    } else {
      console.error(result.message);
      router.push("/auth");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmitCreateDepartment = async (data: DepartmentModelProps) => {
    const result = await CreateNewDepartment(data);

    if (result.success) {
      await fetchDepartments();

      setFormNewDepartment(false);
    } else {
      alert("Erro ao criar departamento no servidor");
    }
  };

  const onUpdate = async (data: Department) => {
    const result = await UpdateDepartment(data);

    if (result?.success) {
      await fetchDepartments();
      setFormNewDepartment(false);
    } else {
      alert("Erro ao atualizar: " + result?.message);
    }
  };


  const onDelete = async (id : number) => {

    
    const result = await DeleteDepartment(id);

    if(result.success){
      await fetchDepartments();
      setFormDepartmentDetails(false)
    }
    else{
      alert("Erro ao Deletar " + result.message)
    }
  }

  return (
    <div>
      <div className=" container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 items-center ">
        <Card className=" border border-dashed bg-amber-50/2 w-2xs  text-center  ">
          <CardContent className="flex flex-col gap-3 items-center text-center justify-center">
            <p className="text-white">Novo Departamento</p>
            <CirclePlus
              onClick={handleClickNewDepartment}
              className="cursor-pointer transition-all duration-200 ease-in-out  hover:scale-125 "
              color="white"
            />
          </CardContent>
        </Card>

        {departments.map((dep) => (
          <div
            key={dep.id}
            onClick={() => {
              setFormDepartmentDetails(true);
              setSelectedDepartmentId(dep.id);
            }}
          >
            <DepartmentsCards name={dep.name} />
          </div>
        ))}
      </div>

      {formNewDepartment && (
        <div className="fixed inset-0 bg-black/50  backdrop-blur-sm flex justify-center items-center ">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setFormNewDepartment(false)}
          ></div>
          <FormNewDepartment onCreate={onSubmitCreateDepartment} />
        </div>
      )}

      {formDepartmentDetails && selectedDepartment && (
        <div className="fixed inset-0 bg-black/50  backdrop-blur-sm flex justify-center items-center ">
          <div
            className="absolute inset-0 cursor-pointer "
            onClick={() => setFormDepartmentDetails(false)}
          ></div>
          
          
          <FormUpdateDepartment
            department={selectedDepartment}
            onUpdate={onUpdate}
            onDelete={onDelete}
            
          />
        </div>
      )}
    </div>
  );
}
