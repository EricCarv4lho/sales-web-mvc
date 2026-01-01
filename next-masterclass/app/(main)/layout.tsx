import Link from "next/link";

export default function MainLayout({ children } : { children: React.ReactNode }) {
 
  return (
   
        <>
              <header className="py-6 px-12 flex gap-10 items-center">
                <p className="  text-blue-600 text-4xl font-sans ">SalesWeb</p>
        
                <nav className=" md:flex flex-row items-center justify-between  w-full"> 
                  
                  <ul className="hidden md:flex flex-row gap-5">
                    <li className="text-blue-600">Home</li>
                    <li>About us</li>
                    <li>Blog</li>
                    <li>Pricing</li>
                    <Link  href="/departments"><li>Departments</li></Link>
                  </ul>

                  <ul className="flex flex-row gap-3  justify-center items-center text-center ">
                    <Link href="/auth?mode=login"><li className=" min-w-[100px] rounded-full border border-transparent p-2 transition-all ease-in-out duration-200 text-blue-600  hover:border-blue-600 ">Login</li></Link>
                    <Link href="/auth?mode=register"><li  className="text-white whitespace-nowrap min-w-[100px] bg-blue-600 rounded-full p-2 transition-all ease-in-out duration-200 border border-transparent  hover:bg-white hover:text-blue-600 hover:border-blue-600  ">Cadastre-se</li></Link>      
                  </ul>
                </nav>   
              </header>
        <main>{children}</main>
      </>
   
  );
}
