"use client";

import { useState } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { Edit2, Trash2, Power, Pause, X, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PlantStatus = "operational" | "maintenance" | "offline";

interface Plant {
  id: string;
  name: string;
  organization: string;
  location: string;
  manager: string;
  status: PlantStatus;
}

const INITIAL_PLANTS: Plant[] = [
  { id: "plt-1", name: "Jamshedpur Steel Works", organization: "Tata Steel", location: "Jamshedpur, India", manager: "Ravi Kumar", status: "operational" },
  { id: "plt-2", name: "Jamnagar Refinery", organization: "Reliance Industries", location: "Jamnagar, India", manager: "Priya Sharma", status: "operational" },
  { id: "plt-3", name: "Vijayanagar Plant", organization: "JSW Steel", location: "Bellary, India", manager: "Amit Patel", status: "maintenance" },
  { id: "plt-4", name: "Kamuthi Solar Power", organization: "Adani Green", location: "Tamil Nadu, India", manager: "Neha Singh", status: "offline" },
];

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("Tata Steel");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  
  const openCreateModal = () => {
    setEditingPlant(null);
    setName("");
    setOrganization("Tata Steel");
    setLocation("");
    setManager("");
    setIsModalOpen(true);
  };

  const openEditModal = (plant: Plant) => {
    setEditingPlant(plant);
    setName(plant.name);
    setOrganization(plant.organization);
    setLocation(plant.location);
    setManager(plant.manager);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingPlant) {
      setPlants(plants.map(p => p.id === editingPlant.id ? { ...p, name, organization, location, manager } : p));
    } else {
      const newPlant: Plant = {
        id: `plt-${Date.now()}`,
        name,
        organization,
        location,
        manager,
        status: "operational"
      };
      setPlants([newPlant, ...plants]);
    }
    setIsModalOpen(false);
  };

  const toggleStatus = (id: string, currentStatus: PlantStatus) => {
    const newStatus = currentStatus === "operational" ? "offline" : "operational";
    setPlants(plants.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const deletePlant = (id: string) => {
    if(confirm("Are you sure you want to delete this plant?")) {
      setPlants(plants.filter(p => p.id !== id));
    }
  };

  const renderRow = (plant: Plant, idx: number) => (
    <tr key={plant.id} className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
            {plant.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-white">{plant.name}</div>
            <div className="text-xs text-zinc-500">{plant.organization}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          {plant.location}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-zinc-300">{plant.manager}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge 
          variant={plant.status === 'operational' ? 'default' : 'secondary'} 
          className={
            plant.status === 'operational' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 
            plant.status === 'maintenance' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' :
            'bg-red-500/10 text-red-500 hover:bg-red-500/20'
          }
        >
          {plant.status}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openEditModal(plant)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => toggleStatus(plant.id, plant.status)} className="p-1.5 text-zinc-400 hover:text-amber-500 hover:bg-zinc-700 rounded-md transition-colors" title={plant.status === 'operational' ? 'Take Offline' : 'Bring Online'}>
            {plant.status === 'operational' ? <Pause className="w-4 h-4" /> : <Power className="w-4 h-4" />}
          </button>
          <button onClick={() => deletePlant(plant.id)} className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 rounded-md transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminPageTemplate
      title="Plants"
      description="Manage and configure industrial plants across organizations."
      entityName="Plant"
      columns={["Plant", "Location", "Manager", "Status"]}
      data={plants}
      renderRow={renderRow}
      onAddClick={openCreateModal}
    >
      {/* Create/Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">{editingPlant ? 'Edit' : 'Create'} Plant</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Plant Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jamnagar Refinery"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Organization</label>
                <select 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  <option value="Tata Steel">Tata Steel</option>
                  <option value="Reliance Industries">Reliance Industries</option>
                  <option value="JSW Steel">JSW Steel</option>
                  <option value="Adani Green">Adani Green</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Gujarat, India"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Plant Manager</label>
                <input 
                  type="text" 
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                disabled={!name.trim() || !location.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingPlant ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPageTemplate>
  );
}
