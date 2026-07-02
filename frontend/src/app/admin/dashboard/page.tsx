"use client";

import { useState, useEffect } from "react";
import { Building2, Users, Boxes, FileText, BrainCircuit, ScanText, Activity, ShieldAlert, CheckCircle2, Factory, Clock, ArrowRight, CheckCircle, XCircle, AlertTriangle, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const aiUsageData = [
  { name: "Mon", requests: 4000 },
  { name: "Tue", requests: 3000 },
  { name: "Wed", requests: 5000 },
  { name: "Thu", requests: 2780 },
  { name: "Fri", requests: 6890 },
  { name: "Sat", requests: 8390 },
  { name: "Sun", requests: 9490 },
];

const orgGrowthData = [
  { month: "Jan", orgs: 10 },
  { month: "Feb", orgs: 12 },
  { month: "Mar", orgs: 15 },
  { month: "Apr", orgs: 18 },
  { month: "May", orgs: 22 },
  { month: "Jun", orgs: 24 },
];

const securityAlerts = [
  { id: 1, title: "Failed Login Spike", location: "IP: 192.168.1.100", time: "2 mins ago", severity: "high" },
  { id: 2, title: "Unauthorized API Access", location: "Service Account: OCR", time: "15 mins ago", severity: "high" },
  { id: 3, title: "New Device Detected", location: "User: admin@global.com", time: "1 hour ago", severity: "low" },
];

const ocrQueue = [
  { id: "DOC-8492", status: "Processing", pages: 45, engine: "Tesseract V5" },
  { id: "DOC-8493", status: "Queued", pages: 12, engine: "Azure Document Intelligence" },
  { id: "DOC-8494", status: "Queued", pages: 128, engine: "AWS Textract" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [pendingOrgs, setPendingOrgs] = useState<any[]>([]);
  const [totalOrgsCount, setTotalOrgsCount] = useState(24);
  const [trialOrgsCount, setTrialOrgsCount] = useState(3);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const pending = parsed.filter((o: any) => o.status === "Pending Approval");
          const trials = parsed.filter((o: any) => o.plan === "Trial");
          setPendingOrgs(pending);
          setTotalOrgsCount(parsed.length);
          setTrialOrgsCount(trials.length);
        } catch (e) {}
      } else {
        // Default demo pending orgs
        setPendingOrgs([
          { id: "org-105", name: "Bharat Petroleum (BPCL)", owner: "Suresh Menon", email: "menons@bpcl.in", plan: "Trial", created: "Today", industry: "Oil & Gas / Refinery" }
        ]);
      }
    }
  }, []);

  const handleQuickApprove = (id: string, email: string) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      if (stored) {
        let orgsList = JSON.parse(stored);
        orgsList = orgsList.map((o: any) => o.id === id ? { ...o, status: "Approved" } : o);
        localStorage.setItem("indusbrain_orgs", JSON.stringify(orgsList));
        setPendingOrgs(orgsList.filter((o: any) => o.status === "Pending Approval"));
      } else {
        setPendingOrgs(pendingOrgs.filter(o => o.id !== id));
      }
    }
  };

  const stats = [
    { name: "Total Organizations", value: totalOrgsCount.toString(), icon: Building2, change: "+3 this month", trend: "up", color: "blue" },
    { name: "Pending Approval", value: pendingOrgs.length.toString(), icon: Clock, change: "Requires Action", trend: "alert", color: "amber" },
    { name: "Trial Accounts", value: trialOrgsCount.toString(), icon: Sparkles, change: "1 Expiring Soon", trend: "up", color: "purple" },
    { name: "Total Plants", value: "142", icon: Factory, change: "+12 this month", trend: "up", color: "emerald" },
    { name: "Total Users", value: "8,234", icon: Users, change: "+412 this week", trend: "up", color: "blue" },
    { name: "AI Requests Today", value: "45,210", icon: BrainCircuit, change: "+12% vs yesterday", trend: "up", color: "emerald" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Super Admin Command Center</h1>
          <p className="text-zinc-400 text-sm mt-1">Global SaaS governance, tenant provisioning, and infrastructure monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/admin/organizations")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" /> Manage Organizations
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            Broadcast Notification
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-extrabold text-white mt-1.5">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' : stat.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className={stat.trend === 'alert' ? 'text-amber-400 font-semibold flex items-center gap-1' : 'text-emerald-400 font-medium'}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PENDING ORGANIZATION APPROVALS QUEUE (Master Prompt Requirement) */}
      {pendingOrgs.length > 0 ? (
        <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-lg shadow-amber-500/5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Pending Self-Service Organization Approvals ({pendingOrgs.length})
                </h3>
                <p className="text-xs text-amber-300/80">
                  New enterprise signups require Super Admin verification before tenant workspace activation.
                </p>
              </div>
            </div>
            <button 
              onClick={() => router.push("/admin/organizations")}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20"
            >
              View Full Governance Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pendingOrgs.slice(0, 3).map((org) => (
              <div key={org.id} className="bg-zinc-950/80 border border-amber-500/20 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{org.name}</span>
                    <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">Pending Review</Badge>
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 space-y-0.5">
                    <div>Owner: <span className="text-zinc-200">{org.owner}</span></div>
                    <div className="text-blue-400">{org.email}</div>
                    <div className="text-zinc-500">Industry: {org.industry}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500">{org.created || "Today"}</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => handleQuickApprove(org.id, org.email)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Quick Approve
                    </button>
                    <button 
                      onClick={() => router.push("/admin/organizations")}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">All Organization Requests Up to Date</h4>
              <p className="text-xs text-zinc-400">There are currently 0 self-service registrations waiting in the pending review queue.</p>
            </div>
          </div>
          <button 
            onClick={() => router.push("/admin/organizations")}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
          >
            Manage Existing Tenants
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Usage Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-6">Global AI Inference Traffic</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aiUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#18181b', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Org Growth Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-6">Organization Growth & Tenant Scaling</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <Bar dataKey="orgs" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Alerts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              Active Tenant Security & Access Alerts
            </h3>
            <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${alert.severity === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{alert.title}</p>
                  <p className="text-xs text-zinc-500 truncate mt-1">{alert.location}</p>
                </div>
                <div className="text-xs text-zinc-500 whitespace-nowrap">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* OCR Queue */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ScanText className="w-5 h-5 text-blue-500" />
              Multi-Tenant OCR Processing Queue
            </h3>
            <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">Manage Queue</button>
          </div>
          <div className="space-y-4 flex-1">
            {ocrQueue.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{job.id}</p>
                    <p className="text-xs text-zinc-500 mt-1">{job.engine} • {job.pages} pages</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.status === "Processing" ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                      <Activity className="w-3 h-3 animate-pulse" />
                      {job.status}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {job.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
