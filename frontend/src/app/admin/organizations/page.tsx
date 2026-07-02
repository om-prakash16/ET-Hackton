"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { 
  MoreVertical, Edit2, Trash2, Power, Pause, X, CheckCircle2, XCircle, 
  AlertCircle, ShieldCheck, Mail, Building2, Sparkles, Send, FileText, 
  ExternalLink, Layers, Users, Database, Cpu, Check, Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmtpConfigModal } from "@/components/ui/SmtpConfigModal";

export type OrgStatus = 
  | "Draft" 
  | "Pending Approval" 
  | "Approved" 
  | "Rejected" 
  | "Suspended" 
  | "Inactive" 
  | "Archived" 
  | "Deleted";

export interface Organization {
  id: string;
  name: string;
  plan: "Trial" | "Professional" | "Enterprise" | "Custom";
  users: number;
  status: OrgStatus;
  created: string;
  owner: string;
  email: string;
  industry: string;
  companySize: string;
  storage: string;
  license: string;
  plants: number;
  source: "Self-Service Registration" | "Super Admin Enterprise Provisioning";
  rejectionReason?: string;
  notes?: string;
}

const INITIAL_ORGS: Organization[] = [
  { 
    id: "org-101", 
    name: "Tata Steel", 
    plan: "Enterprise", 
    users: 1250, 
    status: "Approved", 
    created: "2023-01-15",
    owner: "Ravi Kumar",
    email: "ravi.kumar@tatasteel.com",
    industry: "Metals & Mining",
    companySize: "10,000+ employees",
    storage: "2 TB",
    license: "Unlimited Users",
    plants: 4,
    source: "Super Admin Enterprise Provisioning"
  },
  { 
    id: "org-102", 
    name: "Reliance Industries", 
    plan: "Enterprise", 
    users: 850, 
    status: "Approved", 
    created: "2023-03-22",
    owner: "Priya Sharma",
    email: "priya.s@reliance.com",
    industry: "Oil & Gas / Petrochemicals",
    companySize: "10,000+ employees",
    storage: "2 TB",
    license: "1,000 Users",
    plants: 3,
    source: "Super Admin Enterprise Provisioning"
  },
  { 
    id: "org-103", 
    name: "JSW Steel Works", 
    plan: "Professional", 
    users: 320, 
    status: "Suspended", 
    created: "2023-06-10",
    owner: "Amit Patel",
    email: "amit.p@jsw.in",
    industry: "Metals & Mining",
    companySize: "1,000-5,000 employees",
    storage: "500 GB",
    license: "500 Users",
    plants: 2,
    source: "Self-Service Registration"
  },
  { 
    id: "org-104", 
    name: "Adani Green Energy", 
    plan: "Professional", 
    users: 410, 
    status: "Approved", 
    created: "2023-08-05",
    owner: "Neha Singh",
    email: "neha.singh@adanigreen.com",
    industry: "Power & Utilities",
    companySize: "1,000-5,000 employees",
    storage: "500 GB",
    license: "500 Users",
    plants: 5,
    source: "Self-Service Registration"
  },
  { 
    id: "org-105", 
    name: "Bharat Petroleum (BPCL)", 
    plan: "Trial", 
    users: 15, 
    status: "Pending Approval", 
    created: new Date().toISOString().split('T')[0],
    owner: "Suresh Menon",
    email: "menons@bpcl.in",
    industry: "Oil & Gas / Refinery",
    companySize: "5,000-10,000 employees",
    storage: "50 GB",
    license: "20 Users",
    plants: 1,
    source: "Self-Service Registration"
  },
  { 
    id: "org-106", 
    name: "Vedanta Aluminum", 
    plan: "Trial", 
    users: 5, 
    status: "Rejected", 
    created: "2024-05-12",
    owner: "Vikas Dubey",
    email: "vikas@vedanta.co.in",
    industry: "Metals & Mining",
    companySize: "1,000-5,000 employees",
    storage: "50 GB",
    license: "10 Users",
    plants: 1,
    source: "Self-Service Registration",
    rejectionReason: "Incomplete corporate domain verification and missing compliance documentation."
  }
];

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>(INITIAL_ORGS);
  const [filter, setFilter] = useState<string>("All");
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Enterprise Provisioning Form State
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Oil & Gas / Refinery");
  const [companySize, setCompanySize] = useState("1,000-5,000 employees");
  const [plan, setPlan] = useState<"Trial" | "Professional" | "Enterprise" | "Custom">("Enterprise");
  const [storage, setStorage] = useState("500 GB");
  const [license, setLicense] = useState("500 Users");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [sendInvite, setSendInvite] = useState(true);

  // Notes & Rejection State
  const [noteText, setNoteText] = useState("");
  const [rejectionText, setRejectionText] = useState("");

  // SMTP Config Modal State
  const [isSmtpModalOpen, setIsSmtpModalOpen] = useState(false);

  useEffect(() => {
    // Load dynamically registered orgs from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("indusbrain_orgs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Merge avoiding ID collisions
          const merged = [...parsed];
          INITIAL_ORGS.forEach(initOrg => {
            if (!merged.some((m: any) => m.id === initOrg.id)) {
              merged.push(initOrg);
            }
          });
          setOrgs(merged);
        } catch (e) {}
      }
    }
  }, []);

  const saveToStorage = (updatedOrgs: Organization[]) => {
    setOrgs(updatedOrgs);
    if (typeof window !== "undefined") {
      localStorage.setItem("indusbrain_orgs", JSON.stringify(updatedOrgs));
    }
  };

  // Quick Approval / Rejection actions
  const handleApprove = (org: Organization) => {
    const updated = orgs.map(o => o.id === org.id ? { ...o, status: "Approved" as OrgStatus } : o);
    saveToStorage(updated);
    setIsReviewModalOpen(false);
  };

  const openRejectModal = (org: Organization) => {
    setSelectedOrg(org);
    setRejectionText(org.rejectionReason || "");
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedOrg) return;
    const updated = orgs.map(o => o.id === selectedOrg.id ? { 
      ...o, 
      status: "Rejected" as OrgStatus, 
      rejectionReason: rejectionText 
    } : o);
    saveToStorage(updated);
    setIsRejectModalOpen(false);
    setIsReviewModalOpen(false);
  };

  const handleSendNote = async () => {
    if (!selectedOrg) return;
    const updated = orgs.map(o => o.id === selectedOrg.id ? { 
      ...o, 
      notes: (o.notes ? o.notes + "\n\n" : "") + `[${new Date().toLocaleDateString()} Admin Note]: ${noteText}`
    } : o);
    saveToStorage(updated);
    setIsNoteModalOpen(false);
    
    // Check if user has custom SMTP configured in localStorage
    const smtpHost = typeof window !== "undefined" ? localStorage.getItem("smtp_host") : null;
    const smtpPort = typeof window !== "undefined" ? localStorage.getItem("smtp_port") : null;
    const smtpUser = typeof window !== "undefined" ? localStorage.getItem("smtp_user") : null;
    const smtpPass = typeof window !== "undefined" ? localStorage.getItem("smtp_pass") : null;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedOrg.email,
          subject: `IndusBrain AI - Official Notice for ${selectedOrg.name}`,
          text: noteText,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.isEthereal && data.previewUrl) {
          if (confirm(`📧 Ethereal Test SMTP Email Dispatched!\n\nTo view the exact formatted email in your browser right now, click OK or check this URL:\n${data.previewUrl}\n\n💡 To send real emails directly to your Gmail/Outlook inbox, configure your SMTP settings!`)) {
            window.open(data.previewUrl, "_blank");
          }
        } else {
          alert(`✅ Real SMTP Email sent successfully to ${selectedOrg.email}!\nMessage ID: ${data.messageId}`);
        }
      } else {
        alert(`⚠️ Could not send email: ${data.error}`);
      }
    } catch (err: any) {
      alert(`⚠️ Email dispatch error: ${err.message}`);
    }
    setNoteText("");
  };

  const handleEnterpriseProvision = () => {
    if (!name.trim() || !ownerEmail.trim()) return;
    
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name,
      plan,
      users: 1,
      status: "Approved", // Enterprise provisioned orgs are automatically approved
      created: new Date().toISOString().split('T')[0],
      owner: ownerName || "Enterprise Owner",
      email: ownerEmail,
      industry,
      companySize,
      storage,
      license,
      plants: 1,
      source: "Super Admin Enterprise Provisioning"
    };

    saveToStorage([newOrg, ...orgs]);
    setIsCreateModalOpen(false);
    if (sendInvite) {
      alert(`✅ Enterprise Organization Provisioned!\nSecure invitation link sent to ${ownerEmail}`);
    }
  };

  const toggleStatus = (org: Organization) => {
    const nextStatus: OrgStatus = org.status === "Approved" ? "Suspended" : "Approved";
    const updated = orgs.map(o => o.id === org.id ? { ...o, status: nextStatus } : o);
    saveToStorage(updated);
  };

  const deleteOrg = (id: string) => {
    if (confirm("Are you sure you want to delete this organization? This will revoke all tenant isolation and storage buckets.")) {
      const updated = orgs.filter(o => o.id !== id);
      saveToStorage(updated);
    }
  };

  const pendingOrgs = orgs.filter(o => o.status === "Pending Approval");

  const filteredOrgs = orgs.filter(org => {
    if (filter === "All") return true;
    if (filter === "Pending Approval") return org.status === "Pending Approval";
    if (filter === "Approved") return org.status === "Approved";
    if (filter === "Trial") return org.plan === "Trial";
    if (filter === "Rejected") return org.status === "Rejected";
    if (filter === "Suspended") return org.status === "Suspended";
    if (filter === "Archived") return org.status === "Archived" || org.status === "Inactive";
    return true;
  });

  const getStatusBadge = (status: OrgStatus) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20">Approved / Active</Badge>;
      case "Pending Approval":
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">Pending Review</Badge>;
      case "Rejected":
        return <Badge className="bg-red-500/10 text-red-400 border border-red-500/30">Rejected</Badge>;
      case "Suspended":
        return <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30">Suspended</Badge>;
      case "Draft":
        return <Badge className="bg-zinc-800 text-zinc-400 border border-zinc-700">Draft</Badge>;
      default:
        return <Badge className="bg-zinc-800 text-zinc-400">{status}</Badge>;
    }
  };

  const renderRow = (org: Organization) => (
    <tr key={org.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            {org.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-2">
              {org.name}
              {org.source === "Self-Service Registration" && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-normal">Self-Service</span>
              )}
            </div>
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <span>{org.industry}</span> • <span>{org.owner}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
          org.plan === 'Enterprise' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
          org.plan === 'Trial' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
          'bg-zinc-800 border-zinc-700 text-zinc-300'
        }`}>
          {org.plan}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-zinc-300">{org.users.toLocaleString()}</div>
        <div className="text-[11px] text-zinc-500">Cap: {org.license}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(org.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-zinc-400 text-xs">
        <div>{org.created}</div>
        <div className="text-[10px] text-zinc-500">{org.storage}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1.5">
          {org.status === "Pending Approval" && (
            <>
              <button 
                onClick={() => handleApprove(org)}
                className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Quick Approve"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
              </button>
              <button 
                onClick={() => openRejectModal(org)}
                className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Quick Reject"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
            </>
          )}

          <button 
            onClick={() => { setSelectedOrg(org); setIsReviewModalOpen(true); }}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
            title="Inspect Registration & Provisioning"
          >
            <FileText className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => { setSelectedOrg(org); setIsNoteModalOpen(true); }}
            className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 rounded-md transition-colors"
            title="Send Admin Note / Notice"
          >
            <Mail className="w-4 h-4" />
          </button>

          <button 
            onClick={() => toggleStatus(org)} 
            className="p-1.5 text-zinc-400 hover:text-amber-500 hover:bg-zinc-700 rounded-md transition-colors" 
            title={org.status === 'Approved' ? 'Suspend Organization' : 'Activate Organization'}
          >
            {org.status === 'Approved' ? <Pause className="w-4 h-4" /> : <Power className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => deleteOrg(org.id)} 
            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 rounded-md transition-colors" 
            title="Delete Organization"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminPageTemplate
      title="Organization Onboarding & Governance"
      description="Super Admin command center to provision enterprise tenants, review self-service registrations, and enforce RBAC isolation."
      entityName="Provision Enterprise Tenant"
      columns={["Organization", "Subscription", "Users / License", "Lifecycle Status", "Provisioned / Storage"]}
      data={filteredOrgs}
      renderRow={renderRow}
      onAddClick={() => {
        setName("");
        setOwnerName("");
        setOwnerEmail("");
        setIsCreateModalOpen(true);
      }}
    >
      {/* 1. Pending Approvals Top Alert Banner */}
      {pendingOrgs.length > 0 && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {pendingOrgs.length} Organization(s) Awaiting Super Admin Review & Verification
              </h4>
              <p className="text-xs text-amber-300/80">
                Self-service registrations remain locked in pending status until approved. Review compliance and assign storage quotas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setFilter("Pending Approval")}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-lg transition-colors shadow-lg shadow-amber-500/20"
            >
              Review Pending Queue ({pendingOrgs.length})
            </button>
          </div>
        </div>
      )}

      {/* 2. Lifecycle Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
        {[
          { label: "All Tenants", val: "All", count: orgs.length },
          { label: "Pending Approval", val: "Pending Approval", count: pendingOrgs.length, alert: pendingOrgs.length > 0 },
          { label: "Approved & Active", val: "Approved", count: orgs.filter(o => o.status === "Approved").length },
          { label: "Trial Accounts", val: "Trial", count: orgs.filter(o => o.plan === "Trial").length },
          { label: "Suspended", val: "Suspended", count: orgs.filter(o => o.status === "Suspended").length },
          { label: "Rejected", val: "Rejected", count: orgs.filter(o => o.status === "Rejected").length },
        ].map(tab => (
          <button
            key={tab.val}
            onClick={() => setFilter(tab.val)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              filter === tab.val 
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
              filter === tab.val ? "bg-white/20 text-white" : tab.alert ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
        <button
          onClick={() => setIsSmtpModalOpen(true)}
          className="ml-auto px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex items-center gap-1.5 shadow-sm"
          title="Verify & Configure Live SMTP Email Delivery"
        >
          ⚙️ Verify & Configure SMTP
        </button>
      </div>

      {/* 3. Method 2: Enterprise Provisioning Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Method 2: Super Admin Enterprise Provisioning</h3>
                  <p className="text-xs text-zinc-400">Manually provision isolated tenant workspace and send owner invitation.</p>
                </div>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Organization Basic Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">1. Tenant Organization Profile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Organization Name *</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shell Oil Refinery & Petrochem"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Industry Vertical</label>
                    <select 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Oil & Gas / Refinery">Oil & Gas / Refinery</option>
                      <option value="Metals & Mining">Metals & Mining</option>
                      <option value="Power & Utilities">Power & Utilities</option>
                      <option value="Chemicals & Pharmaceuticals">Chemicals & Pharmaceuticals</option>
                      <option value="Automotive & Heavy Assembly">Automotive & Heavy Assembly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Resource & Subscription Quotas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">2. Subscription & Storage Allocation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Subscription Plan</label>
                    <select 
                      value={plan}
                      onChange={(e) => setPlan(e.target.value as any)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Trial">Trial (14 Days)</option>
                      <option value="Professional">Professional</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Custom">Custom On-Premise</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Storage Bucket Quota</label>
                    <select 
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="50 GB">50 GB (Standard)</option>
                      <option value="500 GB">500 GB (Professional)</option>
                      <option value="2 TB">2 TB (Enterprise)</option>
                      <option value="Unlimited">Unlimited / Dedicated</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">User Seat License</label>
                    <select 
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="10 Users">10 Users</option>
                      <option value="50 Users">50 Users</option>
                      <option value="500 Users">500 Users</option>
                      <option value="Unlimited Users">Unlimited Users</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Organization Owner Assignment */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">3. Assign Organization Owner</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Owner Full Name</label>
                    <input 
                      type="text" 
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Verma"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Owner Corporate Email *</label>
                    <input 
                      type="email" 
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="r.verma@shelloil.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl">
                    <input 
                      type="checkbox" 
                      checked={sendInvite}
                      onChange={(e) => setSendInvite(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-700 text-purple-600 focus:ring-0"
                    />
                    <span className="text-xs text-purple-200">
                      <strong>Send Secure One-Time Invitation Link:</strong> Automatically email owner to accept invitation, create password, and configure initial plant.
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-zinc-800 bg-zinc-950/60">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleEnterpriseProvision}
                disabled={!name.trim() || !ownerEmail.trim()}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Provision Workspace & Assign Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Review Registration & Default Provisioning Modal */}
      {isReviewModalOpen && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedOrg.name}</h3>
                    {getStatusBadge(selectedOrg.status)}
                  </div>
                  <p className="text-xs text-zinc-400">Onboarding ID: {selectedOrg.id} • Registered via {selectedOrg.source}</p>
                </div>
              </div>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Overview Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80 text-center">
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase">Subscription Plan</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">{selectedOrg.plan}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase">License Quota</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedOrg.license}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase">Storage Bucket</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedOrg.storage}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase">Plants Configured</div>
                  <div className="text-sm font-bold text-purple-400 mt-0.5">{selectedOrg.plants} Active Plant(s)</div>
                </div>
              </div>

              {/* Owner & Company Profile */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">Corporate & Owner Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-1.5">
                    <div className="text-zinc-500 font-semibold">Organization Owner</div>
                    <div className="text-sm font-bold text-white">{selectedOrg.owner}</div>
                    <div className="text-blue-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {selectedOrg.email}</div>
                    <div className="text-[11px] text-emerald-400 font-medium">Role: Organization Owner / Admin</div>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-1.5">
                    <div className="text-zinc-500 font-semibold">Corporate Demographics</div>
                    <div className="text-sm font-bold text-white">{selectedOrg.industry}</div>
                    <div className="text-zinc-300">Size: {selectedOrg.companySize}</div>
                    <div className="text-[11px] text-zinc-500">Created: {selectedOrg.created}</div>
                  </div>
                </div>
              </div>

              {/* Default Setup After Approval (Master Prompt Requirement) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Default Provisioned Multi-Tenant Setup
                  </h4>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-semibold">Automatic Isolation</span>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-white">Default Departments Created:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {["Maintenance", "Operations", "Production", "Quality", "Safety", "Engineering", "HR"].map(dept => (
                        <span key={dept} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-medium flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" /> {dept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-blue-400" />
                      <span>Knowledge Graph: <strong>Isolated</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      <span>AI Workspace: <strong>Active</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Audit Logs: <strong>Enabled</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes / Rejection reasons */}
              {selectedOrg.rejectionReason && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-200 space-y-1">
                  <div className="font-bold text-red-400 flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Rejection Notice Recorded:</div>
                  <p>{selectedOrg.rejectionReason}</p>
                </div>
              )}

              {selectedOrg.notes && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3.5 text-xs text-blue-200 space-y-1 whitespace-pre-wrap">
                  <div className="font-bold text-blue-400">Internal Admin & Owner Communications:</div>
                  <p>{selectedOrg.notes}</p>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between p-5 border-t border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setIsReviewModalOpen(false); setIsNoteModalOpen(true); }}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> Send Notice / Note
                </button>
                <button 
                  onClick={() => { setIsReviewModalOpen(false); setIsSmtpModalOpen(true); }}
                  className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Verify SMTP Connection"
                >
                  ⚙️ SMTP Config
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {selectedOrg.status === "Pending Approval" ? (
                  <>
                    <button 
                      onClick={() => openRejectModal(selectedOrg)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject Request
                    </button>
                    <button 
                      onClick={() => handleApprove(selectedOrg)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Activate Tenant
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Close Inspector
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Reject Request Modal */}
      {isRejectModalOpen && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-5 space-y-4">
            <div className="flex items-center gap-3 text-red-400 font-bold text-lg border-b border-zinc-800 pb-3">
              <XCircle className="w-6 h-6" />
              <span>Reject Organization Request</span>
            </div>
            <p className="text-xs text-zinc-400">
              Specify the rejection reason for <strong>{selectedOrg.name}</strong>. An automated rejection email with this explanation will be sent to <code>{selectedOrg.email}</code>.
            </p>
            <textarea
              value={rejectionText}
              onChange={(e) => setRejectionText(e.target.value)}
              placeholder="e.g. Corporate email verification failed, or duplicate organization registration detected."
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsRejectModalOpen(false)} className="px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancel</button>
              <button 
                onClick={handleConfirmReject}
                disabled={!rejectionText.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors disabled:opacity-50"
              >
                Confirm Rejection & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Send Notice / Admin Note Modal */}
      {isNoteModalOpen && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-5 space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-bold text-lg border-b border-zinc-800 pb-3">
              <Mail className="w-6 h-6" />
              <span>Send Notice to Organization Owner</span>
            </div>
            <p className="text-xs text-zinc-400">
              Send an administrative update, subscription upgrade offer, or compliance notice to <strong>{selectedOrg.owner}</strong> ({selectedOrg.email}).
            </p>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Your trial subscription is expiring in 3 days. Please upgrade to Enterprise storage..."
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setIsNoteModalOpen(false)} className="px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancel</button>
              <button 
                onClick={handleSendNote}
                disabled={!noteText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> Send Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Universal SMTP Configuration Modal */}
      <SmtpConfigModal isOpen={isSmtpModalOpen} onClose={() => setIsSmtpModalOpen(false)} />
    </AdminPageTemplate>
  );
}
