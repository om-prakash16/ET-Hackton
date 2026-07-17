"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, BrainCircuit, LineChart, ShieldAlert, 
  Wrench, FileText, CheckSquare, Search, Activity, Lightbulb, User,
  Menu, X, Shield, Sparkles, MonitorSmartphone, Store, Briefcase, Globe, Network
} from "lucide-react";

export default function WorkspaceIntelligenceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarSections = [
    {
      title: "INTELLIGENCE",
      items: [
        { label: "Dashboard", href: "/workspace/intelligence", icon: LayoutDashboard },
        { label: "Knowledge Evolution", href: "/workspace/intelligence/evolution", icon: Sparkles, badge: "AI" },
        { label: "Lessons Learned", href: "/workspace/intelligence/lessons", icon: BookOpen },
        { label: "Recommendations", href: "/workspace/intelligence/recommendations", icon: Lightbulb },
        { label: "Historical Trends", href: "/workspace/intelligence/trends", icon: LineChart },
        { label: "Failure Intelligence", href: "/workspace/intelligence/failures", icon: BrainCircuit },
      ]
    },
    {
      title: "ACTION CENTER",
      items: [
        { label: "Execution & ROI", href: "/workspace/intelligence/execution", icon: CheckSquare },
        { label: "Risk Center", href: "/workspace/intelligence/risk", icon: ShieldAlert },
        { label: "Asset Intelligence", href: "/workspace/intelligence/assets", icon: Activity },
      ]
    },
    {
      title: "KNOWLEDGE",
      items: [
        { label: "Search Knowledge", href: "/workspace/search", icon: Search },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { label: "Digital Twin Command", href: "/workspace/digital-twin", icon: MonitorSmartphone, badge: "LIVE" },
        { label: "Intelligence Fabric", href: "/workspace/fabric", icon: Network, badge: "OS" },
      ]
    },
    {
      title: "EXECUTIVE SUITE",
      items: [
        { label: "Strategic Intelligence", href: "/workspace/executive", icon: Briefcase, badge: "CEO" },
      ]
    },
    {
      title: "GLOBAL NETWORK",
      items: [
        { label: "Intelligence Marketplace", href: "/workspace/marketplace", icon: Store, badge: "NEW" },
        { label: "Enterprise Network Hub", href: "/workspace/network", icon: Globe, badge: "B2B" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { label: "AI Trust Center", href: "/workspace/intelligence/trust-center", icon: Shield },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden text-zinc-300">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-white/10 flex-shrink-0">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            Intelligence
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Organization Workspace</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sidebarSections.map((section, idx) => (
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
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
        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
