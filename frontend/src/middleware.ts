import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === "/admin" || req.nextUrl.pathname === "/admin/") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/((?!login|register|_next/static|_next/image|favicon.ico|api/auth|api/send-email).*)"
  ]
}
