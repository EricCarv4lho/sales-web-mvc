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
import { useEffect } from "react";

interface SaleModelProps {
    id?: number;
    date: string;
    amount: number;
    status: string;
    sellerId: number;
}

interface Seller {
    id: number;
    name: string;
}

interface Props {
    initialData?: SaleModelProps;
    sellers: Seller[];
    onSubmit: (data: SaleModelProps) => void;
    onCancel?: () => void;
}

enum SaleStatus {
    Pendente = 0,
    Faturado = 1,
    Cancelado = 2,
}

export default function FormNewSale({ initialData, sellers, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SaleModelProps>({
        defaultValues: {
            status: 'Pendente'
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("date", initialData.date.split('T')[0]); // Ensure date format YYYY-MM-DD
            setValue("amount", initialData.amount);
            setValue("status", initialData.status);
            setValue("sellerId", initialData.sellerId);
            if (initialData.id) setValue("id", initialData.id);
        }
    }, [initialData, setValue]);

    const formatDateForBackend = (dateStr: string) => {
        if (!dateStr) return "";
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            // YYYY-MM-DD -> dd/MM/yyyy
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }

    const onFormSubmit = (data: SaleModelProps) => {
        const formattedData = {
            ...data,
            date: formatDateForBackend(data.date)
        };
        onSubmit(formattedData);
    }

    return (
        <Card className="w-full max-w-[400px] mx-4 shadow-lg">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                    <CardTitle className="text-lg font-bold text-blue-900">
                        {initialData ? "Editar Venda" : "Nova Venda"}
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
                        <label className="text-sm font-medium text-gray-700">Data</label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {errors.date && <span className="text-xs text-red-500">Campo obrigatório</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Valor</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...register("amount", { required: true, valueAsNumber: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {errors.amount && <span className="text-xs text-red-500">Campo obrigatório</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            {...register("status", { required: true, valueAsNumber: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        >
                            <option value={SaleStatus.Pendente}>Pendente</option>
                            <option value={SaleStatus.Faturado}>Faturado</option>
                            <option value={SaleStatus.Cancelado}>Cancelado</option>
                        </select>
                        {errors.status && <span className="text-xs text-red-500">Campo obrigatório</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Vendedor</label>
                        <select
                            {...register("sellerId", { required: true, valueAsNumber: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                        >
                            <option value="">Selecione um vendedor</option>
                            {sellers.map((seller) => (
                                <option key={seller.id} value={seller.id}>
                                    {seller.name}
                                </option>
                            ))}
                        </select>
                        {errors.sellerId && <span className="text-xs text-red-500">Selecione um vendedor</span>}
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
                        {initialData ? "Atualizar" : "Cadastrar"}
                    </button>
                </CardFooter>
            </form>
        </Card>
    );
}
