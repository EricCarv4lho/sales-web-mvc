// app/(unprotected)/auth/layout.tsx

import Link from "next/link";
export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col"> {/* Organiza em coluna */}
      <header className="py-6 px-12 flex items-center border-b bg-white">
        <p className="text-blue-600 text-4xl font-sans font-bold">SalesWeb</p>
        <nav className="ml-20 hidden md:flex flex-row justify-between w-full">
          <ul className="flex flex-row gap-5">
            <Link href={"/dashboard"}><li>Home</li></Link>
            <Link href={"/departments"}><li>Departmentos</li></Link>
            <Link href={"/sellers"}><li>Vendedores</li></Link>
            <Link href={"/sales"} className="text-blue-600"><li>Vendas</li></Link>
          </ul>

        </nav>
      </header>

      <main>

        {children}
      </main>
    </div>
  );
}