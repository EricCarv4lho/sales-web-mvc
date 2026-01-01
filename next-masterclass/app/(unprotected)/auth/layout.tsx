// app/(unprotected)/auth/layout.tsx

import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col"> {/* Organiza em coluna */}
      <header className="py-6 px-12 flex items-center border-b bg-white">
        <p className="text-blue-600 text-4xl font-sans font-bold">SalesWeb</p>
        <nav className="ml-20 hidden md:flex flex-row justify-between w-full">
            <ul className="flex flex-row gap-5">
              <Link href={"/"}><li>Home</li></Link>
              <li>About us</li>
            </ul>
            
        </nav>
      </header>

      {/* O children entra aqui embaixo do header */}
      {children} 
    </div>
  );
}