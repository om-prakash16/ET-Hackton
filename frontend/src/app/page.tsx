"use client";
import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, MessageSquare, Database, Cpu, Search, Bell, Settings, User, FileText, ChevronRight, Terminal, Layers } from 'lucide-react';
import { OverviewPanel } from '@/features/dashboard/OverviewPanel';
import { CopilotPanel } from '@/features/copilot/CopilotPanel';
import { CompliancePanel } from '@/features/compliance/CompliancePanel';
import { DocumentCenterPanel } from '@/features/documents/DocumentCenterPanel';
import { MaintenancePanel } from '@/features/maintenance/MaintenancePanel';
import { motion, AnimatePresence } from 'framer-motion';
import DemoController from '@/components/ui/DemoController';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => { clearInterval(timer); window.removeEventListener('keydown', handleKey); };
  }, []);

  const navItems = [
    { id: 'overview', label: 'Unified Brain', icon: Activity, badge: '2', badgeType: 'critical' },
    { id: 'documents', label: 'Document Corpus', icon: Database, badge: '14k', badgeType: 'neutral' },
    { id: 'copilot', label: 'AI Copilot', icon: MessageSquare, badge: null, badgeType: null },
    { id: 'maintenance', label: 'Maintenance & RCA', icon: Settings, badge: '1', badgeType: 'warning' },
    { id: 'compliance', label: 'Compliance & Audit', icon: ShieldAlert, badge: '2', badgeType: 'critical' },
  ];

  const badgeColors: Record<string, string> = {
    critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    neutral: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  };

  // Demo state callbacks
  const handleTriggerAlert = () => {
    alert("Simulation Mode: Injecting critical gas leak warning for P-201A into the Knowledge Base!");
  };

  const handleReset = () => {
    setActiveTab('overview');
  };

  return (
    <main className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.5) 0%, transparent 70%)' }} />
        {/* Grid BG */}
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Sidebar */}
      <aside
        className="relative z-20 flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: sidebarCollapsed ? '72px' : '240px',
          background: 'linear-gradient(180deg, rgba(5,11,18,0.98) 0%, rgba(8,16,28,0.98) 100%)',
          borderRight: '1px solid var(--border-subtle)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 relative"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(99,102,241,0.2))', border: '1px solid rgba(0,212,255,0.3)' }}>
            <Cpu className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
            <div className="absolute inset-0 rounded-xl" style={{ boxShadow: 'var(--glow-cyan)' }} />
          </div>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>IntelliOps AI</div>
              <div className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Industrial Platform</div>
            </motion.div>
          )}
        </div>

        {/* Plant Indicator */}
        {!sidebarCollapsed && (
          <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg flex items-center gap-2"
            style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
            <span className="pulse-dot pulse-emerald w-2 h-2 shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent-emerald)' }} />
            <div>
              <div className="text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>Visakhapatnam Plant</div>
              <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>All systems operational</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 mt-3 flex-1">
          {!sidebarCollapsed && (
            <div className="px-3 py-2 section-label">Intelligence Modules</div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && item.badgeType && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeColors[item.badgeType]}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}

          {!sidebarCollapsed && (
            <div className="border-t border-subtle my-3 pt-3">
              <Link
                href="/architecture"
                className="nav-item flex items-center gap-2 text-xs text-muted hover:text-accent-cyan transition-colors"
              >
                <Terminal className="w-4 h-4 shrink-0" />
                <span>System Architecture</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Bottom - User */}
        <div className="px-4 py-4 border-t border-subtle mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(99,102,241,0.3))', border: '1px solid rgba(0,212,255,0.25)', color: 'var(--accent-cyan)' }}>
              A
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate text-primary">Admin User</div>
                <div className="text-[10px] truncate text-muted">admin@intelliops.io</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 shrink-0 bg-deep/85 border-b border-subtle backdrop-blur-md">
          {/* Breadcrumb + Search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Layers className="w-3.5 h-3.5" />
              <ChevronRight className="w-3 h-3" />
              <span className="text-secondary">{navItems.find(n => n.id === activeTab)?.label}</span>
            </div>

            <button onClick={() => setIsCommandPaletteOpen(true)}
              className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border border-subtle bg-deep/30 hover:border-active"
            >
              <Search className="w-3.5 h-3.5 shrink-0 text-muted" />
              <span className="flex-1 text-left text-muted text-xs">Search entities, docs, or ask AI...</span>
              <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border border-subtle bg-void">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Live clock */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs border border-subtle bg-deep/50 text-accent-cyan">
              <span className="pulse-dot pulse-cyan w-1.5 h-1.5 rounded-full bg-accent-cyan" style={{ boxShadow: 'var(--glow-cyan)' }} />
              {time.toLocaleTimeString('en-IN', { hour12: false })} IST
            </div>

            {/* Collapse toggle */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1.5 rounded border border-subtle bg-deep/50 text-muted hover:text-primary transition-colors text-xs"
            >
              Toggle Sidebar
            </button>
          </div>
        </header>

        {/* Dynamic Panels */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto p-6"
            >
              {activeTab === 'overview' && (
                <OverviewPanel 
                  onNavigateToCorpus={() => setActiveTab('documents')} 
                  onNavigateToCopilot={() => setActiveTab('copilot')} 
                />
              )}
              {activeTab === 'documents' && <DocumentCenterPanel />}
              {activeTab === 'copilot' && <CopilotPanel />}
              {activeTab === 'maintenance' && <MaintenancePanel />}
              {activeTab === 'compliance' && <CompliancePanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Floating Demo Controller */}
      <DemoController 
        activePanel={activeTab} 
        onChangePanel={(p) => setActiveTab(p)} 
        onTriggerAlert={handleTriggerAlert} 
        onReset={handleReset} 
      />

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]"
            style={{ background: 'rgba(2, 4, 8, 0.8)', backdropFilter: 'blur(12px)' }}
            onClick={() => setIsCommandPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-subtle bg-deep/95 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-subtle">
                <Search className="w-5 h-5 text-accent-cyan" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search knowledge graph or ask Copilot..."
                  className="flex-1 bg-transparent border-none text-base focus:outline-none text-primary placeholder-muted"
                />
                <kbd className="px-2 py-1 rounded text-xs font-mono border border-subtle bg-void text-muted">ESC</kbd>
              </div>
              <div className="p-3 flex flex-col gap-1 max-h-96 overflow-y-auto">
                <div className="px-3 py-2 section-label">Suggested Queries</div>
                {[
                  { label: 'Generate RCA for V-201 Pressure Drop' },
                  { label: 'Show dependency graph for Compressor C-502' },
                  { label: 'Run compliance audit against OISD-105' }
                ].map((item) => (
                  <button 
                    key={item.label} 
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      setActiveTab('copilot');
                    }}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl text-sm transition-all hover:bg-elevated/40 text-secondary hover:text-primary"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
