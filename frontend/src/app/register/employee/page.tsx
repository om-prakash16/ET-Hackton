"use client";

import { useState, useEffect } from "react";
import { UserPlus, Building2, Search, CheckCircle, Clock, ShieldCheck, Mail, ArrowRight, ArrowLeft, RefreshCw, Sparkles, AlertCircle, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const MOCK_ORGS = [
  { id: "org-1", name: "Acme Global Industries", code: "IND-2026-001", industry: "Oil & Gas", domain: "acmecorp.com", adminEmail: "admin@acmecorp.com" },
  { id: "org-2", name: "SteelWorks Manufacturing", code: "IND-2026-002", industry: "Steel", domain: "steelworks.io", adminEmail: "hr@steelworks.io" },
  { id: "org-3", name: "PowerGrid Energy Corp", code: "IND-2026-003", industry: "Power & Utilities", domain: "powergrid.com", adminEmail: "admin@powergrid.com" },
  { id: "org-4", name: "BioHealth Pharmaceuticals", code: "IND-2026-004", industry: "Pharmaceutical", domain: "biohealth.ai", adminEmail: "it@biohealth.ai" },
  { id: "org-5", name: "EcoWater Systems", code: "IND-2026-005", industry: "Water Treatment", domain: "ecowater.org", adminEmail: "admin@ecowater.org" },
];

const DEPARTMENTS = [
  "Maintenance", "Operations", "Production", "Quality Assurance", 
  "Safety & Compliance", "Engineering", "HR / People Operations", "IT / Security", "Other"
];

export default function EmployeeRegistrationPage() {
  const router = useRouter();
  
  // Step 1: Select Org, Step 2: Form, Step 3: Status
  const [step, setStep] = useState<"search" | "form" | "status">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<any>(MOCK_ORGS[0]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    department: "Maintenance",
    jobTitle: "",
    agreed: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // Check if an org was created locally recently and append to MOCK_ORGS
    if (typeof window !== "undefined") {
      const storedOrgName = localStorage.getItem("onboarding_org_name");
      const storedOrgCode = localStorage.getItem("onboarding_org_code") || "IND-CUSTOM";
      const storedIndustry = localStorage.getItem("onboarding_industry") || "Industrial";
      if (storedOrgName && !MOCK_ORGS.some(o => o.name === storedOrgName)) {
        MOCK_ORGS.unshift({
          id: "org-local",
          name: storedOrgName,
          code: storedOrgCode,
          industry: storedIndustry,
          domain: "customorg.com",
          adminEmail: localStorage.getItem("onboarding_email") || "admin@customorg.com"
        });
      }
    }
  }, []);

  const filteredOrgs = MOCK_ORGS.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOrg = (org: any) => {
    setSelectedOrg(org);
    setStep("form");
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
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
      if (typeof window !== "undefined") {
        localStorage.setItem("emp_email", formData.email);
        localStorage.setItem("emp_name", `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem("emp_org", selectedOrg.name);
        localStorage.setItem("emp_status", "pending_org_admin");
      }
      setStep("status");
    }, 1000);
  };

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setIsApproved(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("emp_status", "approved");
      }
    }, 1500);
  };

  return (
    <div className="w-full">
      {step === "search" && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Join an Organization</h1>
            <p className="text-zinc-400 text-sm mt-2">
              Search and select your company to submit an employee join request to the Organization Admin.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, Org Code (e.g. IND-2026-001), or domain..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Organization List */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
              Available Companies ({filteredOrgs.length})
            </div>
            {filteredOrgs.map((org) => (
              <div 
                key={org.id}
                onClick={() => handleSelectOrg(org)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {org.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      {org.name}
                      <span className="text-[10px] bg-white/10 text-zinc-300 font-mono px-2 py-0.5 rounded">{org.code}</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-3">
                      <span>Industry: <strong className="text-zinc-300">{org.industry}</strong></span>
                      <span>•</span>
                      <span>Domain: <strong className="text-zinc-300">@{org.domain}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                  Select <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
            {filteredOrgs.length === 0 && (
              <div className="text-center py-8 text-zinc-500 text-sm bg-white/5 rounded-2xl border border-white/10">
                No organizations matched your query. Try searching by domain or contact your Organization Admin for an invite link.
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-6 flex items-center justify-between text-xs text-zinc-400">
            <span>Are you a company owner creating a new workspace?</span>
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold underline">
              Create Organization Workspace
            </Link>
          </div>
        </div>
      )}

      {step === "form" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <div>
              <button onClick={() => setStep("search")} type="button" className="text-xs text-blue-400 hover:underline flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to organization selection
              </button>
              <h2 className="text-xl font-bold text-white">Join {selectedOrg.name}</h2>
              <p className="text-xs text-zinc-400">Org Code: <strong className="text-white font-mono">{selectedOrg.code}</strong> | Industry: <strong className="text-white">{selectedOrg.industry}</strong></p>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold">
              {selectedOrg.name.substring(0, 2).toUpperCase()}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">First Name *</label>
                <input 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  placeholder="John"
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
                  placeholder="Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Work Email *</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder={`john.doe@${selectedOrg.domain}`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
                <p className="text-[10px] text-zinc-500">Should match @{selectedOrg.domain} domain for auto-verification.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Mobile Number *</label>
                <input 
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  required
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Department *</label>
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-zinc-900 text-white">{d}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Job Title / Role *</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input 
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    required
                    placeholder="e.g. Lead Maintenance Engineer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password *</label>
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
                  className="rounded bg-white/5 border-white/10 text-blue-600 focus:ring-blue-500/50 w-4 h-4" 
                />
                <span>I agree to the <a href="#terms" className="text-blue-400 underline">Terms & Conditions</a> and <a href="#privacy" className="text-blue-400 underline">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center text-sm mt-4"
            >
              {isLoading ? "Submitting Request..." : "Request Access from Org Admin"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </form>
        </div>
      )}

      {step === "status" && (
        <div className="text-center space-y-6 py-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${isApproved ? 'bg-emerald-500/30' : 'bg-amber-500/20'}`}></div>
              <div className={`relative w-20 h-20 bg-white/5 border rounded-full flex items-center justify-center shadow-lg ${isApproved ? 'border-emerald-500/40' : 'border-amber-500/40'}`}>
                {isApproved ? (
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                ) : (
                  <Clock className="w-10 h-10 text-amber-400 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          <div>
            <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3 ${isApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
              {isApproved ? "🟢 Employee Account Activated" : "🟡 Status: Pending Org Admin Approval"}
            </Badge>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isApproved ? "Welcome to the Team!" : "Join Request Submitted"}
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
              {isApproved ? (
                <span>Your Org Admin has approved your join request for <strong className="text-white">{selectedOrg.name}</strong>. You now have employee workspace access.</span>
              ) : (
                <span>Your request to join <strong className="text-white">{selectedOrg.name}</strong> has been transmitted to Org Admin (<code className="text-blue-400">{selectedOrg.adminEmail}</code>).</span>
              )}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left text-xs space-y-3">
            <div className="font-bold text-white text-sm border-b border-white/10 pb-2 flex justify-between items-center">
              <span>Employee Access Details</span>
              <span className="text-blue-400">{formData.department} Dept</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2">
              <div><span className="text-zinc-500">Employee Name:</span> <span className="text-white font-medium ml-1">{formData.firstName} {formData.lastName}</span></div>
              <div><span className="text-zinc-500">Work Email:</span> <span className="text-white font-medium ml-1">{formData.email}</span></div>
              <div><span className="text-zinc-500">Job Role:</span> <span className="text-white font-medium ml-1">{formData.jobTitle || "Engineer"}</span></div>
              <div><span className="text-zinc-500">Target Tenant:</span> <span className="text-emerald-400 font-mono font-medium ml-1">{selectedOrg.code}</span></div>
            </div>
          </div>

          <div className="space-y-3">
            {isApproved ? (
              <button 
                onClick={() => router.push("/workspace/admin/dashboard")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center text-sm"
              >
                Enter Employee Workspace <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button 
                onClick={() => router.push("/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center text-sm"
              >
                Return to Login Page <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}

            {!isApproved && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handleSimulateApproval}
                  disabled={isSimulating}
                  className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/30 font-medium py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Simulate Org Admin Approve
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    alert(`[AUTOMATED EMAIL TO ${formData.email}]\nSubject: Join Request Status\n\nYour request to join "${selectedOrg.name}" has been declined by the Organization Admin.\nReason: Email address not recognized in employee roster.\n\nPlease verify your work email with HR and resubmit.`);
                  }}
                  className="bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-500/30 font-medium py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  Simulate Reject (Email)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
