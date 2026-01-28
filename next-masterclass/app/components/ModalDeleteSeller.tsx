
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface Props {
  onDelete: () => void;
  onClose: () => void;
}

export default function ModalDeleteSeller({ onDelete, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60]">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      ></div>
      <Card className="relative z-10 w-full max-w-[400px] mx-4 shadow-xl border-red-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle className="h-6 w-6" />
            <CardTitle className="text-lg font-bold">Excluir Vendedor</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-gray-600">
            Tem certeza que deseja excluir este vendedor? Esta ação não pode ser desfeita.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 pt-2 bg-red-50/30 rounded-b-xl border-t border-red-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
          >
            Sim, Excluir
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
