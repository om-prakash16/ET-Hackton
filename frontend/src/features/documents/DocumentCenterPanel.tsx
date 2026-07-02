"use client";
import React, { useState } from 'react';
import { UploadCloud, Database, ArrowRight, Search, Filter, Network, Eye, Download, Trash2, Folder, FolderOpen, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document } from '@/types/intelliops';
import { MOCK_DOCUMENTS } from '@/lib/mockData';
import DocumentRow from '@/components/ui/DocumentRow';
import FileTypeIcon from '@/components/ui/FileTypeIcon';

const MOCK_FOLDERS = [
  { id: '1', name: 'Engineering Diagrams', isOpen: true, children: [
      { id: '1-1', name: 'P&IDs', isOpen: false, children: [] },
      { id: '1-2', name: 'Electrical', isOpen: false, children: [] }
    ]
  },
  { id: '2', name: 'Safety Procedures (SOPs)', isOpen: false, children: [] },
  { id: '3', name: 'Maintenance Manuals', isOpen: false, children: [] }
];

const FolderItem = ({ folder, level = 0 }: { folder: any, level?: number }) => {
  const [isOpen, setIsOpen] = useState(folder.isOpen);
  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center gap-2 py-1.5 px-2 hover:bg-deep/50 rounded cursor-pointer transition-colors group"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {folder.children && folder.children.length > 0 ? (
          isOpen ? <ChevronDown className="w-3 h-3 text-muted" /> : <ChevronRight className="w-3 h-3 text-muted" />
        ) : (
          <div className="w-3" />
        )}
        {isOpen ? <FolderOpen className="w-4 h-4 text-accent-cyan" /> : <Folder className="w-4 h-4 text-muted group-hover:text-accent-cyan transition-colors" />}
        <span className="text-xs text-primary truncate">{folder.name}</span>
      </div>
      {isOpen && folder.children && folder.children.length > 0 && (
        <div className="flex flex-col mt-0.5">
          {folder.children.map((child: any) => (
            <FolderItem key={child.id} folder={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function DocumentCenterPanel() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  const filteredDocs = MOCK_DOCUMENTS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.type.toLowerCase().includes(search.toLowerCase())
  );

  const graphNodes = [
    { x: 50, y: 50, label: 'Doc', r: 20 },
    { x: 20, y: 20, label: 'P-101A', r: 12 },
    { x: 80, y: 20, label: 'API-610', r: 12 },
    { x: 15, y: 70, label: 'Seal', r: 10 },
    { x: 82, y: 72, label: 'Pump', r: 10 },
    { x: 50, y: 85, label: 'OISD', r: 10 },
  ];

  return (
    <div className="flex flex-col max-w-[1400px] mx-auto w-full gap-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, var(--accent-cyan), transparent)' }} />
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                Enterprise Document Center
              </h2>
            </div>
            <p className="text-sm ml-4 text-muted">
              Intelligent repository with AI Knowledge Graph Extraction.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-2 rounded-lg text-xs flex flex-col glass-card border-none bg-deep/20">
              <span className="text-muted text-[10px] uppercase font-bold tracking-wider">AI Processing Queue</span>
              <span className="text-primary font-mono font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"/> 14 Documents</span>
            </div>
            <div className="px-3 py-2 rounded-lg text-xs flex flex-col glass-card border-none bg-deep/20">
              <span className="text-muted text-[10px] uppercase font-bold tracking-wider">Total Indexed</span>
              <span className="text-primary font-mono font-bold flex items-center gap-2"><Database className="w-3 h-3 text-emerald-400"/> 14,302 / 842K Nodes</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 flex-col lg:flex-row" style={{ minHeight: '620px' }}>
        
        {/* Left: Folder Explorer Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-60 shrink-0 glass-card p-4 flex flex-col"
        >
          <h3 className="text-xs font-bold tracking-widest text-muted uppercase mb-4 flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5" /> Workspaces
          </h3>
          <div className="flex flex-col gap-1 overflow-y-auto">
            {MOCK_FOLDERS.map(folder => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </div>
        </motion.div>

        {/* Middle: Document Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 glass-card flex flex-col overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-subtle">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search AI metadata, content, or tags..."
                className="w-full bg-void/50 border border-subtle rounded-lg py-2 pl-9 pr-4 text-sm text-primary placeholder-muted focus:outline-none focus:border-active"
              />
            </div>
            <button className="btn-ghost flex items-center gap-1.5 py-2 px-3 text-xs">
              <Filter className="w-3.5 h-3.5" /> AI Filters
            </button>
            <button className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs ml-2">
              <UploadCloud className="w-3.5 h-3.5" /> Upload
            </button>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-subtle bg-deep/20 text-xs font-semibold text-muted">
             <div className="col-span-5">Name & Description</div>
             <div className="col-span-3">Status</div>
             <div className="col-span-2">Owner</div>
             <div className="col-span-2 text-right">Modified</div>
          </div>

          {/* Table/List View */}
          <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1">
            {filteredDocs.map((doc) => (
              <DocumentRow 
                key={doc.id} 
                doc={doc} 
                onSelect={(d) => setSelectedDoc(d)} 
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-subtle flex items-center justify-between mt-auto">
            <span className="text-xs text-muted">Showing {filteredDocs.length} of {MOCK_DOCUMENTS.length} documents</span>
            <div className="flex gap-2">
               <button className="btn-ghost text-[10px] py-1 px-2">Previous</button>
               <button className="btn-ghost text-[10px] py-1 px-2">Next</button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Details Panel */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedDoc ? (
              <motion.div
                key="inspector"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="glass-card flex flex-col gap-5 p-5 flex-1"
              >
                {/* Doc Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <FileTypeIcon type={selectedDoc.type} size={40} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold truncate max-w-[140px] text-primary" title={selectedDoc.name}>
                        {selectedDoc.name}
                      </h3>
                      <p className="text-[11px] text-muted">v2.4 · {selectedDoc.size} · Indexed</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="text-xs px-2.5 py-1 rounded border border-subtle text-muted hover:text-primary hover:border-active transition-all"
                  >
                    Close
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-1.5">
                  <button className="btn-ghost flex items-center gap-1 flex-1 py-1.5 text-[10px] justify-center">
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                  <button className="btn-ghost flex items-center gap-1 flex-1 py-1.5 text-[10px] justify-center">
                    <Download className="w-3 h-3" /> Download
                  </button>
                  <button className="flex items-center gap-1 flex-1 py-1.5 text-[10px] justify-center rounded border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
                
                {/* Approval Workflow */}
                <div>
                   <h4 className="text-[10px] font-bold tracking-widest text-muted uppercase mb-3">Approval Workflow</h4>
                   <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                         <span className="text-emerald-400 font-bold text-xs">OK</span>
                      </div>
                      <div>
                         <p className="text-xs font-semibold text-emerald-400">Approved for Production</p>
                         <p className="text-[10px] text-muted">By John Doe on Oct 14, 2026</p>
                      </div>
                   </div>
                </div>

                {/* Knowledge Extraction */}
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-muted uppercase mb-3">Knowledge Graph Extraction</h4>
                  <div className="p-4 rounded-xl flex flex-col gap-3 border border-subtle bg-deep/30">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-secondary">Entities Extracted</span>
                      <span className="font-bold font-mono text-primary">{selectedDoc.nodes}</span>
                    </div>
                    <div className="progress-rail">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: selectedDoc.nodes > 0 ? '100%' : '0%' }}
                        transition={{ duration: 1 }}
                        className="progress-fill"
                        style={{ height: '4px', background: 'var(--accent-cyan)' }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['P-101A', 'Pump', 'API-610', 'Maintenance'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-semibold uppercase badge-info">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Graph Preview */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-3.5 h-3.5 text-accent-cyan" style={{ color: 'var(--accent-cyan)' }} />
                    <h4 className="text-[10px] font-bold tracking-widest text-muted uppercase">Graph Topology Preview</h4>
                  </div>
                  <div className="flex-1 rounded-xl relative overflow-hidden bg-void/80 border border-subtle min-h-[140px] flex items-center justify-center">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                      {graphNodes.slice(1).map((n, i) => (
                        <motion.line
                          key={i}
                          x1={graphNodes[0].x} y1={graphNodes[0].y} x2={n.x} y2={n.y}
                          stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.8"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                        />
                      ))}
                      {graphNodes.map((n, i) => (
                        <motion.g
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <circle cx={n.x} cy={n.y} r={n.r}
                            fill={i === 0 ? 'rgba(0, 212, 255, 0.15)' : 'rgba(99, 102, 241, 0.15)'}
                            stroke={i === 0 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(99, 102, 241, 0.4)'}
                            strokeWidth="0.8"
                          />
                          <text x={n.x} y={n.y + 0.8} textAnchor="middle" dominantBaseline="middle"
                            fontSize={i === 0 ? '3.5' : '2.5'} fill={i === 0 ? '#00d4ff' : '#818cf8'} fontWeight="600">
                            {n.label}
                          </text>
                        </motion.g>
                      ))}
                    </svg>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 rounded-2xl cursor-pointer transition-all border-2 border-dashed border-subtle bg-deep/10 hover:bg-deep/20 hover:border-active"
                style={{
                  boxShadow: isDragging ? 'var(--glow-cyan)' : 'none',
                }}
              >
                <motion.div
                  animate={{ y: isDragging ? -4 : 0 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-subtle bg-deep/50"
                >
                  <UploadCloud className="w-8 h-8 text-muted" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-primary">Upload Documents</h3>
                <p className="text-xs leading-relaxed mb-6 max-w-[200px] text-muted">
                  Drag and drop Engineering Diagrams, Specs, and Manuals to process through AI.
                </p>
                <button className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
                  <UploadCloud className="w-4 h-4" />
                  Browse Files
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
