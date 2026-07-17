"use client";

import { useState, useEffect } from "react";
import { 
  Building2, Users, Database, Clock, Ban, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Calendar, Download, MoreVertical, 
  CheckCircle2, AlertTriangle, Info, ArrowRight, ExternalLink, Activity,
  DollarSign, UserCheck, AlertCircle, CheckCircle, HelpCircle, FileText, Send, X, Eye, Play, Pause
} from "lucide-react";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

// 1. Chart Data matching screenshot EXACTLY
const platformOverview30D = [
  { date: "Jun 9", orgs: 45, users: 4200 },
  { date: "Jun 16", orgs: 68, users: 6500 },
  { date: "Jun 23", orgs: 92, users: 8900 },
  { date: "Jun 30", orgs: 115, users: 10800 },
  { date: "Jul 8", orgs: 128, users: 12458 },
];

const platformOverview90D = [
  { date: "Apr", orgs: 20, users: 1500 },
  { date: "May", orgs: 55, users: 5200 },
  { date: "Jun", orgs: 95, users: 9400 },
  { date: "Jul", orgs: 128, users: 12458 },
];

const statusDistributionData = [
  { name: "Approved / Active", value: 98, percentage: "76.6%", color: "#10b981" },
  { name: "Pending Review", value: 18, percentage: "14.1%", color: "#f59e0b" },
  { name: "Suspended", value: 7, percentage: "5.5%", color: "#ef4444" },
  { name: "Rejected", value: 5, percentage: "3.9%", color: "#991b1b" },
];

const topIndustries = [
  { name: "Oil & Gas", count: 32, percentage: 25.0, color: "#3b82f6" },
  { name: "Metals & Mining", count: 24, percentage: 18.8, color: "#3b82f6" },
  { name: "Power & Utilities", count: 18, percentage: 14.1, color: "#3b82f6" },
  { name: "Chemical & Petrochemical", count: 16, percentage: 12.5, color: "#3b82f6" },
  { name: "Manufacturing", count: 14, percentage: 10.9, color: "#3b82f6" },
  { name: "Construction", count: 10, percentage: 7.8, color: "#3b82f6" },
  { name: "Others", count: 14, percentage: 10.9, color: "#3b82f6" },
];

const storageUsageData = [
  { name: "Used", value: 18.4, percentage: "58%", color: "#3b82f6" },
  { name: "Available", value: 13.2, percentage: "42%", color: "#10b981" },
];

const usersGrowth30D = [
  { date: "Jun 9", users: 4200 },
  { date: "Jun 16", users: 6500 },
  { date: "Jun 23", users: 8900 },
  { date: "Jun 30", users: 10800 },
  { date: "Jul 8", users: 12458 },
];

const revenueOverview30D = [
  { date: "Jun 9", revenue: 45000 },
  { date: "Jun 12", revenue: 52000 },
  { date: "Jun 15", revenue: 48000 },
  { date: "Jun 18", revenue: 65000 },
  { date: "Jun 21", revenue: 58000 },
  { date: "Jun 24", revenue: 82000 },
  { date: "Jun 27", revenue: 95000 },
  { date: "Jun 30", revenue: 110000 },
  { date: "Jul 3", revenue: 105000 },
  { date: "Jul 6", revenue: 120000 },
  { date: "Jul 8", revenue: 132456 },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "3 organizations pending review", time: "2 min ago", icon: Clock, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: 2, type: "danger", message: "High storage usage in 2 organizations", time: "15 min ago", icon: AlertTriangle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: 3, type: "danger", message: "OCR queue delay detected", time: "1 hr ago", icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: 4, type: "info", message: "AI service rate limit high", time: "2 hr ago", icon: Info, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: 5, type: "success", message: "System backup completed", time: "3 hr ago", icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];

const systemHealth = [
  { name: "Web Application", status: "Operational" },
  { name: "API Services", status: "Operational" },
  { name: "Database (PostgreSQL)", status: "Operational" },
  { name: "Vector Database (pgvector)", status: "Operational" },
  { name: "Redis Cache", status: "Operational" },
  { name: "AI Worker Services", status: "Operational" },
];

