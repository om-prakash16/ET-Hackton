import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Strict RBAC: Allow all Hackathon demo accounts to access the /admin portal
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const email = token?.email?.toLowerCase() || "";
      const testAccounts = [
        "superadmin@indusbrain.ai",
        "admin@tatasteel.com",
        "planthead@tatasteel.com",
        "ops@tatasteel.com",
        "maintenance@tatasteel.com",
        "analyst@tatasteel.com",
        "operator@tatasteel.com",
        "auditor@deloitte.com",
        "safety@tatasteel.com",
        "prakash.om.global@gmail.com"
      ];
      
      if (!testAccounts.includes(email)) {
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
