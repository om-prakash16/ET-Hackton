"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { User, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="w-24 h-8 animate-pulse bg-slate-800 rounded-md hidden lg:block" />
        <div className="w-24 h-8 animate-pulse bg-slate-800 rounded-md" />
      </div>
    );
  }

  if (status === "authenticated") {
    let dashboardUrl = "/admin";
    if (session?.user?.email) {
      const emailPrefix = session.user.email.split('@')[0].toLowerCase();
      const validRoles = ["admin", "plant", "operations", "maintenance-manager", "maintenance", "reliability", "quality-manager", "quality", "safety", "production", "technician", "auditor", "contractor", "viewer"];
      if (validRoles.includes(emailPrefix)) {
        dashboardUrl = `/workspace/${emailPrefix}/dashboard`;
      }
    }

    return (
      <div className="flex items-center gap-3 lg:gap-6">
        <button className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Globe className="w-4 h-4 opacity-70" /> EN <ChevronDown className="w-3 h-3 opacity-50" />
        </button>
        <div className="hidden lg:block w-px h-5 bg-border"></div>
        <Link 
          href={dashboardUrl} 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
          title="Go to Dashboard"
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:block">Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 lg:gap-6">
      <button className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Globe className="w-4 h-4 opacity-70" /> EN <ChevronDown className="w-3 h-3 opacity-50" />
      </button>
      <div className="hidden lg:block w-px h-5 bg-border"></div>
      <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
      <Button asChild variant="default" size="sm" className="lg:hidden">
        <Link href="/register">Start</Link>
      </Button>
      <Button asChild variant="default" className="hidden lg:flex">
        <Link href="/register">Get started</Link>
      </Button>
    </div>
  );
}
