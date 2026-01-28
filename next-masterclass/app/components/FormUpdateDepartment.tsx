"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { X, Trash2, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ModalDelete from "./ModalDelete";

interface DepartmentProps {
  id: number;
  name: string;
}

interface DepartmentDetailsModel {
  department: DepartmentProps;
  onUpdate: (data: DepartmentProps) => void;
  onDelete: (id: number) => void;
  onCancel?: () => void;
}

export default function FormUpdateDepartment({
  department,
  onUpdate,
  onDelete,
  onCancel,
}: DepartmentDetailsModel) {
  const { register, handleSubmit } = useForm<DepartmentProps>({
    defaultValues: {
      id: department.id,
      name: department.name,
    },
  });
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <Card className="w-full max-w-[400px] mx-4 shadow-lg">
        <form onSubmit={handleSubmit(onUpdate)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-lg font-bold text-blue-900">
              Editar Departamento
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
            <input type="hidden" {...register("id")} />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <input
                placeholder="Nome do departamento"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="text"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-2 border-t mt-4 bg-gray-50/50 rounded-b-xl">
            <button
              type="button"
              onClick={() => setModalDelete(true)}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </button>
            <div className="flex gap-2">
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
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>

      {modalDelete && (
        <ModalDelete
          onDelete={() => {
            onDelete(department.id);
          }}
          onClose={() => setModalDelete(false)}
        />
      )}
    </>
  );
}
