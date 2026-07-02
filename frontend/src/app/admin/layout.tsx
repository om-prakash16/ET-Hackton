"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { 
  Brain, Search, Bell, Settings, LogOut, HelpCircle, User, 
  ChevronLeft, ChevronRight, ChevronDown, LayoutDashboard, Building2, Users, 
  Database, Cpu, Activity, FileText, Menu, Command, Sun, Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin", badge: null },
    { label: "Organizations", icon: Building2, href: "/admin/organizations", badge: null },
    { label: "Users", icon: Users, href: "/admin/users", badge: null },
    { label: "AI Center", icon: Cpu, href: "/admin/ai", badge: "High" },
    { label: "Knowledge Graph", icon: Database, href: "/admin/knowledge-graph", badge: null },
    { label: "OCR Queue", icon: FileText, href: "/admin/ocr", badge: "12" },
    { label: "Analytics", icon: Activity, href: "/admin/analytics", badge: null },
  ];

  const bottomNavItems = [
    { label: "Settings", icon: Settings, href: "/admin/settings" },
    { label: "Help Center", icon: HelpCircle, href: "/admin/help" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:relative`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-sm font-bold leading-none">IndusBrain <span className="text-primary">AI</span></span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Super Admin</span>
              </div>
            )}
          </Link>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Global Search (Sidebar) */}
        {!isCollapsed && (
          <div className="p-4 shrink-0">
            <div className="relative flex items-center w-full h-9 rounded-md bg-background border border-border px-3 text-muted-foreground focus-within:border-primary transition-colors">
              <Search className="w-4 h-4 shrink-0" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full h-full bg-transparent border-none focus:outline-none text-sm px-2 text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden xl:inline-block text-[10px] font-mono border border-border bg-muted px-1.5 rounded text-muted-foreground shrink-0">⌘K</kbd>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <nav className="flex flex-col gap-1 px-3">
            {!isCollapsed && <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</div>}
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group relative overflow-hidden ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-md"></div>}
                  <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  
                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  
                  {!isCollapsed && item.badge && (
                    <Badge variant={item.badge === "High" ? "destructive" : "secondary"} className="h-5 px-1.5 text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <nav className="flex flex-col gap-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-muted hover:text-foreground transition-all"
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 shrink-0 text-muted-foreground" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
          
          {/* User Profile Footer */}
          <div className={`mt-4 flex items-center gap-3 p-2 rounded-lg bg-muted/50 border border-border/50 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-xs font-bold text-primary-foreground">SA</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="text-sm font-semibold truncate">Super Admin</span>
                <span className="text-[10px] text-muted-foreground truncate">admin@indusbrain.com</span>
              </div>
            )}
            {!isCollapsed && (
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background text-muted-foreground transition-colors shrink-0">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 sticky top-0">
          
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            {/* Command Palette Trigger */}
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 bg-background/50 h-9 px-3">
              <Command className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Command Palette</span>
              <kbd className="ml-2 text-[10px] font-mono bg-muted px-1.5 rounded text-muted-foreground">⌘K</kbd>
            </Button>

            <div className="w-px h-5 bg-border hidden sm:block"></div>

            {/* Theme Switcher */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-9 h-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger border-2 border-card"></span>
            </Button>
            
            <div className="w-px h-5 bg-border hidden sm:block"></div>

            {/* Profile Menu Trigger */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <p className="text-sm font-semibold text-foreground">Super Admin</p>
                      <p className="text-xs text-muted-foreground truncate">admin@indusbrain.com</p>
                    </div>
                    <div className="py-1">
                      <Link 
                        href="/admin/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link 
                        href="/admin/settings" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </Link>
                    </div>
                    <div className="py-1 border-t border-border">
                      <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
