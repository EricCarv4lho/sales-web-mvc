"use client"

import LoginForm from "@/app/components/LoginForm";
import { useSearchParams } from "next/navigation";



export default function Home() {

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <div>


     <main className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">

        
           <LoginForm mode={mode}/>

    </main>




    </div>
    
  );
}
