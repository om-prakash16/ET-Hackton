"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Shield, Key, Search, Users, Activity, Lock, RefreshCw, FileText, CheckCircle2, XCircle, Clock, Building2, Battery, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LicensesPage() {
  const KPIS = [
    { title: "Active Licenses", value: "84", icon: Shield, color: "emerald" },
    { title: "Expiring Soon", value: "3", icon: Clock, color: "amber" },
    { title: "Total Seats", value: "2,450", icon: Users, color: "blue" },
    { title: "Used Seats", value: "1,892", icon: Battery, color: "purple" },
  ];

  const MOCK_LICENSES = [
    { id: "LIC-8492-ABCD", org: "Acme Corp", plan: "Professional", seats: { used: 45, total: 100 }, status: "Active", expiry: "Oct 24, 2027", features: ["AI", "OCR"] },
    { id: "LIC-1192-XYZP", org: "Globex Dynamics", plan: "Trial", seats: { used: 5, total: 10 }, status: "Expiring", expiry: "Nov 01, 2026", features: ["OCR"] },
    { id: "LIC-9932-LMNQ", org: "Stark Industries", plan: "Enterprise", seats: { used: 840, total: 1000 }, status: "Active", expiry: "Jan 15, 2028", features: ["AI", "OCR", "Graph"] },
    { id: "LIC-4421-QRST", org: "Wayne Enterprises", plan: "Enterprise", seats: { used: 210, total: 250 }, status: "Active", expiry: "Mar 10, 2028", features: ["AI", "OCR"] },
    { id: "LIC-7751-JHKL", org: "Oscorp", plan: "Professional", seats: { used: 100, total: 100 }, status: "Limit Reached", expiry: "Dec 12, 2026", features: ["AI"] },
  ];

  return (
    <AdminPageTemplate
      title="License Management"
      description="Issue, track, and manage cryptographic licenses and seat allocations for organizations."
      headerIcon={Shield}
      headerAction={
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20">
          <Key className="w-4 h-4 mr-2" />
          Generate License
        </Button>
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
            {kpi.title === "Used Seats" && (
              <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: "77%" }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Licenses Table */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-500 delay-100">
        <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by License Key, Org..." 
              className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 text-xs">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-semibold">License Key</th>
                <th className="px-6 py-4 font-semibold">Organization</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Seats Utilization</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Expiry Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {MOCK_LICENSES.map((lic) => {
                const utilPercent = (lic.seats.used / lic.seats.total) * 100;
                return (
                  <tr key={lic.id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4 font-mono text-zinc-300">{lic.id}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2 text-white">
                      <Building2 className="w-4 h-4 text-zinc-500" /> {lic.org}
                    </td>
                    <td className="px-6 py-4">{lic.plan}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span>{lic.seats.used} / {lic.seats.total}</span>
                          <span className={`${utilPercent > 90 ? 'text-red-400' : 'text-zinc-500'}`}>{Math.round(utilPercent)}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${utilPercent > 90 ? 'bg-red-500' : utilPercent > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${utilPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        className={`border-none ${
                          lic.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
                          lic.status === 'Limit Reached' ? 'bg-red-500/10 text-red-400' : 
                          'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {lic.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{lic.expiry}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Renew License">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Revoke">
                          <Lock className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="More Options">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageTemplate>
  );
}
