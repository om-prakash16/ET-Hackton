"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";
import { signOut } from "next-auth/react";

export function AdminHeader() {
  const pathname = usePathname();
  
  // Create simple breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  const title = paths.length > 1 ? paths[paths.length - 1].replace(/-/g, " ") : "Dashboard";
  
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center gap-x-4">
        <h1 className="text-xl font-semibold text-white capitalize">{title}</h1>
      </div>
      
      <div className="flex items-center gap-x-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search platform..."
            className="h-9 w-64 rounded-md border border-zinc-700 bg-zinc-900/50 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer shadow-lg hover:ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950" onClick={() => signOut()}>
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
