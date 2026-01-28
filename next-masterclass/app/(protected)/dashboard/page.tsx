import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ArrowRight, Building2 } from "lucide-react";
import FetchDepartmentsAction from "@/app/actions/FetchDepartmentsAction";
import FetchSellersAction from "@/app/actions/FetchSellersAction";
import Link from "next/link";

export default async function DashboardPage() {
  // Fetch data concurrently
  const [departmentsResult, sellersResult] = await Promise.all([
    FetchDepartmentsAction(),
    FetchSellersAction(),
  ]);

  const departmentsCount = departmentsResult.success && Array.isArray(departmentsResult.data)
    ? departmentsResult.data.length
    : 0;

  const sellersCount = sellersResult.success && Array.isArray(sellersResult.data)
    ? sellersResult.data.length
    : 0;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">
          Dashboard • Visão Geral
        </h1>
      </header>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total de Departamentos
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Departamentos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellersCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Vendedores/Usuários ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <h2 className="mb-4 text-lg font-semibold text-blue-900">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/departments" className="group">
          <Card className="h-full hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Package className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Gerenciar Departamentos</h3>
                  <p className="text-sm text-gray-500">Visualizar e adicionar departamentos</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/sellers" className="group">
          <Card className="h-full hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Gerenciar Usuários</h3>
                  <p className="text-sm text-gray-500">Visualizar e adicionar vendedores</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Seção Principal / Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-blue-900">
              Visão Geral do Sistema
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bem-vindo ao novo painel de controle. Utilize os cartões acima para navegar
              rapidamente entre as seções de gerenciamento. O sistema permite o controle
              completo de departamentos e usuários vinculados (vendedores).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
