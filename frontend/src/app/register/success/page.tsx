"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, ShieldCheck, Mail, Building2, ArrowRight, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("Acme Global Industries");
  const [ownerEmail, setOwnerEmail] = useState("owner@acme.com");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("onboarding_email") || "owner@acme.com";
      const org = localStorage.getItem("onboarding_org_name") || "Acme Global Industries";
      const firstName = localStorage.getItem("onboarding_first_name") || "Registration";
      const lastName = localStorage.getItem("onboarding_last_name") || "Owner";
      const industry = localStorage.getItem("onboarding_industry") || "Oil & Gas / Refinery";
      const companySize = localStorage.getItem("onboarding_company_size") || "500-1,000 employees";

      setOwnerEmail(email);
      setOrgName(org);

      // Register this pending org into localStorage for Super Admin review
      const existingOrgsStr = localStorage.getItem("indusbrain_orgs");
      let orgsList = [];
      if (existingOrgsStr) {
        try { orgsList = JSON.parse(existingOrgsStr); } catch (e) {}
      }

      const pendingOrgId = `org-${Date.now()}`;
      const newOrg = {
        id: pendingOrgId,
        name: org,
        plan: "Professional",
        users: 1,
        status: "Pending Approval",
        created: new Date().toISOString().split("T")[0],
        owner: `${firstName} ${lastName}`,
        email: email,
        industry: industry,
        companySize: companySize,
        storage: "500 GB",
        license: "50 Users",
        plants: 1,
        source: "Self-Service Registration",
        defaultDepartments: ["Maintenance", "Operations", "Production", "Quality", "Safety", "Engineering", "HR"]
      };

      // Prevent duplicate insertion if refreshed
      if (!orgsList.some((o: any) => o.email === email && o.status === "Pending Approval")) {
        localStorage.setItem("indusbrain_orgs", JSON.stringify([newOrg, ...orgsList]));
      }
    }
  }, []);

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const existingOrgsStr = localStorage.getItem("indusbrain_orgs");
        if (existingOrgsStr) {
          let orgsList = JSON.parse(existingOrgsStr);
          orgsList = orgsList.map((o: any) => o.email === ownerEmail ? { ...o, status: "Approved" } : o);
          localStorage.setItem("indusbrain_orgs", JSON.stringify(orgsList));
        }
      }
      setIsSimulating(false);
      setIsApproved(true);
    }, 1500);
  };

  return (
    <div className="w-full text-center max-w-lg mx-auto py-4">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${isApproved ? 'bg-emerald-500/30' : 'bg-amber-500/20'}`}></div>
          <div className={`relative w-20 h-20 bg-white dark:bg-white/5 border rounded-full flex items-center justify-center shadow-lg ${isApproved ? 'border-emerald-500/40 shadow-emerald-500/20' : 'border-amber-500/40 shadow-amber-500/20'}`}>
            {isApproved ? (
              <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Clock className="w-10 h-10 text-amber-500 dark:text-amber-400 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${isApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
          {isApproved ? "🟢 Organization Activated" : "🟡 Status: Pending Super Admin Approval"}
        </Badge>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        {isApproved ? "Workspace Ready for Access!" : "Registration Submitted"}
      </h1>
      <p className="text-slate-600 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
        {isApproved ? (
          <span>Congratulations! Your organization <strong>{orgName}</strong> has been verified and activated by the Super Admin team.</span>
        ) : (
          <span>Your organization <strong>{orgName}</strong> is currently under security review by the IndusBrain Super Admin team as part of our enterprise governance protocol.</span>
        )}
      </p>

      {/* Interactive Status Timeline */}
      <div className="bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 mb-6 text-left shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 border-b border-slate-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
          <span>Onboarding Workflow Status</span>
          <span className="text-blue-500 lowercase font-normal">Method 1: Self-Service</span>
        </h3>

        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Email Verification Complete <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.2 rounded font-normal">Verified</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-500">Identity confirmed for {ownerEmail}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Organization & First Plant Structured
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-500">Multi-tenant isolation and initial plant topology drafted.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${isApproved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500 animate-pulse'}`}>
              {isApproved ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Super Admin Security Review {isApproved ? <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.2 rounded font-normal">Approved</span> : <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.2 rounded font-normal">In Review</span>}
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-500">
                {isApproved ? "Super Admin has reviewed and approved your enterprise request." : "Super Admin notified. Assessing subscription tier and compliance criteria."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${isApproved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
              {isApproved ? <Sparkles className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Workspace Activation & Default Provisioning
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-500">
                {isApproved ? "Default departments (Maintenance, Operations, Quality, Safety) & AI Knowledge Graph active." : "Waiting for Super Admin approval before unlocking tenant login."}
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Next Steps Notification Box */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-6 text-left flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-zinc-400 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">What happens next?</p>
          <p>• <strong>When Approved:</strong> As the Organization Owner, you will become active immediately and be redirected to <code className="text-blue-400">/workspace/admin/dashboard</code> upon login.</p>
          <p>• <strong>If Rejected:</strong> You will receive an automated email notification with the specific rejection reason and remediation steps.</p>
          {isApproved && <p className="text-emerald-400 font-semibold pt-1">✓ Email sent: "Your organization {orgName} has been approved and activated!"</p>}
        </div>
      </div>

      <div className="space-y-3">
        {isApproved ? (
          <button 
            onClick={() => router.push("/workspace/admin/dashboard")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center text-sm"
          >
            Enter Organization Workspace <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button 
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center text-sm"
          >
            Return to Login Page <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}

        {/* Hackathon Demo Simulation Hack */}
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
                  Simulate Approve
                </>
              )}
            </button>

            <button
              onClick={() => {
                alert(`[AUTOMATED EMAIL TO ${ownerEmail}]\nSubject: Organization Registration Status\n\nYour organization registration for "${orgName}" has been rejected by Super Admin.\nReason: Additional domain verification required.\n\nPlease contact support@indusbrain.ai or resubmit.`);
              }}
              className="bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-500/30 font-medium py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
            >
              Simulate Reject (Email)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
