
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export default async function Middleware(request : NextRequest) {
     
    const { pathname } = request.nextUrl

    const token = request.cookies.get("token");


    const publicRoutes = ["/", "/auth"]
    

    if(publicRoutes.includes(pathname)){
        return NextResponse.next()
    }

   
    
    if(!token) {
        const loginUrl = new URL("/auth",request.url)

        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/departments/:path*",
    "/users/:path*",
    "/sales/:path*",
  ],
}