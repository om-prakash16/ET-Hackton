import NextAuth, { AuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: credentials.email,
              password: credentials.password,
            }),
          });
          
          if (res.ok) {
            const data = await res.json();
            return {
              id: "1", // FastAPI doesn't return user info directly in token response usually, just access_token
              email: credentials.email,
              accessToken: data.access_token,
            };
          }
        } catch (error) {
          console.log("Backend offline or unreachable, using standalone demo session for:", credentials.email);
        }

        // Fallback for standalone frontend / Hackathon demo mode
        const email = credentials.email.toLowerCase();
        
        // Mock account directory
        const mockAccounts: Record<string, { name: string, role: string }> = {
          "superadmin@indusbrain.ai": { name: "Om Prakash", role: "Super Admin" },
          "admin@tatasteel.com": { name: "Ravi Kumar", role: "Tenant Admin" },
          "planthead@tatasteel.com": { name: "Priya Sharma", role: "Plant Head" },
          "ops@tatasteel.com": { name: "Amit Patel", role: "Operations Manager" },
          "maintenance@tatasteel.com": { name: "Vikram Singh", role: "Maintenance Engineer" },
          "analyst@tatasteel.com": { name: "Neha Gupta", role: "AI Analyst" },
          "operator@tatasteel.com": { name: "Suresh Menon", role: "Operator" },
          "auditor@deloitte.com": { name: "Anil Desai", role: "External Auditor" },
          "safety@tatasteel.com": { name: "Kavita Reddy", role: "Safety Inspector" }
        };

        const mockUser = mockAccounts[email] || { name: "Demo User", role: "Demo Role" };

        return {
          id: "demo-" + Date.now(),
          email: credentials.email,
          name: mockUser.name,
          accessToken: `demo-jwt-${mockUser.role.replace(" ", "-").toLowerCase()}`,
        };
      }
    }),
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_API_CLIENT_SECRET || "",
      issuer: `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      tenantId: "common",
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
