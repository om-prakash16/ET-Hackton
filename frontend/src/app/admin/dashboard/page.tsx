"use client";

import { useState, useEffect } from "react";
import { 
  Building2, Users, Database, Clock, Ban, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Calendar, Download, MoreVertical, 
  CheckCircle2, AlertTriangle, Info, ArrowRight, ExternalLink, Activity
} from "lucide-react";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line 
} from "recharts";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// Chart Data matching user specification & screenshot
const growthData = [
  { date: "Jun 2", orgs: 50 },
  { date: "Jun 9", orgs: 68 },
  { date: "Jun 16", orgs: 85 },
  { date: "Jun 23", orgs: 105 },
  { date: "Jun 30", orgs: 118 },
  { date: "Jul 7", orgs: 128 },
];

const statusDistributionData = [
  { name: "Approved / Active", value: 98, percentage: "76.6%", color: "#10b981" },
  { name: "Pending Review", value: 18, percentage: "14.1%", color: "#f59e0b" },
  { name: "Suspended", value: 7, percentage: "5.5%", color: "#ef4444" },
  { name: "Rejected", value: 5, percentage: "3.9%", color: "#991b1b" },
];

const topIndustries = [
  { name: "Oil & Gas", count: 32, percentage: 25, color: "bg-blue-500" },
  { name: "Metals & Mining", count: 24, percentage: 18.8, color: "bg-blue-500" },
  { name: "Power & Utilities", count: 18, percentage: 14.1, color: "bg-blue-500" },
  { name: "Chemical & Petrochemical", count: 16, percentage: 12.5, color: "bg-blue-500" },
  { name: "Manufacturing", count: 14, percentage: 10.9, color: "bg-blue-500" },
  { name: "Others", count: 24, percentage: 18.8, color: "bg-blue-500" },
];

const recentOrgs = [
  { id: "GC", name: "Gurucraft Oil & Gas", domain: "gurucraft.com", industry: "Oil & Gas / Refinery", status: "Approved", users: "1 / 500", date: "2026-07-02" },
  { id: "TS", name: "Tata Steel", domain: "tatasteel.com", industry: "Metals & Mining", status: "Approved", users: "1,250 / Unlimited", date: "2026-07-01" },
  { id: "RI", name: "Reliance Industries", domain: "reliance.com", industry: "Oil & Gas / Petrochemicals", status: "Approved", users: "850 / 1,000", date: "2026-06-30" },
  { id: "JS", name: "JSW Steel Works", domain: "jswsteel.com", industry: "Metals & Mining", status: "Suspended", users: "320 / 500", date: "2026-06-28" },
  { id: "NT", name: "NTPC Limited", domain: "ntpc.co.in", industry: "Power Generation", status: "Pending", users: "1,500 / 2,000", date: "2026-06-27" },
];

const usageOverview = [
  { name: "AI Requests", value: "128,456", change: "+12.6%", trend: [40, 55, 45, 60, 75, 65, 80], color: "#3b82f6" },
  { name: "OCR Processed", value: "45,231", change: "+8.3%", trend: [20, 30, 25, 35, 40, 38, 45], color: "#10b981" },
  { name: "Documents Uploaded", value: "32,114", change: "+15.7%", trend: [15, 20, 25, 22, 30, 35, 40], color: "#a855f7" },
  { name: "Active AI Agents", value: "24", change: "+4.3%", trend: [18, 20, 21, 20, 22, 23, 24], color: "#f59e0b" },
  { name: "API Requests", value: "1.2M", change: "+10.1%", trend: [80, 85, 90, 88, 95, 100, 110], color: "#06b6d4" },
];

const systemHealth = [
  { name: "Web Application", status: "Operational" },
  { name: "API Services", status: "Operational" },
  { name: "Database (PostgreSQL)", status: "Operational" },
  { name: "Vector Database", status: "Operational" },
  { name: "Redis Cache", status: "Operational" },
  { name: "OCR Workers", status: "Operational" },
  { name: "AI Workers", status: "Operational" },
];

const subscriptionData = [
  { name: "Enterprise", value: 68, percentage: "53.1%", color: "#8b5cf6" },
  { name: "Professional", value: 42, percentage: "32.8%", color: "#3b82f6" },
  { name: "Self-Service", value: 18, percentage: "14.1%", color: "#06b6d4" },
];

