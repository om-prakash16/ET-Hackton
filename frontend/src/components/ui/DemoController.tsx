import React, { useState, useEffect } from 'react';
import { Play, Square, AlertTriangle, RotateCcw, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoControllerProps {
  activePanel: string;
  onChangePanel: (panel: string) => void;
  onTriggerAlert: () => void;
  onReset: () => void;
}

export default function DemoController({ 
  activePanel, 
  onChangePanel, 
  onTriggerAlert, 
  onReset 
}: DemoControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const panels = ['overview', 'documents', 'copilot', 'maintenance', 'compliance'];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      const currentIndex = panels.indexOf(activePanel);
      const nextIndex = (currentIndex + 1) % panels.length;
      onChangePanel(panels[nextIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, activePanel]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 font-mono">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-active bg-deep/90 text-accent-cyan shadow-lg hover:scale-105 transition-all"
        style={{ boxShadow: 'var(--glow-cyan)' }}
      >
        <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-card p-4 w-60 flex flex-col gap-3"
          >
            <div className="text-[10px] font-bold tracking-widest text-accent-cyan border-b border-subtle pb-1">
              DEMO CONTROL PANEL
            </div>

            <button 
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded bg-void border border-subtle hover:border-active transition-all text-xs text-primary"
            >
              {isAutoplay ? <Square className="w-3.5 h-3.5 text-accent-red" /> : <Play className="w-3.5 h-3.5 text-accent-emerald" />}
              <span>{isAutoplay ? 'Stop Auto-cycle' : 'Start Auto-cycle'}</span>
            </button>

            <button 
              onClick={() => {
                onTriggerAlert();
                onChangePanel('maintenance');
              }}
              className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all text-xs text-red-400"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-accent-red animate-bounce" />
              <span>Trigger Critical Alert</span>
            </button>

            <button 
              onClick={() => {
                onReset();
                setIsAutoplay(false);
              }}
              className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded bg-void border border-subtle hover:border-active transition-all text-xs text-secondary"
            >
              <RotateCcw className="w-3.5 h-3.5 text-muted" />
              <span>Reset Demo State</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
