"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { MoreVertical, Edit2, Trash2, Power, Pause, X, Key, Shield, Mail, Send, CheckCircle, Clock, XCircle, RefreshCw, UserPlus, Building, Factory, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmtpConfigModal } from "@/components/ui/SmtpConfigModal";

type UserStatus = "active" | "suspended" | "locked";
type InviteStatus = "Pending" | "Accepted" | "Expired" | "Cancelled";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  plant?: string;
  organization: string;
  status: UserStatus;
  lastLogin: string;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  department: string;
  plant: string;
  organization: string;
  status: InviteStatus;
  sentDate: string;
}

const INITIAL_USERS: User[] = [
  { id: "usr-1", name: "Ravi Kumar", email: "ravi.kumar@tatasteel.com", role: "Organization Admin", department: "Operations", plant: "Jamshedpur Works - Unit 1", organization: "Tata Steel", status: "active", lastLogin: "2 mins ago" },
  { id: "usr-2", name: "Priya Sharma", email: "priya.s@reliance.com", role: "Operations Manager", department: "Production", plant: "Jamnagar Refinery Complex", organization: "Reliance Industries", status: "active", lastLogin: "1 hr ago" },
  { id: "usr-3", name: "Amit Patel", email: "amit.p@jsw.in", role: "Maintenance Engineer", department: "Maintenance", plant: "Dolvi Steel Plant", organization: "JSW Steel", status: "suspended", lastLogin: "2 days ago" },
  { id: "usr-4", name: "Neha Singh", email: "neha.singh@adani.com", role: "Reliability Engineer", department: "Safety", plant: "Khavda Solar Park", organization: "Adani Green", status: "locked", lastLogin: "5 days ago" },
];

