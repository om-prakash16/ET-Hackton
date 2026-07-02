"use client";

import { useState, useEffect } from "react";
import { UserPlus, Building2, CheckCircle2, ShieldCheck, Mail, ArrowRight, Lock, Sparkles, Briefcase, Key } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function InvitationJoinPage() {
  const router = useRouter();
  const params = useParams();
  const token = typeof params?.token === "string" ? params.token : "inv-acme-2026";

  const [orgDetails, setOrgDetails] = useState({
    name: "Acme Global Industries",
    code: "IND-2026-001",
    adminEmail: "admin@acmecorp.com",
    assignedDepartment: "Maintenance & Operations",
    assignedRole: "Plant Maintenance Engineer",
    domain: "acmecorp.com"
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreed: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Derive org from token for demo flexibility
    if (token.toLowerCase().includes("steel")) {
      setOrgDetails({
        name: "SteelWorks Manufacturing",
        code: "IND-2026-002",
        adminEmail: "hr@steelworks.io",
        assignedDepartment: "Production & Quality",
        assignedRole: "Lead QA Specialist",
        domain: "steelworks.io"
      });
      setFormData(prev => ({ ...prev, email: "employee@steelworks.io" }));
    } else if (token.toLowerCase().includes("power")) {
      setOrgDetails({
        name: "PowerGrid Energy Corp",
        code: "IND-2026-003",
        adminEmail: "admin@powergrid.com",
        assignedDepartment: "Engineering",
        assignedRole: "Grid Systems Engineer",
        domain: "powergrid.com"
      });
      setFormData(prev => ({ ...prev, email: "engineer@powergrid.com" }));
    } else if (typeof window !== "undefined" && localStorage.getItem("inv_email")) {
      const storedEmail = localStorage.getItem("inv_email") || "invited@annusaas.com";
      const storedRole = localStorage.getItem("inv_role") || "Enterprise User";
      const storedDept = localStorage.getItem("inv_dept") || "Operations";
      const storedOrg = localStorage.getItem("inv_org") || "Annu SAAS";
      setOrgDetails({
        name: storedOrg,
        code: "IND-2026-888",
        adminEmail: "admin@annusaas.com",
        assignedDepartment: storedDept,
        assignedRole: storedRole,
        domain: storedEmail.includes("@") ? storedEmail.split("@")[1] : "annusaas.com"
      });
      setFormData(prev => ({ ...prev, email: storedEmail }));
    } else {
      setFormData(prev => ({ ...prev, email: "alex.rivera@acmecorp.com" }));
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.agreed) {
      setError("You must agree to Terms & Conditions and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("emp_email", formData.email);
        localStorage.setItem("emp_name", `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem("emp_org", orgDetails.name);
        localStorage.setItem("emp_status", "approved");
      }
      setTimeout(() => {
        router.push("/workspace/admin/dashboard");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full">
      {!isSuccess ? (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <UserPlus className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-2">
              🟢 Verified Invitation Token
            </Badge>
            <h1 className="text-3xl font-bold text-white tracking-tight">Accept Your Invitation</h1>
            <p className="text-zinc-400 text-sm mt-2">
              You have been invited to join <span className="text-white font-semibold">{orgDetails.name}</span> on IndusBrain AI.
            </p>
          </div>

          {/* Invitation Details Banner */}
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/30 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" /> Target Workspace
              </div>
              <span className="font-mono text-xs bg-white/10 text-white px-2 py-0.5 rounded font-bold">{orgDetails.code}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-zinc-400">Invited by:</span> <span className="text-white font-medium ml-1">{orgDetails.adminEmail}</span></div>
              <div><span className="text-zinc-400">Department:</span> <span className="text-emerald-400 font-semibold ml-1">{orgDetails.assignedDepartment}</span></div>
              <div className="col-span-2"><span className="text-zinc-400">Assigned Role:</span> <span className="text-white font-semibold ml-1">{orgDetails.assignedRole}</span></div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">First Name *</label>
                <input 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  placeholder="Alex"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Last Name *</label>
                <input 
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  placeholder="Rivera"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex justify-between">
                  <span>Work Email *</span>
                  <span className="text-[10px] text-emerald-400">Token Locked</span>
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 px-3.5 text-zinc-300 focus:outline-none text-sm font-mono cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Mobile Number *</label>
                <input 
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  required
                  placeholder="+1 (555) 019-8372"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Create Password *</label>
                <input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Confirm Password *</label>
                <input 
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-2 text-xs text-zinc-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.agreed} 
                  onChange={(e) => setFormData({...formData, agreed: e.target.checked})} 
                  className="rounded bg-white/5 border-white/10 text-emerald-600 focus:ring-emerald-500/50 w-4 h-4" 
                />
                <span>I accept the invitation and agree to <a href="#terms" className="text-blue-400 underline">Terms & Conditions</a> & <a href="#privacy" className="text-blue-400 underline">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center text-sm mt-4"
            >
              {isLoading ? "Verifying Token & Creating Account..." : "Accept Invitation & Join Workspace"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-zinc-500">
            Received this invitation in error? <a href="mailto:support@indusbrain.ai" className="text-zinc-400 underline">Report invalid invitation</a>.
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 py-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          <div>
            <Badge variant="outline" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-3">
              🎉 Invitation Accepted Successfully
            </Badge>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">You are now part of {orgDetails.name}!</h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
              Your employee credentials have been registered. Redirecting you to the enterprise workspace...
            </p>
          </div>
          <div className="pt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
}
