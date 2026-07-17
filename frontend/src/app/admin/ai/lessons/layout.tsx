"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, BrainCircuit, Search, Bell, Settings, 
  Database, Network, BookOpen, Clock, Activity, Cpu, ShieldAlert,
  Menu, X, LineChart, FileSearch, HelpCircle, HardDrive
} from "lucide-react";

export default function LessonsAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin/ai/lessons", icon: LayoutDashboard },
        { label: "Organizations", href: "/admin/ai/lessons/organizations", icon: Building2 },
      ]
    },
    {
      title: "AI ENGINE",
      items: [
        { label: "Pattern Detection", href: "/admin/ai/lessons/patterns", icon: Search },
        { label: "Recommendations", href: "/admin/ai/lessons/recommendations", icon: BrainCircuit },
        { label: "Knowledge Retention", href: "/admin/ai/lessons/knowledge", icon: Network },
        { label: "External Knowledge", href: "/admin/ai/lessons/external", icon: BookOpen },
      ]
    },
    {
      title: "CONFIGURATION",
      items: [
        { label: "Prompt Library", href: "/admin/ai/lessons/prompts", icon: FileSearch },
        { label: "Gemini Configuration", href: "/admin/ai/lessons/gemini-config", icon: Cpu },
        { label: "Policies", href: "/admin/ai/lessons/policies", icon: ShieldAlert },
        { label: "Settings", href: "/admin/ai/lessons/settings", icon: Settings },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Analytics", href: "/admin/ai/lessons/analytics", icon: LineChart },
        { label: "Monitoring", href: "/admin/ai/lessons/monitoring", icon: Activity },
        { label: "Jobs", href: "/admin/ai/lessons/jobs", icon: Clock },
        { label: "Queues", href: "/admin/ai/lessons/queues", icon: HardDrive },
        { label: "Audit Logs", href: "/admin/ai/lessons/audit", icon: Database },
      ]
    }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] bg-zinc-950 overflow-hidden rounded-xl border border-white/10 m-2">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-zinc-900/50 border-r border-white/10 flex-shrink-0">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            Control Center
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Lessons Intelligence Engine</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 pl-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                          ? "bg-indigo-500/10 text-indigo-400 font-semibold" 
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-black relative">
        <div className="absolute top-4 left-4 md:hidden z-10">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-zinc-900 rounded-md border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 bg-zinc-900 z-50 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                Control Center
              </h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-zinc-800 rounded-md text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 pl-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIdx) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={itemIdx}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                            isActive 
                              ? "bg-indigo-500/10 text-indigo-400 font-semibold" 
                              : "text-zinc-300 hover:text-zinc-100 hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