const billingRevenueData = [
  { month: "Feb", revenue: 85000 },
  { month: "Mar", revenue: 92000 },
  { month: "Apr", revenue: 105000 },
  { month: "May", revenue: 112000 },
  { month: "Jun", revenue: 120000 },
  { month: "Jul", revenue: 132456 },
];

const activeAlerts = [
  { id: 1, type: "warning", message: "3 Organizations pending review", time: "2 min ago" },
  { id: 2, type: "warning", message: "High storage usage in 2 organizations", time: "15 min ago" },
  { id: 3, type: "info", message: "OCR queue delay detected", time: "1 hr ago" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [orgsList, setOrgsList] = useState<any[]>(recentOrgs);
  const [totalOrgs, setTotalOrgs] = useState(128);
  const [approvedOrgs, setApprovedOrgs] = useState(98);
  const [pendingOrgsCount, setPendingOrgsCount] = useState(18);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const pending = parsed.filter((o: any) => o.status === "Pending Approval" || o.status === "Pending");
          const approved = parsed.filter((o: any) => o.status === "Approved" || o.status === "Approved / Active");
          if (parsed.length > 5) {
            setTotalOrgs(parsed.length);
            setApprovedOrgs(approved.length);
            setPendingOrgsCount(pending.length);
          }
        } catch (e) {}
      }
    }
  }, []);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      totalOrganizations: totalOrgs,
      approvedActive: approvedOrgs,
      pendingReview: pendingOrgsCount,
      totalUsers: 12458,
      storageUsed: "18.4 TB",
      exportDate: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `indusbrain_dashboard_summary_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#0a0f1d] text-slate-100 min-h-screen font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Overview of platform operations and key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#111827] border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 flex items-center gap-2 shadow-sm">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Jul 2 – Jul 8, 2026</span>
          </div>
          <button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Row 1: Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Organizations */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Total Organizations</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">{totalOrgs}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-emerald-400 gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>12.4% vs last month</span>
          </div>
        </div>

        {/* Approved / Active */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Approved / Active</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">{approvedOrgs}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-emerald-400 gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>8.6% vs last month</span>
          </div>
        </div>

        {/* Pending Review */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Pending Review</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">{pendingOrgsCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-amber-400 gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>3.2% vs last month</span>
          </div>
        </div>

        {/* Suspended / Rejected */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-red-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Suspended / Rejected</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-red-400 transition-colors">12</p>
            </div>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Ban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-red-400 gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>1.1% vs last month</span>
          </div>
        </div>

        {/* Total Users */}
        <div 
          onClick={() => router.push("/admin/users")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Total Users</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-purple-400 transition-colors">12,458</p>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-emerald-400 gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>15.3% vs last month</span>
          </div>
        </div>

        {/* Storage Used */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[12px] font-semibold text-slate-400">Storage Used</p>
              <p className="text-[26px] font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">18.4 TB</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-[12px] font-medium text-emerald-400 gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>10.2% vs last month</span>
          </div>
        </div>
      </div>

      {/* Row 2: Organization Growth | Status Distribution | Top Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Organization Growth Chart */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Organization Growth</h3>
            <select className="bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2 py-1 focus:outline-none">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[220px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrgs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                    formatter={(val) => [`Organizations: ${val}`, ""]}
                  />
                  <Area type="monotone" dataKey="orgs" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrgs)" dot={{ r: 4, fill: "#3b82f6", stroke: "#0f172a", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#60a5fa" }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Organization Status Distribution Donut */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Organization Status Distribution</h3>
          </div>
          <div className="flex items-center justify-between flex-1 gap-4">
            <div className="h-[200px] w-[200px] relative flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {/* Center Total */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[22px] font-extrabold text-white leading-tight">{totalOrgs}</span>
                <span className="text-[11px] font-medium text-slate-400">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-2.5 text-xs">
              {statusDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium truncate">{item.name}</span>
                  </div>
                  <span className="text-slate-400 font-semibold">{item.value} ({item.percentage})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Industries */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Top Industries</h3>
            <button 
              onClick={() => router.push("/admin/organizations")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {topIndustries.map((ind) => (
              <div key={ind.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{ind.name}</span>
                  <span className="text-slate-400 font-semibold">{ind.count} ({ind.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${ind.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Organizations | Platform Usage Overview | System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Organizations Table */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Recent Organizations</h3>
            <button 
              onClick={() => router.push("/admin/organizations")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-2">Organization</th>
                  <th className="pb-2">Industry</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {recentOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-2.5 font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-500/30">
                          {org.id}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold truncate group-hover:text-blue-400 transition-colors">{org.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{org.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 text-slate-300 font-medium truncate max-w-[100px]">{org.industry}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        org.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        org.status === 'Suspended' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-slate-400 font-semibold">{org.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Usage Overview */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Platform Usage Overview</h3>
            <select className="bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2 py-1 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            {usageOverview.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <div>
                  <p className="text-xs font-semibold text-slate-300">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white">{item.value}</span>
                    <span className="text-[10px] font-bold text-emerald-400">{item.change}</span>
                  </div>
                </div>
                <div className="w-20 h-8">
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={item.trend.map((val, i) => ({ val }))}>
                        <Line type="monotone" dataKey="val" stroke={item.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">System Health</h3>
            <button 
              onClick={() => alert("✅ All 7 Core SaaS Infrastructure Services are 100% Operational!")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View details
            </button>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {systemHealth.map((sys) => (
              <div key={sys.name} className="flex items-center justify-between py-1.5 border-b border-slate-800/40 last:border-0">
                <span className="text-xs font-medium text-slate-300">{sys.name}</span>
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {sys.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Subscription Overview | Storage Overview | Billing Overview | Active Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Subscription Overview Donut */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <h3 className="text-sm font-bold text-white mb-2">Subscription Overview</h3>
          <div className="flex items-center justify-between flex-1 gap-2">
            <div className="h-[140px] w-[140px] relative flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={58}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-extrabold text-white leading-none">{totalOrgs}</span>
                <span className="text-[10px] font-medium text-slate-400 mt-0.5">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2 text-[11px]">
              {subscriptionData.map((item) => (
                <div key={item.name} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-slate-400 pl-3.5 font-bold">{item.value} ({item.percentage})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Overview Gauge */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <h3 className="text-sm font-bold text-white mb-2">Storage Overview</h3>
          <div className="flex items-center justify-between flex-1 gap-4">
            <div className="flex flex-col items-center justify-center relative w-[130px]">
              {/* Semi-circle Gauge simulation */}
              <div className="w-[120px] h-[60px] bg-slate-800 rounded-t-full relative overflow-hidden flex items-end justify-center pt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-t-full origin-bottom rotate-[-45deg] opacity-90" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
                <div className="w-[96px] h-[48px] bg-[#111827] rounded-t-full absolute bottom-0 flex flex-col items-center justify-end pb-1">
                  <span className="text-base font-extrabold text-white">18.4</span>
                  <span className="text-[10px] font-bold text-emerald-400">TB Used</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Total Allocated</span><span className="text-white font-bold">50 TB</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Used</span><span className="text-emerald-400 font-bold">18.4 TB</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Available</span><span className="text-slate-200 font-bold">31.6 TB</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Utilization</span><span className="text-blue-400 font-bold">36.8%</span></div>
            </div>
          </div>
        </div>

        {/* Billing Overview Bar Chart */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-sm font-bold text-white">Billing Overview</h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">$132,456</span>
              <span className="text-[11px] font-bold text-emerald-400">↑ 16.3%</span>
            </div>
            <p className="text-[10px] text-slate-400">This Month Revenue</p>
          </div>
          <div className="h-[90px] w-full mt-3">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={billingRevenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }} formatter={(val) => [`$${val}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Active Alerts Feed */}
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Active Alerts</h3>
            <button 
              onClick={() => router.push("/admin/organizations")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id} 
                onClick={() => router.push("/admin/organizations")}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-amber-500/30 transition-all cursor-pointer group"
              >
                <div className={`mt-0.5 p-1 rounded-md shrink-0 ${alert.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {alert.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{alert.message}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{alert.time}</p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
