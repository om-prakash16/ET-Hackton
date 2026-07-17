"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Layers, Activity, Users, Plus, DollarSign, Crown, Building2, Server, Check, HelpCircle, ArrowUpRight, Copy, Pencil, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SubscriptionsPage() {
  const KPIS = [
    { title: "Active Subscriptions", value: "84", icon: Layers, color: "blue" },
    { title: "Trial Users", value: "12", icon: Users, color: "amber" },
    { title: "Upcoming Renewals", value: "5", icon: Activity, color: "purple" },
    { title: "Monthly Recurring Revenue", value: "$124,500", icon: DollarSign, color: "emerald" },
  ];

  const MOCK_PLANS = [
    { 
      id: 1, 
      name: "Starter", 
      monthlyPrice: "$999", 
      yearlyPrice: "$9,990", 
      status: "Active", 
      organizations: 45,
      features: { users: "20", plants: "1", storage: "100GB", aiEnabled: false }
    },
    { 
      id: 2, 
      name: "Professional", 
      monthlyPrice: "$2,499", 
      yearlyPrice: "$24,990", 
      status: "Active", 
      organizations: 28,
      features: { users: "100", plants: "3", storage: "1TB", aiEnabled: true }
    },
    { 
      id: 3, 
      name: "Enterprise", 
      monthlyPrice: "Custom", 
      yearlyPrice: "Custom", 
      status: "Active", 
      organizations: 11,
      features: { users: "Unlimited", plants: "Unlimited", storage: "Custom", aiEnabled: true }
    },
  ];

  return (
    <AdminPageTemplate
      title="Subscriptions"
      description="Manage SaaS pricing plans, features, and tenant limits."
      headerIcon={Layers}
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-none shadow-lg shadow-purple-500/20">
          <Plus className="w-4 h-4 mr-2" />
          Create New Plan
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
          </div>
        ))}
      </div>

      {/* Plans Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-white mb-4">Pricing Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500 delay-100">
          {MOCK_PLANS.map((plan) => (
            <div key={plan.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col hover:border-zinc-700 transition-colors">
              <div className="p-6 border-b border-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5">
                    {plan.status}
                  </Badge>
                  <div className="flex gap-1 text-zinc-500">
                    <button className="p-1 hover:text-white transition-colors" title="Edit Plan"><Pencil className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Archive"><Archive className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">{plan.monthlyPrice}</span>
                  <span className="text-zinc-500 text-sm mb-1">/mo</span>
                </div>
                <p className="text-xs text-zinc-500">or {plan.yearlyPrice}/year</p>
              </div>
              
              <div className="p-6 flex-1 bg-zinc-950/30 flex flex-col justify-between space-y-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-zinc-500"/> Organizations</span>
                    <span className="font-bold text-white">{plan.organizations} active</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4 text-zinc-500"/> Max Users</span>
                    <span className="font-semibold">{plan.features.users}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-zinc-500"/> Max Plants</span>
                    <span className="font-semibold">{plan.features.plants}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Server className="w-4 h-4 text-zinc-500"/> Storage Limit</span>
                    <span className="font-semibold">{plan.features.storage}</span>
                  </li>
                  <li className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                    <span className="flex items-center gap-2"><Crown className="w-4 h-4 text-zinc-500"/> AI Copilot Access</span>
                    {plan.features.aiEnabled ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-zinc-600 text-xs">—</span>
                    )}
                  </li>
                </ul>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white mt-auto">
                  Manage Plan Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-500 delay-200">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <h3 className="font-bold text-white">Recent Subscription Activity</h3>
          <Button variant="ghost" size="sm" className="text-xs text-blue-400 hover:text-blue-300">View All</Button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 font-semibold">Organization</th>
                <th className="px-6 py-3 font-semibold">Event</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              <tr className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">A</div> Acme Corp
                </td>
                <td className="px-6 py-4"><Badge className="bg-emerald-500/10 text-emerald-400 border-none">Upgraded to Pro</Badge></td>
                <td className="px-6 py-4 text-zinc-500">Oct 24, 2026</td>
                <td className="px-6 py-4 font-mono text-emerald-400">+$1,500/mo</td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">G</div> Globex
                </td>
                <td className="px-6 py-4"><Badge className="bg-amber-500/10 text-amber-400 border-none">Trial Started</Badge></td>
                <td className="px-6 py-4 text-zinc-500">Oct 23, 2026</td>
                <td className="px-6 py-4 font-mono text-zinc-500">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageTemplate>
  );
}
