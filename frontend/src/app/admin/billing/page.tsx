"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { DollarSign, FileText, CreditCard, Activity, Search, Filter, Download, ArrowUpRight, TrendingUp, AlertCircle, Building2, MoreVertical, CreditCard as CardIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "invoices" | "payments" | "gateways";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("invoices");

  const KPIS = [
    { title: "Monthly Revenue", value: "$124,500", change: "+12%", trend: "up", icon: DollarSign, color: "emerald" },
    { title: "Annual Run Rate", value: "$1.49M", change: "+15%", trend: "up", icon: TrendingUp, color: "blue" },
    { title: "Pending Payments", value: "$12,400", change: "4 invoices", trend: "down", icon: AlertCircle, color: "amber" },
    { title: "Failed Payments", value: "$2,100", change: "1 invoice", trend: "up", icon: Activity, color: "red" },
  ];

  const MOCK_INVOICES = [
    { id: "INV-2026-001", org: "Acme Corp", amount: "$2,499.00", status: "Paid", date: "Oct 24, 2026", method: "Stripe •••• 4242" },
    { id: "INV-2026-002", org: "Globex Dynamics", amount: "$999.00", status: "Pending", date: "Oct 25, 2026", method: "Bank Transfer" },
    { id: "INV-2026-003", org: "Stark Industries", amount: "$4,500.00", status: "Failed", date: "Oct 22, 2026", method: "Razorpay" },
    { id: "INV-2026-004", org: "Wayne Enterprises", amount: "$12,000.00", status: "Paid", date: "Oct 20, 2026", method: "Wire Transfer" },
    { id: "INV-2026-005", org: "Oscorp", amount: "$2,499.00", status: "Paid", date: "Oct 19, 2026", method: "Stripe •••• 5555" },
  ];

  return (
    <AdminPageTemplate
      title="Billing & Payments"
      description="Manage financial transactions, invoices, taxes, and payment gateways."
      headerIcon={DollarSign}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none shadow-lg shadow-emerald-500/20">
            <FileText className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
        {KPIS.map((kpi, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-${kpi.color}-500/5 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110`} />
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium">
              <span className={`text-${kpi.trend === 'up' && kpi.color !== 'red' ? 'emerald' : kpi.color === 'red' && kpi.trend === 'up' ? 'red' : 'emerald'}-400 flex items-center gap-1`}>
                {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
              </span>
              <span className="text-zinc-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "invoices" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <FileText className="w-4 h-4" /> Invoices
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "payments" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Activity className="w-4 h-4" /> Payment History
        </button>
        <button
          onClick={() => setActiveTab("gateways")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "gateways" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <CreditCard className="w-4 h-4" /> Gateways & Taxes
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "invoices" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search invoices by ID, org..." 
                  className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Invoice ID</th>
                    <th className="px-6 py-4 font-semibold">Organization</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Payment Method</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_INVOICES.map((inv) => (
                    <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4 font-mono text-emerald-400">{inv.id}</td>
                      <td className="px-6 py-4 font-medium flex items-center gap-2 text-white">
                        <Building2 className="w-4 h-4 text-zinc-500" /> {inv.org}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-white">{inv.amount}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`border-none ${
                            inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 
                            inv.status === 'Failed' ? 'bg-red-500/10 text-red-400' : 
                            'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{inv.date}</td>
                      <td className="px-6 py-4 text-zinc-400 flex items-center gap-2">
                        <CardIcon className="w-4 h-4" /> {inv.method}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Download PDF">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="View Details">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="More Options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "gateways" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Payment Gateways</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">S</div>
                    <div>
                      <h4 className="font-bold text-white">Stripe</h4>
                      <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected • Live Mode</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">R</div>
                    <div>
                      <h4 className="font-bold text-white">Razorpay</h4>
                      <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected • Live Mode</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300">Configure</Button>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Tax Configuration</h3>
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Default Tax Rate (%)</label>
                  <input type="number" defaultValue="18" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tax Type Name</label>
                  <input type="text" defaultValue="GST" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Save Tax Settings</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <Activity className="w-16 h-16 text-zinc-800 mb-4" />
             <h2 className="text-xl font-bold text-white">Payment History Log</h2>
             <p className="text-zinc-500 mt-2 max-w-sm text-sm">Detailed immutable log of all transactions will appear here, synced directly from Stripe/Razorpay.</p>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}
