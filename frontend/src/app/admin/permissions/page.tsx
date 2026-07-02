"use client";

import { useState } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { Edit2, Trash2, X, ShieldAlert, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  type: "system" | "custom";
}

const INITIAL_PERMISSIONS: Permission[] = [
  { id: "perm-1", name: "users.create", description: "Allows creating new users", module: "Users Management", type: "system" },
  { id: "perm-2", name: "users.delete", description: "Allows deleting existing users", module: "Users Management", type: "system" },
  { id: "perm-3", name: "plants.view", description: "View plant details and metrics", module: "Plants", type: "system" },
  { id: "perm-4", name: "reports.export", description: "Export analytics reports to PDF/CSV", module: "Analytics", type: "system" },
  { id: "perm-5", name: "custom.override", description: "Custom permission for manual override", module: "Operations", type: "custom" },
];

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>(INITIAL_PERMISSIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerm, setEditingPerm] = useState<Permission | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState("");
  
  const openCreateModal = () => {
    setEditingPerm(null);
    setName("");
    setDescription("");
    setModule("");
    setIsModalOpen(true);
  };

  const openEditModal = (perm: Permission) => {
    setEditingPerm(perm);
    setName(perm.name);
    setDescription(perm.description);
    setModule(perm.module);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingPerm) {
      setPermissions(permissions.map(p => p.id === editingPerm.id ? { ...p, name, description, module } : p));
    } else {
      const newPerm: Permission = {
        id: `perm-${Date.now()}`,
        name,
        description,
        module,
        type: "custom"
      };
      setPermissions([newPerm, ...permissions]);
    }
    setIsModalOpen(false);
  };

  const deletePermission = (id: string, type: "system" | "custom") => {
    if (type === "system") {
      alert("System permissions cannot be deleted.");
      return;
    }
    if(confirm("Are you sure you want to delete this permission?")) {
      setPermissions(permissions.filter(p => p.id !== id));
    }
  };

  const renderRow = (perm: Permission, idx: number) => (
    <tr key={perm.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-white font-mono text-sm">{perm.name}</div>
            <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
              {perm.id}
              {perm.type === "system" && (
                <span className="bg-zinc-800 text-zinc-400 text-[9px] uppercase px-1.5 rounded font-bold tracking-wider">System</span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-zinc-400 max-w-sm truncate">{perm.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">
          {perm.module}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openEditModal(perm)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deletePermission(perm.id, perm.type)} 
            className={`p-1.5 rounded-md transition-colors ${perm.type === 'system' ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-red-500 hover:bg-zinc-700'}`} 
            title={perm.type === 'system' ? "System permissions can't be deleted" : "Delete"}
            disabled={perm.type === 'system'}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminPageTemplate
      title="Permissions"
      description="Manage fine-grained access permissions across modules."
      entityName="Permission"
      columns={["Permission", "Description", "Module"]}
      data={permissions}
      renderRow={renderRow}
      onAddClick={openCreateModal}
    >
      {/* Create/Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">{editingPerm ? 'Edit' : 'Create'} Permission</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Permission Identifier</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. documents.read"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Module</label>
                <input 
                  type="text" 
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                  placeholder="e.g. Documents"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this permission allows..."
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
                disabled={!name.trim() || !module.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPerm ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPageTemplate>
  );
}
