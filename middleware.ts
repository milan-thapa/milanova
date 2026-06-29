import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    salt: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token"
  })
  
  const isLoggedIn = !!token
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnLogin = req.nextUrl.pathname.startsWith('/admin/login')

  if (isOnAdmin && !isLoggedIn && !isOnLogin) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  }

  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  // Role-based access control for admin routes
  if (isOnAdmin && isLoggedIn) {
    if (token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  const response = NextResponse.next()
  response.headers.set('x-pathname', req.nextUrl.pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
