"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Users, UserPlus, Search, Shield, UserCheck, UserX, Clock, MoreVertical, Edit2, Lock, Key, Mail, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/api";

export default function PlatformUsersPage() {
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [duration, setDuration] = useState("24");
  const [isDelegating, setIsDelegating] = useState(false);

  const handleDelegateSubmit = async () => {
    setIsDelegating(true);
    try {
      await apiCall("/auth/delegate-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedUser.id,
          duration_hours: parseInt(duration)
        })
      });
      setIsDelegateModalOpen(false);
      alert(`Temporary Super Admin access granted to ${selectedUser.name} for ${duration} hours.`);
    } catch (e: any) {
      console.error(e);
      alert("Failed to delegate admin access. Note: In a real system, the user must exist in the database. " + e.message);
      setIsDelegateModalOpen(false); // Close anyway for the mock
    } finally {
      setIsDelegating(false);
    }
  };

  const KPIS = [
    { title: "Total Platform Users", value: "24", icon: Users, color: "blue" },
    { title: "Active Users", value: "21", icon: UserCheck, color: "emerald" },
    { title: "Suspended", value: "1", icon: UserX, color: "red" },
    { title: "Pending Invites", value: "2", icon: Clock, color: "amber" },
  ];

  const MOCK_USERS = [
    { id: "12345678-1234-5678-1234-567812345678", name: "Prakash Om", email: "prakash.om.global@gmail.com", role: "Super Admin", department: "Engineering", status: "Active", lastLogin: "2 mins ago" },
    { id: "87654321-4321-8765-4321-876543210987", name: "Sarah Jenkins", email: "sarah@indusbrain.com", role: "Platform Admin", department: "Operations", status: "Active", lastLogin: "1 hour ago" },
    { id: "33333333-3333-3333-3333-333333333333", name: "Michael Chen", email: "mchen@indusbrain.com", role: "AI Admin", department: "Data Science", status: "Active", lastLogin: "3 hours ago" },
    { id: "44444444-4444-4444-4444-444444444444", name: "David Kim", email: "dkim@indusbrain.com", role: "Security Admin", department: "Security", status: "Suspended", lastLogin: "5 days ago" },
    { id: "55555555-5555-5555-5555-555555555555", name: "Emma Watson", email: "emma@indusbrain.com", role: "Billing Admin", department: "Finance", status: "Pending", lastLogin: "Never" },
  ];

  return (
    <AdminPageTemplate
      title="Platform Users"
      description="Manage internal SaaS employees, their roles, and global platform access permissions."
      headerIcon={Users}
      headerAction={
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Platform User
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

      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-white text-sm">Strict Boundary Enforced</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Users listed here are internal employees managing the multi-tenant platform itself. They do not belong to any specific customer organization and have global access based on their assigned role.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-500 delay-100">
        <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search platform users..." 
              className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 text-xs">
              <option value="">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="platform_admin">Platform Admin</option>
            </select>
            <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 text-xs">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-semibold">User Details</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Platform Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md border border-blue-400/30 shrink-0">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{user.department}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5 flex w-fit items-center gap-1.5">
                      <Shield className="w-3 h-3" /> {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      className={`border-none ${
                        user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
                        user.status === 'Suspended' ? 'bg-red-500/10 text-red-400' : 
                        'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-1.5 text-blue-400 hover:text-white hover:bg-blue-600/20 rounded-md transition-colors" 
                        title="Delegate Temporary Admin"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDelegateModalOpen(true);
                        }}
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Edit User">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Security Settings">
                        <Lock className="w-4 h-4" />
                      </button>
                      {user.status === 'Pending' && (
                        <button className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded-md transition-colors" title="Resend Invite">
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
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

      {isDelegateModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-blue-400">
              <Clock className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white">Delegate Admin Access</h2>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              You are about to grant temporary Super Admin privileges to <strong className="text-white">{selectedUser.name}</strong>. Please select the duration.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Duration</label>
                <select 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                  <option value="48">48 Hours</option>
                  <option value="168">7 Days</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => setIsDelegateModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                onClick={handleDelegateSubmit}
                disabled={isDelegating}
              >
                {isDelegating ? "Delegating..." : "Grant Access"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminPageTemplate>
  );
}
