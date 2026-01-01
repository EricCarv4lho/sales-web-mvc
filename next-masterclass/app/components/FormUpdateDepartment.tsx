"use client"

import { useForm } from "react-hook-form";

import { useState } from "react";
import ModalDelete from "./ModalDelete";
interface DepartmentProps {
  id: number;
  name: string;
}
interface DepartmentDetailsModel {
  department: DepartmentProps;
  onUpdate: (data: DepartmentProps) => void;
  onDelete: (id: number) => void
}


export default function FormUpdateDepartment({
  department,
  onUpdate,
  onDelete,
}: DepartmentDetailsModel) {
  const { register, handleSubmit } = useForm<DepartmentProps>({
    defaultValues: {
      id: department.id,
    },
  });
 const [modalDelete, setModalDelete] = useState(false);

 const onClose = () => {
    setModalDelete(false);
}

  return (

   <div className="relative  flex items-center justify-center rounded-md h-2/4 w-3/4  md:w-[400px] ">

   
    <form id="formDepartment"
      className=" bg-white w-4/4  h-4/4 md:h-3/4 md:w-3/4 flex flex-col items-center justify-between rounded-md shadow-2xl"
      onSubmit={handleSubmit(onUpdate)}
    >
      <p>Detalhes</p>
      <p> Nome: {department.name}</p>

      <input type="hidden" {...register("id")} />
      <input
        placeholder="Nome"
        {...register("name")}
        className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 
              transition duration-200 ease-in-out"
        type="text"
      />
      <div className="flex justify-between gap-5">
        <button
          type="submit"
          className="border rounded-full mb-3 w-2/4 p-2 cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-600 hover:text-white"
        >
          Atualizar
        </button>
        <button
          type="button"
          //onClick={() => {onDelete(department.id)}}
          onClick={() => setModalDelete(true)}
          className="border rounded-full mb-3 w-2/4 p-2 cursor-pointer transition-all ease-in-out duration-200 hover:bg-red-500 hover:text-white"
        >
          Deletar
        </button>
           
    
      </div>
    </form>

        {modalDelete && (
            
            <ModalDelete onDelete={() => {onDelete(department.id)}} onClose={() => setModalDelete(false)}/>
           )}
           </div>
  );
}
