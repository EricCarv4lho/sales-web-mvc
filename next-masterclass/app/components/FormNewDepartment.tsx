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

interface DepartmentModelProps {
  name: string;
}

interface Props {
  onCreate: (data: DepartmentModelProps) => {};
  onCancel?: () => void;
}

export default function FormNewDepartment({ onCreate, onCancel }: Props) {
  const { register, handleSubmit } = useForm<DepartmentModelProps>();

  return (
    <Card className="w-full max-w-[400px] mx-4 shadow-lg">
      <form onSubmit={handleSubmit(onCreate)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
          <CardTitle className="text-lg font-bold text-blue-900">
            Novo Departamento
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
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              placeholder="Ex: Financeiro"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
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
            Criar Departamento
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
