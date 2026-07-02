"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ShieldCheck, Building2, Factory, User, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [summary, setSummary] = useState({
    firstName: "Om",
    lastName: "Prakash",
    email: "admin@acmecorp.com",
    phone: "+1 (555) 019-2834",
    orgName: "Acme Global Industries",
    orgCode: "IND-2026-001",
    industry: "Oil & Gas",
    businessType: "Private Limited Company",
    companySize: "501–1000",
    orgAddress: "123 Industrial Way, San Francisco, CA 94105",
    plantName: "Texas Refinery Facility",
    plantCode: "TX-001",
    plantCity: "Houston, Texas",
    workingHours: "24/7 Continuous Operations",
    shiftType: "3x8 Hour Rotating Shifts"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSummary({
        firstName: localStorage.getItem("onboarding_first_name") || "Om",
        lastName: localStorage.getItem("onboarding_last_name") || "Prakash",
        email: localStorage.getItem("onboarding_email") || "admin@acmecorp.com",
        phone: "+1 (555) 019-2834",
        orgName: localStorage.getItem("onboarding_org_name") || "Acme Global Industries",
        orgCode: localStorage.getItem("onboarding_org_code") || "IND-2026-001",
        industry: localStorage.getItem("onboarding_industry") || "Oil & Gas",
        businessType: localStorage.getItem("onboarding_business_type") || "Private Limited Company",
        companySize: localStorage.getItem("onboarding_company_size") || "501–1000",
        orgAddress: `${localStorage.getItem("onboarding_org_address") || "123 Industrial Way"}, ${localStorage.getItem("onboarding_org_city") || "San Francisco"}, ${localStorage.getItem("onboarding_org_state") || "CA"} ${localStorage.getItem("onboarding_org_postal") || "94105"}`,
        plantName: localStorage.getItem("onboarding_plant_name") || "Texas Refinery Facility",
        plantCode: localStorage.getItem("onboarding_plant_code") || "TX-001",
        plantCity: `${localStorage.getItem("onboarding_plant_city") || "Houston"}, ${localStorage.getItem("onboarding_plant_state") || "Texas"}`,
        workingHours: localStorage.getItem("onboarding_plant_hours") || "24/7 Continuous Operations",
        shiftType: localStorage.getItem("onboarding_plant_shifts") || "3x8 Hour Rotating Shifts"
      });
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_status", "pending_approval");
      }
      router.push("/register/success");
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <CheckCircle2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Review & Confirm</h1>
        <p className="text-zinc-400 text-sm mt-2">Verify all organization and plant details before final submission.</p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Subscription Plan Badge */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Selected Subscription Plan</div>
              <div className="text-sm font-bold text-white mt-0.5">Enterprise Onboarding — Multi-Tenant AI Copilot & Asset Graph</div>
            </div>
          </div>
          <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
            Included
          </span>
        </div>

        {/* Account Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <User className="w-4 h-4 text-blue-400" /> Account Summary (Organization Owner)
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div><span className="text-zinc-500">Name:</span> <span className="text-white font-medium ml-1">{summary.firstName} {summary.lastName}</span></div>
            <div><span className="text-zinc-500">Work Email:</span> <span className="text-white font-medium ml-1">{summary.email}</span></div>
            <div><span className="text-zinc-500">Mobile:</span> <span className="text-white font-medium ml-1">{summary.phone}</span></div>
            <div><span className="text-zinc-500">Role:</span> <span className="text-blue-400 font-semibold ml-1">Organization Owner</span></div>
          </div>
        </div>

        {/* Organization Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Building2 className="w-4 h-4 text-emerald-400" /> Organization Summary
            </div>
            <span className="font-mono text-xs bg-white/10 text-emerald-300 px-2.5 py-0.5 rounded-md font-semibold">{summary.orgCode}</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div><span className="text-zinc-500">Org Name:</span> <span className="text-white font-medium ml-1">{summary.orgName}</span></div>
            <div><span className="text-zinc-500">Industry:</span> <span className="text-white font-medium ml-1">{summary.industry}</span></div>
            <div><span className="text-zinc-500">Business Type:</span> <span className="text-white font-medium ml-1">{summary.businessType}</span></div>
            <div><span className="text-zinc-500">Company Size:</span> <span className="text-white font-medium ml-1">{summary.companySize}</span></div>
            <div className="col-span-2"><span className="text-zinc-500">Headquarters:</span> <span className="text-white font-medium ml-1">{summary.orgAddress}</span></div>
          </div>
        </div>

        {/* Plant Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Factory className="w-4 h-4 text-amber-400" /> First Plant Facility
            </div>
            <span className="font-mono text-xs bg-white/10 text-amber-300 px-2.5 py-0.5 rounded-md font-semibold">{summary.plantCode}</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <div><span className="text-zinc-500">Plant Name:</span> <span className="text-white font-medium ml-1">{summary.plantName}</span></div>
            <div><span className="text-zinc-500">Location:</span> <span className="text-white font-medium ml-1">{summary.plantCity}</span></div>
            <div><span className="text-zinc-500">Working Hours:</span> <span className="text-white font-medium ml-1">{summary.workingHours}</span></div>
            <div><span className="text-zinc-500">Shift Type:</span> <span className="text-white font-medium ml-1">{summary.shiftType}</span></div>
          </div>
        </div>

        {/* Terms Accepted Badge */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          ✓ Confirmed agreement to Terms & Conditions, Privacy Policy, and Enterprise Multi-Tenant Governance rules.
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          type="button"
          onClick={() => router.push("/register/plant")}
          disabled={isLoading}
          className="w-1/3 bg-white/10 hover:bg-white/15 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-2/3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? "Submitting Registration..." : "Submit Registration"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
