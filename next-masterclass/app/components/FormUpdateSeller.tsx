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
import ModalDeleteSeller from "./ModalDeleteSeller";

import { UseFormRegister } from "react-hook-form";
interface Seller {
    id: number;
    name: string;
    email: string;
    baseSalary: number;
    birthDate: string;
    departmentId: number;
    departmentName?: string;

}

interface Department {
    id: number;
    name: string;
}

interface Props {
    initialData: Seller;
    onUpdate: (data: Seller) => void;
    onDelete: (id: number) => void;
    departments: Department[];
    onCancel?: () => void;
}

export default function FormUpdateSeller({
    initialData,
    onUpdate,
    onDelete,
    departments,
    onCancel,

}: Props) {

    const [modalDelete, setModalDelete] = useState(false);

  

    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return "";
        // If it's already YYYY-MM-DD
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;

        // If it's DD/MM/YYYY (from the frontend formatting we saw earlier)
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateStr;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Seller>({
        defaultValues: {
            ...initialData,
            birthDate: formatDateForInput(initialData.birthDate),
            departmentId: Number(initialData.departmentId)
        }
    });

    const formatDateForBackend = (dateStr: string) => {
        if (!dateStr) return "";
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            // YYYY-MM-DD -> dd/MM/yyyy
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }

    const onFormSubmit = (data: Seller) => {
        // Merge with initial ID just in case
        const updatedSeller: Seller = {
            ...data,
            id: initialData.id,
            baseSalary: Number(data.baseSalary),
            departmentId: Number(data.departmentId),
            birthDate: formatDateForBackend(data.birthDate)
        };
        onUpdate(updatedSeller);
    };

    return (
        <>
            <Card className="w-full max-w-[400px] mx-4 shadow-lg">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                        <CardTitle className="text-lg font-bold text-blue-900">
                            Editar Vendedor
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
                        {/* Hidden input for ID is good practice but we mostly rely on the merged object now */}
                        <input type="hidden" {...register("id")} />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Nome</label>
                            <input
                                {...register("name", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {errors.name && <span className="text-xs text-red-500">Obrigatório</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {errors.email && <span className="text-xs text-red-500">Obrigatório</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Salário Base</label>
                                <input
                                    type="number"
                                    step="0.01"
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
                                <option value="">Selecione</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && <span className="text-xs text-red-500">Selecione um departamento</span>}
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
                <ModalDeleteSeller
                    onDelete={() => {
                        onDelete(initialData.id);
                    }}
                    onClose={() => setModalDelete(false)}
                />
            )}
        </>
    );
}
