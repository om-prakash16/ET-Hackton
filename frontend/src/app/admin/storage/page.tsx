"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Database, HardDrive, Archive, UploadCloud, Server, Search, Building2, Download, AlertTriangle, FileText, Image as ImageIcon, Video, Trash2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StoragePage() {
  const KPIS = [
    { title: "Global Storage Used", value: "84.2 TB", total: "100 TB", icon: Database, color: "blue" },
    { title: "Total Documents", value: "1.2M", icon: FileText, color: "emerald" },
    { title: "Total Media", value: "485K", icon: ImageIcon, color: "purple" },
    { title: "Archive/Backups", value: "12.4 TB", icon: Archive, color: "amber" },
  ];

  const MOCK_STORAGE = [
    { org: "Acme Corp", plan: "Enterprise", used: "4.2 TB", quota: "10 TB", util: 42, docs: "124K", media: "42K" },
    { org: "Wayne Enterprises", plan: "Enterprise", used: "8.1 TB", quota: "10 TB", util: 81, docs: "450K", media: "12K" },
    { org: "Oscorp", plan: "Professional", used: "980 GB", quota: "1 TB", util: 98, docs: "45K", media: "8K" },
    { org: "Stark Industries", plan: "Custom", used: "12.4 TB", quota: "50 TB", util: 24, docs: "890K", media: "120K" },
    { org: "Globex Dynamics", plan: "Trial", used: "4 GB", quota: "10 GB", util: 40, docs: "1.2K", media: "50" },
  ];

  return (
    <AdminPageTemplate
      title="Storage Management"
      description="Monitor and allocate object storage limits across all tenant organizations."
      headerIcon={Database}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <Archive className="w-4 h-4 mr-2" />
            Global Cleanup
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20">
            <Server className="w-4 h-4 mr-2" />
            Configure Buckets
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
                <h3 className="text-2xl font-bold text-white flex items-end gap-1">
                  {kpi.value}
                  {kpi.total && <span className="text-sm font-normal text-zinc-500 mb-1">/ {kpi.total}</span>}
                </h3>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            {kpi.total && (
              <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: "84.2%" }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 delay-100">
        {/* Left Side: Global Storage Analytics (Placeholder for charts) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Storage Distribution</h3>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400"/> Documents (PDF, Doc)</span>
                <span className="font-mono text-zinc-400">45.2 TB</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: "55%" }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-emerald-400"/> OCR Inputs (Images)</span>
                <span className="font-mono text-zinc-400">18.4 TB</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: "22%" }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><Video className="w-4 h-4 text-purple-400"/> Video/Audio</span>
                <span className="font-mono text-zinc-400">8.2 TB</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300 flex items-center gap-2"><Archive className="w-4 h-4 text-amber-400"/> AI Backups & Logs</span>
                <span className="font-mono text-zinc-400">12.4 TB</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: "13%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Organizations Table */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search organizations..." 
                className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                <UploadCloud className="w-4 h-4 mr-2" /> Allocate Quota
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Organization</th>
                  <th className="px-6 py-4 font-semibold">Storage Used</th>
                  <th className="px-6 py-4 font-semibold">Docs</th>
                  <th className="px-6 py-4 font-semibold">Media</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {MOCK_STORAGE.map((org, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4 font-medium flex items-center gap-2 text-white">
                      <Building2 className="w-4 h-4 text-zinc-500" /> {org.org}
                      {org.util > 90 && <div title="Storage almost full"><AlertTriangle className="w-4 h-4 text-red-500 ml-1" /></div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono">{org.used} / {org.quota}</span>
                          <span className={`${org.util > 90 ? 'text-red-400' : 'text-zinc-500'}`}>{org.util}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${org.util > 90 ? 'bg-red-500' : org.util > 75 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                            style={{ width: `${org.util}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{org.docs}</td>
                    <td className="px-6 py-4 text-zinc-400">{org.media}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Manage Policy">
                          <Archive className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Adjust Quota">
                          <HardDrive className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPageTemplate>
  );
}
