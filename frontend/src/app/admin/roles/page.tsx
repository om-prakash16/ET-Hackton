"use client";

import { useState } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { Edit2, Trash2, X, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Role {
  id: string;
  name: string;
  description: string;
  permissionsCount: number;
  usersCount: number;
  type: "system" | "custom";
}

const INITIAL_ROLES: Role[] = [
  { id: "role-1", name: "Super Admin", description: "Full access to all platform features.", permissionsCount: 145, usersCount: 2, type: "system" },
  { id: "role-2", name: "Plant Head", description: "Manage plant operations and staff.", permissionsCount: 85, usersCount: 14, type: "system" },
  { id: "role-3", name: "Operations Manager", description: "Manage day-to-day operations.", permissionsCount: 65, usersCount: 42, type: "system" },
  { id: "role-4", name: "External Auditor", description: "Read-only access for compliance checks.", permissionsCount: 12, usersCount: 5, type: "custom" },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const openCreateModal = () => {
    setEditingRole(null);
    setName("");
    setDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setName(role.name);
    setDescription(role.description);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name, description } : r));
    } else {
      const newRole: Role = {
        id: `role-${Date.now()}`,
        name,
        description,
        permissionsCount: 0,
        usersCount: 0,
        type: "custom"
      };
      setRoles([newRole, ...roles]);
    }
    setIsModalOpen(false);
  };

  const deleteRole = (id: string, type: "system" | "custom") => {
    if (type === "system") {
      alert("System roles cannot be deleted.");
      return;
    }
    if(confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const renderRow = (role: Role, idx: number) => (
    <tr key={role.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-white flex items-center gap-2">
              {role.name}
              {role.type === "system" && (
                <span className="bg-zinc-800 text-zinc-400 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider">System</span>
              )}
            </div>
            <div className="text-xs text-zinc-500">{role.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">{role.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full w-fit">
          <Shield className="w-3 h-3 text-emerald-400" />
          {role.permissionsCount} Permissions
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full w-fit">
          <Users className="w-3 h-3 text-blue-400" />
          {role.usersCount} Users
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openEditModal(role)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteRole(role.id, role.type)} 
            className={`p-1.5 rounded-md transition-colors ${role.type === 'system' ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-red-500 hover:bg-zinc-700'}`} 
            title={role.type === 'system' ? "System roles can't be deleted" : "Delete"}
            disabled={role.type === 'system'}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminPageTemplate
      title="Roles"
      description="Manage access roles and assign permissions."
      entityName="Role"
      columns={["Role Name", "Description", "Permissions", "Users Assigned"]}
      data={roles}
      renderRow={renderRow}
      onAddClick={openCreateModal}
    >
      {/* Create/Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">{editingRole ? 'Edit' : 'Create'} Role</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Role Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Compliance Officer"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this role..."
                  rows={3}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-zinc-800 bg-zinc-950/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!name.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingRole ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPageTemplate>
  );
}
