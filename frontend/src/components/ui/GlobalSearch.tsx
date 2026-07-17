"use client";
import React, { useState, useEffect } from 'react';
import { Search, Command, X, FileText, Activity, AlertTriangle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const params = useParams();
  const role = params?.role || 'operations';

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    // In a real app, you might pass the query via context or URL params
    router.push(`/workspace/${role}/copilot`);
  };

  const suggestions = [
    { icon: AlertTriangle, text: 'P-101A Pressure Drop Investigation', type: 'Investigation' },
    { icon: FileText, text: 'OISD-105 Compliance Standards', type: 'Document' },
    { icon: Activity, text: 'V-201 Thermal Gradient Anomaly', type: 'Telemetry' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-background/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <form onSubmit={handleSearch} className="flex items-center px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Copilot or search for assets, documents, incidents..."
              className="flex-1 bg-transparent border-none outline-none text-foreground text-sm placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground ml-2">
              ESC
            </kbd>
            <button type="button" onClick={onClose} className="sm:hidden ml-2 p-1 text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </form>

          {query.trim() === '' && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                Suggested
              </div>
              <div className="flex flex-col gap-1">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(s.text);
                      handleSearch(new Event('submit') as any);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-muted text-sm text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-foreground">{s.text}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded">
                      {s.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== '' && (
            <div className="p-2">
              <button
                onClick={handleSearch}
                className="flex items-center w-full px-3 py-3 rounded-lg hover:bg-muted text-sm text-left transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                  <Command className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">Ask AI Copilot</span>
                  <span className="text-xs text-muted-foreground">"{query}"</span>
                </div>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