const INITIAL_INVITATIONS: Invitation[] = [
  { id: "inv-1", email: "s.verma@tatasteel.com", role: "Plant Head", department: "Engineering", plant: "Jamshedpur Works - Unit 2", organization: "Tata Steel", status: "Pending", sentDate: "2026-06-30" },
  { id: "inv-2", email: "k.rao@reliance.com", role: "Reliability Engineer", department: "Quality", plant: "Hazira Petrochem", organization: "Reliance Industries", status: "Pending", sentDate: "2026-06-29" },
  { id: "inv-3", email: "m.gupta@tatasteel.com", role: "Viewer", department: "HR", plant: "All Plants", organization: "Tata Steel", status: "Expired", sentDate: "2026-06-15" },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<"members" | "invitations">("members");
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [invitations, setInvitations] = useState<Invitation[]>(INITIAL_INVITATIONS);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("indusbrain_users");
      if (storedUsers) {
        try {
          const parsed = JSON.parse(storedUsers);
          const merged = [...parsed];
          INITIAL_USERS.forEach(initU => {
            if (!merged.some((m: any) => m.id === initU.id)) merged.push(initU);
          });
          setUsers(merged);
        } catch (e) {}
      }
      const storedInvites = localStorage.getItem("indusbrain_invitations");
      if (storedInvites) {
        try {
          const parsed = JSON.parse(storedInvites);
          const merged = [...parsed];
          INITIAL_INVITATIONS.forEach(initI => {
            if (!merged.some((m: any) => m.id === initI.id)) merged.push(initI);
          });
          setInvitations(merged);
        } catch (e) {}
      }
    }
  }, []);

  const saveUsersToStorage = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    if (typeof window !== "undefined") {
      localStorage.setItem("indusbrain_users", JSON.stringify(updatedUsers));
    }
  };

  const saveInvitesToStorage = (updatedInvites: Invitation[]) => {
    setInvitations(updatedInvites);
    if (typeof window !== "undefined") {
      localStorage.setItem("indusbrain_invitations", JSON.stringify(updatedInvites));
    }
  };
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSmtpModalOpen, setIsSmtpModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Create / Edit User State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [department, setDepartment] = useState("Operations");
  const [plant, setPlant] = useState("Jamnagar Refinery Complex");
  const [organization, setOrganization] = useState("Tata Steel");

  // Invite Team Member State
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Reliability Engineer");
  const [inviteDept, setInviteDept] = useState("Maintenance");
  const [invitePlant, setInvitePlant] = useState("Jamnagar Refinery Complex");
  const [inviteOrg, setInviteOrg] = useState("Tata Steel");

  const openCreateModal = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setRole("Viewer");
    setDepartment("Operations");
    setPlant("Jamnagar Refinery Complex");
    setOrganization("Tata Steel");
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setDepartment(user.department || "Operations");
    setPlant(user.plant || "All Plants");
    setOrganization(user.organization);
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, role, department, plant, organization } : u));
    } else {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role,
        department,
        plant,
        organization,
        status: "active",
        lastLogin: "Never"
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
  };

  const handleSendInvitation = async () => {
    if (!inviteEmail.trim()) return;
    const newInvite: Invitation = {
      id: `inv-${Date.now()}`,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      plant: invitePlant,
      organization: inviteOrg,
      status: "Pending",
      sentDate: new Date().toISOString().split("T")[0]
    };
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    saveInvitesToStorage([newInvite, ...invitations]);
    setIsInviteModalOpen(false);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("inv_email", inviteEmail);
      localStorage.setItem("inv_role", inviteRole);
      localStorage.setItem("inv_dept", inviteDept);
      localStorage.setItem("inv_org", inviteOrg);
    }
    
    const smtpHost = typeof window !== "undefined" ? localStorage.getItem("smtp_host") : null;
    const smtpPort = typeof window !== "undefined" ? localStorage.getItem("smtp_port") : null;
    const smtpUser = typeof window !== "undefined" ? localStorage.getItem("smtp_user") : null;
    const smtpPass = typeof window !== "undefined" ? localStorage.getItem("smtp_pass") : null;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: inviteEmail,
          subject: `IndusBrain AI - Official Onboarding Invitation for ${inviteOrg}`,
          text: `Hello, you have been invited to join ${inviteOrg} as ${inviteRole} (${inviteDept}). To get started, open your onboarding link: ${baseUrl}/invite/${newInvite.id}`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0284c7; margin-top: 0;">You are invited to join ${inviteOrg}!</h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6;">Hello, your Organization Administrator has invited you to access the IndusBrain AI Enterprise Command Center and Telemetry Workspace.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Assigned Role:</b> <span style="color: #0284c7;">${inviteRole}</span></p>
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Department:</b> <span style="color: #059669;">${inviteDept}</span></p>
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Plant Facility:</b> ${invitePlant}</p>
            </div>
            <p style="margin-top: 25px;"><a href="${baseUrl}/invite/${newInvite.id}" style="background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Accept Invitation & Onboard</a></p>
            <p style="font-size: 12px; color: #64748b; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 15px;">If the button does not open, copy and paste this link: ${baseUrl}/invite/${newInvite.id}</p>
          </div>`,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.isEthereal && data.previewUrl) {
          if (confirm(`📧 Ethereal Test SMTP Email Dispatched to ${inviteEmail}!\n\nTo view the exact formatted invitation email in your browser right now, click OK or check this URL:\n${data.previewUrl}\n\n💡 To send real physical emails directly to Gmail/Outlook inboxes, configure your SMTP credentials!`)) {
            window.open(data.previewUrl, "_blank");
          }
        } else {
          alert(`✅ Real SMTP Invitation Email sent successfully to ${inviteEmail}!\nMessage ID: ${data.messageId}`);
        }
      } else {
        alert(`⚠️ Could not send email: ${data.error}`);
      }
    } catch (err: any) {
      alert(`⚠️ Email dispatch error: ${err.message}`);
    }
    setInviteEmail("");
  };

  const handleResendInvite = async (inv: Invitation) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const smtpHost = typeof window !== "undefined" ? localStorage.getItem("smtp_host") : null;
    const smtpPort = typeof window !== "undefined" ? localStorage.getItem("smtp_port") : null;
    const smtpUser = typeof window !== "undefined" ? localStorage.getItem("smtp_user") : null;
    const smtpPass = typeof window !== "undefined" ? localStorage.getItem("smtp_pass") : null;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: inv.email,
          subject: `IndusBrain AI - Official Onboarding Invitation for ${inv.organization}`,
          text: `Hello, you have been invited to join ${inv.organization} as ${inv.role} (${inv.department}). To get started, open your onboarding link: ${baseUrl}/invite/${inv.id}`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0284c7; margin-top: 0;">You are invited to join ${inv.organization}!</h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6;">Hello, your Organization Administrator has resent your invitation to access the IndusBrain AI Enterprise Command Center.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Assigned Role:</b> <span style="color: #0284c7;">${inv.role}</span></p>
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Department:</b> <span style="color: #059669;">${inv.department}</span></p>
              <p style="margin: 6px 0; font-size: 13px; color: #334155;"><b>Plant Facility:</b> ${inv.plant}</p>
            </div>
            <p style="margin-top: 25px;"><a href="${baseUrl}/invite/${inv.id}" style="background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Accept Invitation & Onboard</a></p>
            <p style="font-size: 12px; color: #64748b; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 15px;">If the button does not open, copy and paste this link: ${baseUrl}/invite/${inv.id}</p>
          </div>`,
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Invitation resent successfully to ${inv.email}!\nMessage ID: ${data.messageId}`);
      } else {
        alert(`⚠️ Could not resend invitation: ${data.error}`);
      }
    } catch (err: any) {
      alert(`⚠️ Email dispatch error: ${err.message}`);
    }
    saveInvitesToStorage(invitations.map(i => i.id === inv.id ? { ...i, status: "Pending" as InviteStatus, sentDate: new Date().toISOString().split("T")[0] } : i));
  };

  const handleCancelInvite = (id: string) => {
    if (confirm("Cancel this invitation token? The recipient will no longer be able to onboard.")) {
      saveInvitesToStorage(invitations.map(i => i.id === id ? { ...i, status: "Cancelled" as InviteStatus } : i));
    }
  };

  const deleteInvite = (id: string) => {
    if (confirm("Permanently delete this invitation record?")) {
      saveInvitesToStorage(invitations.filter(i => i.id !== id));
    }
  };

  const toggleStatus = (id: string, currentStatus: UserStatus) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    saveUsersToStorage(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const deleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user? Their RBAC tokens and plant access will be revoked.")) {
      saveUsersToStorage(users.filter(u => u.id !== id));
    }
  };

  const renderMemberRow = (user: User) => (
    <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{user.name}</div>
            <div className="text-xs text-zinc-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-xs font-medium text-zinc-300">{user.organization}</div>
        <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
          <Factory className="w-3 h-3 text-emerald-400" /> {user.plant || "General Workspace"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full w-fit">
            <Shield className="w-3 h-3 text-indigo-400" />
            {user.role}
          </span>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider pl-1 font-medium">Dept: {user.department || "Operations"}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge 
          variant={user.status === 'active' ? 'default' : 'secondary'} 
          className={
            user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 
            user.status === 'suspended' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
            'bg-red-500/10 text-red-400 border border-red-500/30'
          }
        >
          {user.status === 'active' ? '🟢 Active' : user.status === 'suspended' ? '🟡 Suspended' : '🔴 Locked'}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-zinc-400 text-xs">{user.lastLogin}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => openEditModal(user)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Edit Role & Plant Assignment">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => toggleStatus(user.id, user.status)} className="p-1.5 text-zinc-400 hover:text-amber-500 hover:bg-zinc-700 rounded-md transition-colors" title={user.status === 'active' ? 'Suspend Access' : 'Reactivate User'}>
            {user.status === 'active' ? <Pause className="w-4 h-4" /> : <Power className="w-4 h-4" />}
          </button>
          <button onClick={() => deleteUser(user.id)} className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 rounded-md transition-colors" title="Revoke & Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const renderInvitationRow = (inv: Invitation) => (
    <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{inv.email}</div>
            <div className="text-xs text-zinc-500">Sent: {inv.sentDate}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-xs font-medium text-zinc-300">{inv.organization}</div>
        <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
          <Factory className="w-3 h-3 text-blue-400" /> {inv.plant}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
            {inv.role}
          </span>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider pl-1 font-medium">Dept: {inv.department}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge className={
          inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse' :
          inv.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
          inv.status === 'Expired' ? 'bg-zinc-800 text-zinc-500 border border-zinc-700' :
          'bg-red-500/10 text-red-400 border border-red-500/30'
        }>
          {inv.status === 'Pending' ? '⏳ Pending Acceptance' : inv.status === 'Accepted' ? '✅ Accepted' : inv.status === 'Expired' ? '⚠️ Expired' : '❌ Cancelled'}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-zinc-400 text-xs">7-Day Token</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          {inv.status !== "Accepted" && inv.status !== "Cancelled" && (
            <>
              <a 
                href={`/invite/${inv.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.setItem("inv_email", inv.email);
                    localStorage.setItem("inv_role", inv.role);
                    localStorage.setItem("inv_dept", inv.department);
                    localStorage.setItem("inv_org", inv.organization);
                  }
                }}
                className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                title="Open this invitation link to test employee onboarding"
              >
                🚀 Test Onboard
              </a>
              <button 
                onClick={() => handleResendInvite(inv)}
                className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Resend Invitation Email"
              >
                <RefreshCw className="w-3 h-3" /> Resend
              </button>
              <button 
                onClick={() => handleCancelInvite(inv.id)}
                className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-medium transition-colors"
                title="Revoke Invite Token"
              >
                Cancel
              </button>
            </>
          )}
          <button 
            onClick={() => deleteInvite(inv.id)}
            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 rounded-md transition-colors"
            title="Permanently Delete Invitation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const pendingInvitesCount = invitations.filter(i => i.status === "Pending").length;

  return (
    <AdminPageTemplate
      title="Team Member Onboarding & RBAC Management"
      description="Organization Owners & Super Admins command center to invite team members, assign plant departments, and enforce granular RBAC."
      entityName={activeTab === "members" ? "Create User Manually" : "Invite Team Member"}
      columns={["User / Identity", "Tenant & Plant Assignment", "RBAC Role & Dept", "Access Status", activeTab === "members" ? "Last Login" : "Token Validity"]}
      data={activeTab === "members" ? users : invitations as any}
      renderRow={activeTab === "members" ? renderMemberRow as any : renderInvitationRow as any}
      onAddClick={() => {
        if (activeTab === "members") {
          openCreateModal();
        } else {
          setIsInviteModalOpen(true);
        }
      }}
    >
      {/* RBAC Boundary & Tenant Isolation Notice */}
      <div className="mb-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              🔒 Multi-Tenant RBAC Boundary & Invitation Protocol Active
            </h4>
            <p className="text-xs text-indigo-200/80">
              Organization Owners can invite team members to their specific tenant without global platform access. All invitations expire in 7 days.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 shrink-0 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Invite Team Member
        </button>
      </div>

      {/* Tabs: Active Members vs Invitations */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "members" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
        >
          <span>Active Team Members</span>
          <span className="px-1.5 py-0.2 rounded bg-white/20 text-white text-[10px]">{users.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("invitations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "invitations" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
        >
          <span>Onboarding Invitations</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] ${pendingInvitesCount > 0 ? "bg-amber-500 text-black font-extrabold" : "bg-zinc-800 text-zinc-400"}`}>
            {pendingInvitesCount} Pending
          </span>
        </button>
        <button
          onClick={() => setIsSmtpModalOpen(true)}
          className="ml-auto px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex items-center gap-1.5 shadow-sm"
          title="Verify & Configure Live SMTP Email Delivery"
        >
          ⚙️ Verify & Configure SMTP
        </button>
      </div>

      {/* 1. Invite Team Member Modal (Master Prompt Requirement) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Invite Team Member</h3>
                  <p className="text-xs text-zinc-400">Send secure onboarding invitation with pre-configured RBAC & plant topology.</p>
                </div>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Corporate Email Address *</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. engineer@company.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Assign RBAC Role</label>
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Organization Admin">Organization Admin</option>
                    <option value="Plant Head">Plant Head</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Reliability Engineer">Reliability Engineer</option>
                    <option value="Viewer">Viewer (Read-Only)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Department</label>
                  <select 
                    value={inviteDept}
                    onChange={(e) => setInviteDept(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Maintenance">Maintenance</option>
                    <option value="Operations">Operations</option>
                    <option value="Production">Production</option>
                    <option value="Quality">Quality</option>
                    <option value="Safety">Safety</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Assign Plant Facility</label>
                  <select 
                    value={invitePlant}
                    onChange={(e) => setInvitePlant(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Jamnagar Refinery Complex">Jamnagar Refinery Complex</option>
                    <option value="Hazira Petrochem - Unit 2">Hazira Petrochem - Unit 2</option>
                    <option value="Jamshedpur Works - Unit 1">Jamshedpur Works - Unit 1</option>
                    <option value="All Plants (Global)">All Plants (Global)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300">Tenant Organization</label>
                  <select 
                    value={inviteOrg}
                    onChange={(e) => setInviteOrg(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Tata Steel">Tata Steel</option>
                    <option value="Reliance Industries">Reliance Industries</option>
                    <option value="JSW Steel">JSW Steel</option>
                    <option value="Adani Green">Adani Green</option>
                  </select>
                </div>
              </div>

              <div className="bg-indigo-500/5 border border-indigo-500/20 p-3.5 rounded-xl text-xs text-indigo-200/80 space-y-1">
                <div className="font-bold text-indigo-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Automated Email Dispatch:</div>
                <p>The recipient will receive a one-time onboarding link valid for 7 days to set their password, configure their MFA, and access <strong>{invitePlant}</strong>.</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 border-t border-zinc-800 bg-zinc-950/80">
              <button 
                onClick={() => { setIsInviteModalOpen(false); setIsSmtpModalOpen(true); }}
                className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                title="Verify SMTP Connection"
              >
                ⚙️ SMTP Config
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSendInvitation}
                  disabled={!inviteEmail.trim()}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> Send Invitation Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Manual User Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/80">
              <h3 className="text-base font-bold text-white">{editingUser ? 'Edit' : 'Create'} Active User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@company.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-300">Organization</label>
                  <select 
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Tata Steel">Tata Steel</option>
                    <option value="Reliance Industries">Reliance Industries</option>
                    <option value="JSW Steel">JSW Steel</option>
                    <option value="Adani Green">Adani Green</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-medium text-zinc-300">Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Organization Admin">Organization Admin</option>
                    <option value="Plant Head">Plant Head</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Maintenance Engineer">Maintenance Engineer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-zinc-800 bg-zinc-950/80">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSaveUser}
                disabled={!name.trim() || !email.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal SMTP Configuration & Verification Modal */}
      <SmtpConfigModal isOpen={isSmtpModalOpen} onClose={() => setIsSmtpModalOpen(false)} />
    </AdminPageTemplate>
  );
}
