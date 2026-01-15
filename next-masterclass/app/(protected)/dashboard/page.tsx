import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, Package, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">
          Dashboard • Sistema de Gestão Empresarial
        </h1>
        
      </header>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        
      </div>

      {/* Seção Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-blue-900">
              Visão Geral do Negócio
            </h2>
            <p className="text-gray-600">
              Aqui você pode acompanhar o desempenho geral da empresa, analisar
              resultados, controlar vendas, clientes e estoque de forma simples
              e organizada.
            </p>
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
}
