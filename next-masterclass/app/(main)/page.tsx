import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-blue-600 md:text-5xl">
          Sistema de Gestão Empresarial
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Gerencie departamentos, usuários e vendas em um único sistema
          simples, rápido e seguro.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href={"/auth?mode=login"}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Entrar
          </Link>
          <Link
            href={"/auth?mode=register"}
            className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Criar conta
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600">
              Departamentos
            </h3>
            <p className="mt-2 text-gray-600">
              Organize setores e acompanhe o desempenho de cada departamento.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600">
              Usuários
            </h3>
            <p className="mt-2 text-gray-600">
              Controle de acessos, permissões e perfis de usuários.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600">
              Vendas
            </h3>
            <p className="mt-2 text-gray-600">
              Acompanhe vendas, relatórios e resultados em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-600">
          Comece agora
        </h2>
        <p className="mt-4 text-gray-600">
          Tenha controle total da sua empresa com um sistema moderno e eficiente.
        </p>

         <Link
            href={"/auth?mode=login"}
          className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Acessar o sistema
        </Link>
      </section>
    </main>
  )
}
