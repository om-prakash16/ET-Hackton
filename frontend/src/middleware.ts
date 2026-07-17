import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Strict RBAC: Only prakash.om.global@gmail.com is allowed in /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.email !== "prakash.om.global@gmail.com") {
        return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
      }
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
