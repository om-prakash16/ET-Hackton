"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, Download, X, ArrowUpDown, Mail } from "lucide-react";
import { SmtpConfigModal } from "@/components/ui/SmtpConfigModal";

interface AdminPageTemplateProps<T = any> {
  title: string;
  description: string;
  entityName?: string;
  columns?: string[];
  data?: T[];
  renderRow?: (item: T, index: number) => React.ReactNode;
  onAddClick?: () => void;
  children?: React.ReactNode; // For modals or other overlays
  headerIcon?: any;
  headerAction?: React.ReactNode;
}

export function AdminPageTemplate<T = any>({ 
  title, description, entityName = "Item", columns = [], data = [], renderRow, onAddClick, children 
}: AdminPageTemplateProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [isSmtpModalOpen, setIsSmtpModalOpen] = useState(false);

  // Compute filtered and sorted data universally across any admin entity
  const filteredData = useMemo(() => {
    let result = [...data];

    // 1. Search Query Filter (Universal keyword search across all JSON properties of item)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => {
        if (!item) return false;
        return JSON.stringify(item).toLowerCase().includes(q);
      });
    }

    // 2. Status / Lifecycle Filter
    if (statusFilter !== "all") {
      result = result.filter(item => {
        if (!item) return false;
        const str = JSON.stringify(item).toLowerCase();
        if (statusFilter === "active") {
          return str.includes("active") || str.includes("approved") || str.includes("emerald") || str.includes("online");
        }
        if (statusFilter === "pending") {
          return str.includes("pending") || str.includes("review") || str.includes("amber") || str.includes("waiting");
        }
        if (statusFilter === "suspended") {
          return str.includes("suspended") || str.includes("locked") || str.includes("rejected") || str.includes("expired") || str.includes("red");
        }
        return true;
      });
    }

    // 3. Sorting
    if (sortBy === "name-asc") {
      result.sort((a: any, b: any) => {
        const nameA = a?.name || a?.email || a?.title || a?.id || "";
        const nameB = b?.name || b?.email || b?.title || b?.id || "";
        return String(nameA).localeCompare(String(nameB));
      });
    } else if (sortBy === "name-desc") {
      result.sort((a: any, b: any) => {
        const nameA = a?.name || a?.email || a?.title || a?.id || "";
        const nameB = b?.name || b?.email || b?.title || b?.id || "";
        return String(nameB).localeCompare(String(nameA));
      });
    } else if (sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [data, searchQuery, statusFilter, sortBy]);

  const activeFilterCount = (statusFilter !== "all" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const handleExport = () => {
    if (filteredData.length === 0) {
      alert("No data available to export.");
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
      + columns.join(",") + "\n"
      + filteredData.map(item => {
          return columns.map(c => {
            const key = c.toLowerCase().split(" ")[0];
            const val = (item as any)[key] || (item as any)[c.toLowerCase()] || (item as any).name || (item as any).email || (item as any).id || "";
            return `"${String(val).replace(/"/g, '""')}"`;
          }).join(",");
        }).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${entityName.toLowerCase().replace(/\s+/g, '_')}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 w-full relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-zinc-400 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSmtpModalOpen(true)}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            title="Verify & Configure Live SMTP Email Delivery Engine"
          >
            <Mail className="w-4 h-4" />
            ⚙️ SMTP Engine
          </button>
          <button 
            onClick={handleExport}
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            title="Export filtered data to CSV"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          {onAddClick && (
            <button 
              onClick={onAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create {entityName}
            </button>
          )}
        </div>
      </div>

      {/* Toolbar & Filter Panel */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`border px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isFilterOpen || activeFilterCount > 0 
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10 shadow-sm' 
                  : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Filter Menu */}
        {isFilterOpen && (
          <div className="bg-zinc-900/95 border border-zinc-800 p-4 rounded-xl flex flex-wrap items-center gap-6 text-xs text-zinc-300 shadow-xl animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px]">Lifecycle Status:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "active", label: "🟢 Approved / Active" },
                  { id: "pending", label: "🟡 Pending Review" },
                  { id: "suspended", label: "🔴 Suspended / Rejected" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setStatusFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      statusFilter === opt.id
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300 focus:outline-none focus:border-blue-500"
              >
                <option value="default">Default Order</option>
                <option value="name-asc">Name (A - Z)</option>
                <option value="name-desc">Name (Z - A)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {(searchQuery || statusFilter !== "all" || sortBy !== "default") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setSortBy("default");
                }}
                className="ml-auto text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20"
              >
                <X className="w-3.5 h-3.5" /> Reset All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Data Table Scaffold */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-zinc-400 uppercase text-xs font-semibold border-b border-zinc-800">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-4 whitespace-nowrap">{col}</th>
                ))}
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-zinc-800/50 border border-zinc-700/50 rounded-full flex items-center justify-center">
                        <Search className="w-5 h-5 text-zinc-500" />
                      </div>
                      <p className="text-zinc-400 font-medium">No {title.toLowerCase()} found</p>
                      <p className="text-zinc-500 text-xs">
                        {searchQuery || statusFilter !== "all" 
                          ? "Try adjusting your keyword search or filter criteria." 
                          : `Get started by creating a new ${entityName.toLowerCase()}.`}
                      </p>
                      {(searchQuery || statusFilter !== "all" || sortBy !== "default") && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setSortBy("default");
                          }}
                          className="mt-2 text-xs text-blue-400 hover:underline font-semibold"
                        >
                          Clear all applied filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => renderRow ? renderRow(item, idx) : null)
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination & Counter Footer */}
        <div className="bg-zinc-950/50 px-6 py-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {data.length} total entries
            {filteredData.length !== data.length && ` (filtered from ${data.length})`}
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-md bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-md bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
      
      {/* Render children for portals like Modals */}
      {children}
      
      {/* Universal SMTP Configuration & Verification Modal */}
      <SmtpConfigModal isOpen={isSmtpModalOpen} onClose={() => setIsSmtpModalOpen(false)} />
    </div>
  );
}
export default AdminPageTemplate;
