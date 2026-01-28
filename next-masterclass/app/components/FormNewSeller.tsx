"use client";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SellerModelProps {
  name: string;
  email: string;
  baseSalary: number;
  birthDate: string;
  departmentId: number;
}

interface Department {
  id: number;
  name: string;
}

interface Props {
  onCreate: (data: SellerModelProps) => {};
  departments: Department[];
  onCancel?: () => void;
}

export default function FormNewSeller({ onCreate, departments, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<SellerModelProps>();

  const formatDateForBackend = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      // YYYY-MM-DD -> dd/MM/yyyy
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  const onFormSubmit = (data: SellerModelProps) => {
    const formattedData = {
      ...data,
      birthDate: formatDateForBackend(data.birthDate)
    };
    onCreate(formattedData);
  }

  return (
    <Card className="w-full max-w-[400px] mx-4 shadow-lg">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
          <CardTitle className="text-lg font-bold text-blue-900">
            Novo Vendedor
          </CardTitle>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </CardHeader>
        <CardContent className="pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              placeholder="Nome do vendedor"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.name && <span className="text-xs text-red-500">Campo obrigatório</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.email && <span className="text-xs text-red-500">Campo obrigatório</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Salário Base</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("baseSalary", { required: true, valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.baseSalary && <span className="text-xs text-red-500">Obrigatório</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Nascimento</label>
              <input
                type="date"
                {...register("birthDate", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.birthDate && <span className="text-xs text-red-500">Obrigatório</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Departamento</label>
            <select
              {...register("departmentId", { required: true, valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">Selecione um departamento</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && <span className="text-xs text-red-500">Selecione um departamento</span>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            Cadastrar
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
