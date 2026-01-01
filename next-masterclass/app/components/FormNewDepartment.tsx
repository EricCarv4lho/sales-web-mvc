"use client";
import { useForm } from "react-hook-form";

interface DepartmentModelProps {
  name: string;
}

interface Props {
  onCreate: (data: DepartmentModelProps) => {};
}

export default function FormNewDepartment({ onCreate }: Props) {
  const { register, handleSubmit } = useForm<DepartmentModelProps>();

  return (
    <form
      onSubmit={handleSubmit(onCreate)}
      className="relative bg-white h-1/4 w-2/4 md:h-2/4 md:w-[400px] flex flex-col items-center justify-between rounded-md shadow-2xl"
    >
      <p className="text-center py-5 text-blue-600 "> Novo Departamento</p>
      <input
        placeholder="Nome"
        {...register("name")}
        className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 
              transition duration-200 ease-in-out"
      ></input>

      <button
        type="submit"
        className="border rounded-full mb-3 w-2/4 p-2 cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-600 hover:text-white  "
      >
        Criar
      </button>
    </form>
  );
}
