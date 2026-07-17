"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Brain, Search, Bell, LogOut, HelpCircle, User, 
  ChevronLeft, ChevronRight, ChevronDown, LayoutDashboard, Building2, Users, 
  Database, Activity, FileText, Menu, Command, Sun, Moon,
  Shield, Layers, DollarSign, Plug, ShieldAlert, Bot, BookOpen, 
  ScanText, SearchCode, Link as LinkIcon, BarChart3, Settings, ShieldCheck, History, ListTodo, Save, ToggleLeft, Lightbulb, CheckCircle, Combine, Network
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
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const userEmail = session?.user?.email || "prakash.om.global@gmail.com";
  const userName = session?.user?.name || "Super Admin";
  const userInitials = userName.substring(0, 2).toUpperCase();

  // Top Dashboard Link
  const dashboardItem = { label: "Dashboard", icon: LayoutDashboard, href: "/admin", badge: null };

  // PLATFORM Section
  const platformNavItems = [
    { label: "Tenant Organizations", icon: Building2, href: "/admin/tenants", badge: null },
    { label: "Platform Users", icon: Users, href: "/admin/users", badge: null },
    { label: "Billing & Payments", icon: DollarSign, href: "/admin/billing", badge: null },
    { label: "Licenses", icon: Shield, href: "/admin/licenses", badge: null },
    { label: "Storage", icon: Database, href: "/admin/storage", badge: null },
  ];

  // PLATFORM INTEGRATIONS Section
  const integrationNavItems = [
    { label: "Integration Hub", icon: Combine, href: "/admin/integration", badge: "CORE" },
    { label: "API Gateway", icon: Network, href: "/admin/api-gateway", badge: null },
  ];

  // AI CENTER Section
  const aiCenterNavItems = [
    { label: "AI Operations Brain", icon: Brain, href: "/admin/ai/brain", badge: "CORE" },
    { label: "AI Center", icon: Bot, href: "/admin/ai", badge: null },
    { label: "AI Models", icon: Bot, href: "/admin/ai/models", badge: null },
    { label: "AI Agents", icon: Bot, href: "/admin/ai/agents", badge: null },
    { label: "Prompt Library", icon: BookOpen, href: "/admin/ai/prompts", badge: null },
    { label: "OCR Center", icon: ScanText, href: "/admin/ai/ocr", badge: null },
    { label: "Knowledge Graph", icon: Network, href: "/admin/ai/knowledge-graph", badge: null },
    { label: "Vector Database", icon: Database, href: "/admin/ai/vector-database", badge: null },
    { label: "Search Engine", icon: SearchCode, href: "/admin/ai/search", badge: null },
  ];

  // SYSTEM & SECURITY Section
  const systemNavItems = [
    { label: "Enterprise Governance", icon: ShieldCheck, href: "/admin/governance", badge: "PROD" },
    { label: "System Health", icon: Activity, href: "/admin/health", badge: null },
    { label: "Audit Logs", icon: History, href: "/admin/audit", badge: null },
  ];

  // SETTINGS Section
  const settingsNavItems = [
    { label: "System Settings", icon: Settings, href: "/admin/settings", badge: null },
  ];

  const renderNavSection = (title: string, items: any[]) => (
    <div className="space-y-1 pt-1">
      {!isCollapsed && (
        <div className="px-3 mb-2 mt-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          {title}
        </div>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(`${item.href}`));
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all group relative overflow-hidden ${
              isActive 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-bold" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title={isCollapsed ? item.label : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </div>
            {!isCollapsed && item.badge && (
              <span className={`text-white font-extrabold text-[10px] px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-sm ${item.badge === '8' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#0a0f1d] overflow-hidden text-slate-100 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0d1322] border-r border-slate-800/80 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-[260px]"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:relative shadow-2xl`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 shrink-0">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:scale-105 transition-transform shadow-md shadow-blue-500/10">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-base font-extrabold leading-none tracking-tight text-white">IndusBrain <span className="text-blue-400">AI</span></span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">SUPER ADMIN</span>
              </div>
            )}
          </Link>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Global Search (Sidebar) */}
        {!isCollapsed && (
          <div className="p-3.5 shrink-0">
            <div className="relative flex items-center w-full h-9 rounded-xl bg-[#0a0f1d] border border-slate-800/80 px-3 text-slate-400 focus-within:border-blue-500/50 transition-colors shadow-inner">
              <Search className="w-4 h-4 shrink-0 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search organizations, users..." 
                className="w-full h-full bg-transparent border-none focus:outline-none text-xs px-2 text-white placeholder:text-slate-500"
              />
              <kbd className="hidden xl:inline-block text-[10px] font-mono border border-slate-800 bg-slate-900 px-1.5 rounded text-slate-400 shrink-0">⌘K</kbd>
            </div>
          </div>
        )}

        {/* Main Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-2 pb-6 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Top Dashboard Button */}
          <div>
            {(() => {
              const isDashActive = pathname === "/admin";
              return (
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group relative overflow-hidden shadow-sm ${
                    isDashActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                  title={isCollapsed ? "Dashboard" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className={`w-4 h-4 shrink-0 ${isDashActive ? "text-white" : "text-blue-400 group-hover:text-blue-300"}`} />
                  {!isCollapsed && <span className="flex-1 truncate">Dashboard</span>}
                </Link>
              );
            })()}
          </div>

          {renderNavSection("PLATFORM", platformNavItems)}
          {renderNavSection("AI CENTER", aiCenterNavItems)}
          {renderNavSection("SYSTEM & SECURITY", systemNavItems)}

          {renderNavSection("SETTINGS", settingsNavItems)}

        </div>

        <div className="p-3 border-t border-slate-800/80 shrink-0 bg-[#0a0f1d]/50">
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center justify-between p-2 rounded-xl bg-[#111827] border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group shadow-sm ${isCollapsed ? "justify-center" : ""}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30 font-bold text-xs text-white border border-blue-400/30">
                {userInitials}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 flex flex-col text-left">
                  <span className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">{userName}</span>
                  <span className="text-[10px] text-slate-400 truncate">{userEmail}</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0 transition-transform" />
            )}
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute bottom-16 left-3 right-3 bg-[#131b2e] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-800 bg-[#0b101d]">
                  <p className="font-bold text-white">{userName}</p>
                  <p className="text-[11px] text-blue-400 truncate mt-0.5">{userEmail}</p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/admin/profile" 
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4 text-blue-400" /> My Profile
                  </Link>
                  <Link 
                    href="/admin/settings" 
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Account Settings
                  </Link>
                </div>
                <div className="py-1 border-t border-slate-800">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-bold text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 sticky top-0">
          
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold capitalize">
                {pathname === "/admin" ? "Dashboard" : pathname?.split("/").pop()?.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Command Palette Trigger */}
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 bg-[#0a0f1d] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 h-9 px-3 rounded-xl">
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-slate-300 font-medium">Search organizations, users...</span>
              <kbd className="ml-2 text-[10px] font-mono bg-slate-900 border border-slate-800 px-1.5 rounded text-slate-400">⌘K</kbd>
            </Button>

            <div className="w-px h-5 bg-slate-800 hidden sm:block" />

            {/* Notifications Bell with Red Badge "8" */}
            <button 
              onClick={() => router.push("/admin/notifications")}
              className="w-9 h-9 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 flex items-center justify-center relative text-slate-300 hover:text-white transition-all shadow-sm"
              title="8 Unread Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-extrabold text-[9px] flex items-center justify-center border-2 border-[#0d1322] shadow-sm animate-pulse">
                8
              </span>
            </button>

            {/* Theme Switcher */}
            <button 
              className="w-9 h-9 rounded-xl bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            
            {/* Top Right Profile Badge */}
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-blue-600/30 cursor-pointer border border-blue-400/30 hover:scale-105 transition-transform"
              title="Super Admin Profile"
            >
              {userInitials}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0a0f1d]">
          {children}
        </main>
      </div>
    </div>
  );
}