const INITIAL_REGISTRATIONS = [
  { id: "GU", name: "Gurucraft Oil & Gas", domain: "gurucraft.com", industry: "Oil & Gas / Refinery", owner: "Annu Sharma", email: "annusharma@gurucraft.com", registeredOn: "Jul 8, 2026 10:30 AM", status: "Pending Review" },
  { id: "TS", name: "Tata Steel", domain: "tatasteel.com", industry: "Metals & Mining", owner: "Ravi Kumar", email: "ravi.kumar@tatasteel.com", registeredOn: "Jul 8, 2026 09:15 AM", status: "Pending Review" },
  { id: "RI", name: "Reliance Industries", domain: "reliance.com", industry: "Oil & Gas / Petrochemical", owner: "Priya Sharma", email: "priya.sharma@ril.com", registeredOn: "Jul 7, 2026 04:22 PM", status: "Approved" },
  { id: "JS", name: "JSW Steel Works", domain: "jswsteel.com", industry: "Metals & Mining", owner: "Amit Patel", email: "amit.patel@jsw.in", registeredOn: "Jul 7, 2026 02:10 PM", status: "Pending Review" },
  { id: "AD", name: "Adani Green Energy", domain: "adani.com", industry: "Power & Utilities", owner: "Neha Singh", email: "neha.singh@adani.com", registeredOn: "Jul 7, 2026 11:45 AM", status: "Approved" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  // Timeframe states
  const [platformTimeframe, setPlatformTimeframe] = useState("Last 30 Days");
  const [usersTimeframe, setUsersTimeframe] = useState("Last 30 Days");
  const [revenueTimeframe, setRevenueTimeframe] = useState("Last 30 Days");

  // Interactive Table & Modals state
  const [registrations, setRegistrations] = useState<any[]>(INITIAL_REGISTRATIONS);
  const [selectedOrgForAction, setSelectedOrgForAction] = useState<any | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Stats numbers
  const [totalOrgsCount, setTotalOrgsCount] = useState(128);
  const [activeOrgsCount, setActiveOrgsCount] = useState(98);
  const [pendingReviewCount, setPendingReviewCount] = useState(18);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0) {
            setTotalOrgsCount(Math.max(128, parsed.length));
            const active = parsed.filter((o: any) => o.status === "Approved" || o.status === "Approved / Active");
            const pending = parsed.filter((o: any) => o.status === "Pending Approval" || o.status === "Pending Review" || o.status === "Pending");
            setActiveOrgsCount(Math.max(98, active.length));
            setPendingReviewCount(Math.max(18, pending.length));

            // Merge stored into registrations
            const merged = [...INITIAL_REGISTRATIONS];
            parsed.forEach((po: any) => {
              if (!merged.some(m => m.name === po.name)) {
                merged.unshift({
                  id: po.name.slice(0, 2).toUpperCase(),
                  name: po.name,
                  domain: po.email ? po.email.split("@")[1] : "tenant.com",
                  industry: po.industry || "Industrial",
                  owner: po.owner || "Enterprise Admin",
                  email: po.email || "admin@tenant.com",
                  registeredOn: "Jul 8, 2026 Today",
                  status: po.status === "Approved" ? "Approved" : "Pending Review"
                });
              }
            });
            setRegistrations(merged.slice(0, 7));
          }
        } catch (e) {}
      }
    }
  }, []);

  const saveRegistrations = (updated: any[]) => {
    setRegistrations(updated);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      let orgsList = stored ? JSON.parse(stored) : [];
      updated.forEach(u => {
        orgsList = orgsList.map((o: any) => o.name === u.name ? { ...o, status: u.status === "Approved" ? "Approved" : o.status } : o);
      });
      localStorage.setItem("indusbrain_orgs", JSON.stringify(orgsList));
    }
  };

  const handleApproveOrg = (org: any) => {
    const updated = registrations.map(r => r.id === org.id ? { ...r, status: "Approved" } : r);
    saveRegistrations(updated);
    setActiveOrgsCount(prev => prev + 1);
    setPendingReviewCount(prev => Math.max(0, prev - 1));
    setIsActionModalOpen(false);
    alert(`✅ Organization "${org.name}" has been Approved and Activated! Tenant isolation is live.`);
  };

  const handleSuspendOrg = (org: any) => {
    const updated = registrations.map(r => r.id === org.id ? { ...r, status: "Suspended" } : r);
    saveRegistrations(updated);
    setIsActionModalOpen(false);
    alert(`⚠️ Organization "${org.name}" has been Suspended.`);
  };

  const handleOpenEmailModal = (org: any) => {
    setSelectedOrgForAction(org);
    setEmailSubject(`IndusBrain AI - Official Update regarding your registration (${org.name})`);
    setEmailMessage(`Hello ${org.owner},\n\nWe are writing regarding your enterprise tenant registration for ${org.name}.\n\nYour onboarding documentation has been reviewed by the Super Admin team.\n\nPlease log in to your tenant dashboard to review your active quotas and department provisioning status.`);
    setIsActionModalOpen(false);
    setIsEmailModalOpen(true);
  };

  const handleSendRealEmail = async () => {
    if (!selectedOrgForAction) return;
    setIsSendingEmail(true);

    const smtpHost = typeof window !== "undefined" ? localStorage.getItem("smtp_host") : null;
    const smtpPort = typeof window !== "undefined" ? localStorage.getItem("smtp_port") : null;
    const smtpUser = typeof window !== "undefined" ? localStorage.getItem("smtp_user") : null;
    const smtpPass = typeof window !== "undefined" ? localStorage.getItem("smtp_pass") : null;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedOrgForAction.email,
          subject: emailSubject,
          text: emailMessage,
          html: `<div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; background: #ffffff; color: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0284c7; margin-top: 0;">Super Admin Notification</h2>
            <p style="font-size: 14px; color: #475569;">Hello <strong>${selectedOrgForAction.owner}</strong>,</p>
            <p style="font-size: 14px; color: #475569;">${emailMessage.replace(/\n/g, '<br/>')}</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1; font-size: 12px;">
              <p style="margin: 3px 0;"><strong>Organization:</strong> ${selectedOrgForAction.name}</p>
              <p style="margin: 3px 0;"><strong>Industry:</strong> ${selectedOrgForAction.industry}</p>
              <p style="margin: 3px 0;"><strong>Status:</strong> ${selectedOrgForAction.status}</p>
            </div>
            <div style="text-align: center; margin: 25px 0;">
              <a href="http://localhost:3000/login" style="background: #0284c7; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; display: inline-block;">Access Command Center</a>
            </div>
          </div>`,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.isEthereal && data.previewUrl) {
          if (confirm(`📧 Ethereal Test Email Dispatched to ${selectedOrgForAction.email}!\n\nOpen test preview URL in browser?`)) {
            window.open(data.previewUrl, "_blank");
          }
        } else {
          alert(`✅ Official Notice sent successfully to ${selectedOrgForAction.email}!`);
        }
      } else {
        alert(`⚠️ Email delivery notice: ${data.error}`);
      }
    } catch (err: any) {
      alert(`⚠️ Email error: ${err.message}`);
    } finally {
      setIsSendingEmail(false);
      setIsEmailModalOpen(false);
    }
  };

  const handleExportSummary = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      reportTitle: "Super Admin Dashboard Comprehensive Report",
      generatedAt: new Date().toISOString(),
      metrics: {
        totalOrganizations: totalOrgsCount,
        activeOrganizations: activeOrgsCount,
        pendingReview: pendingReviewCount,
        totalUsers: 12458,
        activeUsers30D: 7842,
        totalRevenue: "$132,456",
        storageUsed: "18.4 TB / 31.6 TB Total"
      },
      recentRegistrations: registrations,
      systemHealthStatus: "100% Operational"
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SuperAdmin_Dashboard_Report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    alert("✅ Super Admin Comprehensive JSON Report Exported!");
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#0b101d] text-slate-100 min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <h1 className="text-[26px] font-extrabold text-white tracking-tight flex items-center gap-3">
            Super Admin Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1">Overview of platform, tenants, and system health</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#131b2e] border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2 shadow-sm cursor-pointer hover:border-slate-700 transition-colors">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Jul 2 – Jul 8, 2026</span>
          </div>
          <button 
            onClick={handleExportSummary}
            className="bg-[#131b2e] hover:bg-slate-800 border border-slate-700/80 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" /> Export
          </button>
        </div>
      </div>

      {/* Row 1: Top Metric Cards (7 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        
        {/* Card 1: Total Organizations */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-blue-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Total Organizations</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-blue-400 transition-colors">{totalOrgsCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">12.4% vs last 30 days</span>
          </div>
        </div>

        {/* Card 2: Active Organizations */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-emerald-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Active Organizations</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-emerald-400 transition-colors">{activeOrgsCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">8.6% vs last 30 days</span>
          </div>
        </div>

        {/* Card 3: Pending Review */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Pending Review</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-amber-400 transition-colors">{pendingReviewCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 animate-pulse">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-amber-400 gap-1">
            <ArrowDownRight className="w-3 h-3" />
            <span className="truncate">3.2% vs last 30 days</span>
          </div>
        </div>

        {/* Card 4: Total Users */}
        <div 
          onClick={() => router.push("/admin/users")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-purple-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Total Users</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-purple-400 transition-colors">12,458</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">15.3% vs last 30 days</span>
          </div>
        </div>

        {/* Card 5: Active Users (30D) */}
        <div 
          onClick={() => router.push("/admin/users")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-cyan-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Active Users (30D)</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-cyan-400 transition-colors">7,842</p>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">11.7% vs last 30 days</span>
          </div>
        </div>

        {/* Card 6: Total Revenue */}
        <div 
          onClick={() => alert("💰 Total Platform Revenue: $132,456 (↑ 16.3% MRR Growth)")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-pink-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Total Revenue</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-pink-400 transition-colors">$132,456</p>
            </div>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">16.3% vs last 30 days</span>
          </div>
        </div>

        {/* Card 7: Storage Used */}
        <div 
          onClick={() => router.push("/admin/organizations")}
          className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-teal-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 truncate">Storage Used</p>
              <p className="text-[22px] font-extrabold text-white mt-1 group-hover:text-teal-400 transition-colors">18.4 TB</p>
            </div>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-center text-[11px] font-bold text-emerald-400 gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="truncate">10.2% vs last 30 days</span>
          </div>
        </div>

      </div>

      {/* Row 2: Platform Overview Chart (2 cols) | Status Distribution Donut | Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* Platform Overview Dual Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Platform Overview</h3>
            <select 
              value={platformTimeframe}
              onChange={(e) => setPlatformTimeframe(e.target.value)}
              className="bg-[#0b101d] border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
          </div>
          <div className="h-[220px] w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={platformTimeframe === "Last 30 Days" ? platformOverview30D : platformOverview90D} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px', padding: '10px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    formatter={(val, name) => [val, name === "orgs" ? "Organizations" : "Users"]}
                    labelFormatter={(label) => `Jul 8, 2026 (${label})`}
                  />
                  <Line type="monotone" dataKey="orgs" name="Organizations: 128" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", stroke: "#0f172a", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#60a5fa" }} />
                  <Line type="monotone" dataKey="users" name="Users: 12,458" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", stroke: "#0f172a", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#34d399" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex items-center justify-end gap-5 text-xs font-semibold pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-slate-300">Organizations: 128</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-slate-300">Users: 12,458</span></div>
          </div>
        </div>

        {/* Organization Status Distribution Donut */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <h3 className="text-sm font-bold text-white mb-2">Organization Status Distribution</h3>
          <div className="flex flex-col items-center justify-center flex-1 my-2">
            <div className="h-[150px] w-[150px] relative flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[24px] font-extrabold text-white leading-none">{totalOrgsCount}</span>
                <span className="text-[11px] font-medium text-slate-400 mt-1">Total</span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800/60">
            {statusDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium truncate">{item.name}</span>
                </div>
                <span className="text-slate-400 font-semibold">{item.value} ({item.percentage})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Feed */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Recent Alerts</h3>
            <button 
              onClick={() => alert("🔔 Showing all active system and tenant alerts. All services under continuous automated monitoring.")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                onClick={() => router.push("/admin/organizations")}
                className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0b101d]/60 border border-slate-800/60 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className={`p-1.5 rounded-lg shrink-0 border ${alert.color}`}>
                  <alert.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-slate-200 group-hover:text-white leading-snug">{alert.message}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Recent Organization Registrations (2 cols) | Top Industries | Storage Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* Recent Organization Registrations Table (2 Cols) */}
        <div className="lg:col-span-2 bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Recent Organization Registrations</h3>
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
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-2.5">Organization</th>
                  <th className="pb-2.5">Industry</th>
                  <th className="pb-2.5">Owner</th>
                  <th className="pb-2.5">Registered On</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {registrations.map((org) => (
                  <tr key={org.id + org.name} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3 font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-[11px] shrink-0 border border-blue-500/30">
                          {org.id}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold truncate group-hover:text-blue-400 transition-colors">{org.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{org.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-300 font-medium truncate max-w-[110px]">{org.industry}</td>
                    <td className="py-3">
                      <div className="min-w-0">
                        <p className="text-slate-200 font-semibold truncate">{org.owner}</p>
                        <p className="text-[10px] text-blue-400 truncate">{org.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400 text-[11px] whitespace-nowrap">{org.registeredOn}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap ${
                        org.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        org.status === 'Suspended' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => { setSelectedOrgForAction(org); setIsActionModalOpen(true); }}
                        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Manage Tenant Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Industries Progress Bars */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Top Industries</h3>
            <button 
              onClick={() => router.push("/admin/organizations")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {topIndustries.map((ind) => (
              <div key={ind.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300 truncate">{ind.name}</span>
                  <span className="text-slate-400 font-semibold shrink-0 pl-2">{ind.count} ({ind.percentage}%)</span>
                </div>
                <div className="w-full bg-[#0b101d] rounded-full h-1.5 overflow-hidden border border-slate-800/50">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${ind.percentage * 3.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Usage Gauge & Breakdown */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Storage Usage</h3>
            <button 
              onClick={() => alert("📦 Storage Quota Status:\n\n• Used: 18.4 TB (58%)\n• Available: 13.2 TB (42%)\n• Total Allocated: 31.6 TB\n\nAll tenant storage buckets isolated and encrypted via AWS S3 & GCP Cloud Storage.")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View details
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 my-2">
            <div className="h-[140px] w-[140px] relative flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {storageUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }} formatter={(val) => [`${val} TB`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[20px] font-extrabold text-white leading-none">18.4 <span className="text-xs">TB</span></span>
                <span className="text-[10px] font-bold text-emerald-400 mt-1">Used</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-xs pt-3 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shrink-0" />
                <span>Used</span>
              </div>
              <span className="text-white font-bold">18.4 TB (58%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" />
                <span>Available</span>
              </div>
              <span className="text-emerald-400 font-bold">13.2 TB (42%)</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/40">
              <span className="text-slate-400 font-semibold">Total</span>
              <span className="text-slate-200 font-bold">31.6 TB</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 4: Users Growth | Revenue Overview | System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Users Growth Area Chart */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Users Growth</h3>
            <select 
              value={usersTimeframe}
              onChange={(e) => setUsersTimeframe(e.target.value)}
              className="bg-[#0b101d] border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
          </div>
          <div className="h-[180px] w-full relative">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usersGrowth30D} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}K`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val} Users`, "Total"]}
                  />
                  <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" dot={{ r: 4, fill: "#8b5cf6", stroke: "#0f172a", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#c4b5fd" }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
            <div className="absolute top-2 right-4 bg-[#0b101d]/90 border border-purple-500/30 px-3 py-1.5 rounded-xl text-right shadow-md pointer-events-none">
              <p className="text-base font-extrabold text-white">12,458</p>
              <p className="text-[10px] font-semibold text-purple-400">Total Users</p>
            </div>
          </div>
        </div>

        {/* Revenue Overview Bar Chart */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Revenue Overview</h3>
            <select 
              value={revenueTimeframe}
              onChange={(e) => setRevenueTimeframe(e.target.value)}
              className="bg-[#0b101d] border border-slate-800 rounded-lg text-[11px] font-semibold text-slate-300 px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Quarter">This Quarter</option>
            </select>
          </div>
          <div className="h-[180px] w-full relative">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueOverview30D} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}K`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.75rem', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`$${(val || 0).toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="absolute top-2 right-4 bg-[#0b101d]/90 border border-blue-500/30 px-3 py-1.5 rounded-xl text-right shadow-md pointer-events-none">
              <p className="text-base font-extrabold text-white">$132,456</p>
              <p className="text-[10px] font-semibold text-blue-400">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">System Health</h3>
            <button 
              onClick={() => alert("✅ All 6 Core Microservices and Vector Engine are 100% Operational! Latency < 18ms.")}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View details
            </button>
          </div>
          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {systemHealth.map((sys) => (
              <div key={sys.name} className="flex items-center justify-between py-1.5 border-b border-slate-800/40 last:border-0">
                <span className="text-xs font-medium text-slate-300 truncate pr-2">{sys.name}</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {sys.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL 1: Interactive Tenant Action Modal */}
      {isActionModalOpen && selectedOrgForAction && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131b2e] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" /> Tenant Governance Actions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedOrgForAction.name} ({selectedOrgForAction.id})</p>
              </div>
              <button onClick={() => setIsActionModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#0b101d] p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-400">Owner Name:</span> <span className="text-white font-bold">{selectedOrgForAction.owner}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Admin Email:</span> <span className="text-blue-400 font-semibold">{selectedOrgForAction.email}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Industry:</span> <span className="text-slate-200">{selectedOrgForAction.industry}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Current Status:</span> 
                <span className={selectedOrgForAction.status === 'Approved' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{selectedOrgForAction.status}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {selectedOrgForAction.status !== "Approved" && (
                <button 
                  onClick={() => handleApproveOrg(selectedOrgForAction)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle className="w-4 h-4" /> Approve & Activate Tenant Access
                </button>
              )}
              
              <button 
                onClick={() => handleOpenEmailModal(selectedOrgForAction)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                <Send className="w-4 h-4" /> Send Official Email Notice to Admin
              </button>

              {selectedOrgForAction.status === "Approved" && (
                <button 
                  onClick={() => handleSuspendOrg(selectedOrgForAction)}
                  className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Ban className="w-4 h-4" /> Suspend Tenant Isolation Workspace
                </button>
              )}

              <button 
                onClick={() => router.push("/admin/organizations")}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" /> Open Full Organization Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Send Official Email Notice Modal */}
      {isEmailModalOpen && selectedOrgForAction && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131b2e] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" /> Send Email Notice to {selectedOrgForAction.owner}
              </h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">To (Recipient Address):</label>
                <input 
                  type="text" 
                  disabled
                  value={`${selectedOrgForAction.owner} <${selectedOrgForAction.email}>`}
                  className="w-full bg-[#0b101d] border border-slate-800 rounded-lg px-3 py-2 text-slate-400"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Subject Line:</label>
                <input 
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-[#0b101d] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Message Content:</label>
                <textarea 
                  rows={5}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  className="w-full bg-[#0b101d] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button 
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendRealEmail}
                disabled={isSendingEmail}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 disabled:opacity-50"
              >
                {isSendingEmail ? <Activity className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSendingEmail ? "Transmitting..." : "Send Official Email"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
