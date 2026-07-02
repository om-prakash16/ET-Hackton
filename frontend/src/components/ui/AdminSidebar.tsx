"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  Key,
  Network,
  Factory,
  Database,
  Folders,
  FileText,
  FileBox,
  BrainCircuit,
  Bot,
  Brain,
  MessageSquare,
  ScanText,
  Workflow,
  PieChart,
  BarChart4,
  Bell,
  ScrollText,
  ShieldCheck,
  Activity,
  Cpu,
  Archive,
  HardDrive,
  Webhook,
  Plug,
  CreditCard,
  Ticket,
  ToggleLeft,
  Settings,
  HelpCircle,
  User,
  Boxes
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      group: "Core Entities",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Organizations", href: "/admin/organizations", icon: Building2 },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Roles", href: "/admin/roles", icon: ShieldAlert },
        { name: "Permissions", href: "/admin/permissions", icon: Key },
        { name: "Departments", href: "/admin/departments", icon: Network },
        { name: "Plants", href: "/admin/plants", icon: Factory },
        { name: "Assets", href: "/admin/assets", icon: Boxes },
        { name: "Asset Categories", href: "/admin/asset-categories", icon: Database },
      ],
    },
    {
      group: "Document Management",
      items: [
        { name: "Categories", href: "/admin/document-categories", icon: Folders },
        { name: "Templates", href: "/admin/document-templates", icon: FileBox },
        { name: "Documents", href: "/admin/documents", icon: FileText },
        { name: "Knowledge Graph", href: "/admin/knowledge-graph", icon: Workflow },
      ],
    },
    {
      group: "AI Engine",
      items: [
        { name: "AI Center", href: "/admin/ai", icon: BrainCircuit },
        { name: "AI Models", href: "/admin/ai/models", icon: Brain },
        { name: "AI Agents", href: "/admin/ai/agents", icon: Bot },
        { name: "Prompt Library", href: "/admin/ai/prompts", icon: MessageSquare },
        { name: "OCR Center", href: "/admin/ocr", icon: ScanText },
        { name: "Vector Database", href: "/admin/vector-db", icon: Database },
        { name: "Embeddings", href: "/admin/embeddings", icon: Cpu },
      ],
    },
    {
      group: "Analytics & Operations",
      items: [
        { name: "Reports", href: "/admin/reports", icon: PieChart },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart4 },
        { name: "Notifications", href: "/admin/notifications", icon: Bell },
        { name: "Audit Logs", href: "/admin/audit", icon: ScrollText },
        { name: "Security Center", href: "/admin/security", icon: ShieldCheck },
      ],
    },
    {
      group: "Infrastructure",
      items: [
        { name: "System Monitoring", href: "/admin/system", icon: Activity },
        { name: "Background Jobs", href: "/admin/jobs", icon: Cpu },
        { name: "Queues", href: "/admin/queues", icon: Workflow },
        { name: "Storage", href: "/admin/storage", icon: HardDrive },
        { name: "Backup & Restore", href: "/admin/backup", icon: Archive },
        { name: "API Management", href: "/admin/api", icon: Webhook },
        { name: "Integrations", href: "/admin/integrations", icon: Plug },
      ],
    },
    {
      group: "Commerce & Settings",
      items: [
        { name: "Billing", href: "/admin/billing", icon: CreditCard },
        { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
        { name: "Licenses", href: "/admin/licenses", icon: Ticket },
        { name: "Feature Flags", href: "/admin/features", icon: ToggleLeft },
        { name: "Settings", href: "/admin/settings", icon: Settings },
        { name: "Help Center", href: "/admin/help", icon: HelpCircle },
        { name: "Profile", href: "/admin/profile", icon: User },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-zinc-950 border-r border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-700">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-zinc-800">
        <span className="text-xl font-bold text-white tracking-tight">IndusBrain Admin</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-6">
        {navigation.map((group) => (
          <div key={group.group}>
            <h3 className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/admin/ai");
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-x-3 rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600/10 text-blue-500"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
