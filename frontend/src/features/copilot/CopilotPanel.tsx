"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, History, Activity, ShieldAlert, Network, RefreshCw, Database, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/intelliops';
import ChatMessage from '@/components/ui/ChatMessage';

export function CopilotPanel() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: 'AI Investigation OS active. Connected to Neo4j graph and Qdrant telemetry. I have context over 14,302 documents and 842K knowledge nodes. How can I assist with Visakhapatnam operations?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || isLoading) return;

    if (!textToSend) setInput('');

    const userMessage: ChatMessageType = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Initial empty assistant message
    const assistantMsgId = `msg-assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessageType = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, initialAssistantMessage]);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          contextSources: ['OEM_Manuals.pdf', 'Visakhapatnam_Graph', 'Live_Telemetry', 'OISD_Regulations']
        })
      });

      if (!response.body) throw new Error('No body in response');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamedText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          streamedText += chunk;

          setMessages(prev => {
            return prev.map(msg => {
              if (msg.id === assistantMsgId) {
                // Auto-detect sources from streamed text to add badges dynamically
                const sources: string[] = [];
                if (streamedText.toLowerCase().includes('api-610')) sources.push('API-610 Manual');
                if (streamedText.toLowerCase().includes('oisd-105')) sources.push('OISD-105');
                if (streamedText.toLowerCase().includes('v-201')) sources.push('V-201 Log');
                
                return {
                  ...msg,
                  content: streamedText,
                  sources: sources.length > 0 ? sources : undefined
                };
              }
              return msg;
            });
          });
        }
      }

      // Check if prompt references assets to populate details panel
      if (promptText.toLowerCase().includes('p-101a') || promptText.toLowerCase().includes('pressure')) {
        setSelectedCitation('P-101A Mechanical Seal');
      } else if (promptText.toLowerCase().includes('oisd') || promptText.toLowerCase().includes('compliance')) {
        setSelectedCitation('OISD-105 Safety Standards');
      }

    } catch (err) {
      console.error('Fetch stream error:', err);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMsgId 
            ? { ...msg, content: 'Error connecting to AI intelligence core. Operating in degraded mode.' } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { text: 'Why is P-101A pressure dropping?', icon: Activity },
    { text: 'OISD-105 compliance status', icon: ShieldAlert },
    { text: 'Show C-502 dependency graph', icon: Network }
  ];

  return (
    <div className="flex gap-4 w-full max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      {/* Left Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 flex flex-col gap-4 shrink-0"
      >
        <button 
          onClick={() => setMessages([{ id: 'msg-init', role: 'assistant', content: 'AI Investigation OS active. Connected to Neo4j graph and Qdrant telemetry. I have context over 14,302 documents and 842K knowledge nodes. How can I assist with Visakhapatnam operations?', timestamp: new Date() }])}
          className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold"
        >
          <Plus className="w-4 h-4" /> New Investigation
        </button>

        <div className="glass-card flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2 px-1">
            <History className="w-3.5 h-3.5 text-muted" />
            <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase">Saved Investigations</h3>
          </div>
          {[
            { id: 'inv-1', title: 'P-101A Pressure Drop', severity: 'critical', active: true },
            { id: 'inv-2', title: 'V-201 Compliance Audit', severity: 'warning', active: false },
            { id: 'inv-3', title: 'C-502 RCA Analysis', severity: 'normal', active: false }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => handleSend(`Load details for investigation ${item.title}`)}
              className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors hover:bg-elevated/50 ${item.active ? 'bg-elevated text-primary border border-subtle' : 'text-secondary'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.severity === 'critical' ? 'bg-red-500' : item.severity === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
              <span className="truncate">{item.title}</span>
            </button>
          ))}

          <div className="flex items-center gap-2 mt-6 mb-2 px-1">
            <Database className="w-3.5 h-3.5 text-muted" />
            <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase">Context Sources</h3>
          </div>
          {[
            'OEM_Manuals.pdf',
            'Visakhapatnam_Graph',
            'Live_Telemetry',
            'OISD_Regulations'
          ].map((src) => (
            <div key={src} className="flex items-center gap-2 px-2 py-1 text-xs text-secondary font-mono">
              <span className="pulse-dot pulse-emerald w-1.5 h-1.5 shrink-0" />
              <span className="truncate">{src}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Center Chat View */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 glass-card flex flex-col overflow-hidden"
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-subtle">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-primary">GraphRAG Copilot</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold badge-info uppercase">GraphRAG v2</span>
          </div>
          <span className="text-[11px] text-muted flex items-center gap-1.5">
            <span className="pulse-dot pulse-emerald w-1.5 h-1.5" />
            Connected · 842K Nodes
          </span>
        </div>

        {/* Chat Message Window */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex gap-1.5 items-center p-4">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent-cyan"
                  style={{ background: 'var(--accent-cyan)' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length === 1 && (
          <div className="px-4 py-2 flex flex-wrap gap-2 justify-center border-t border-subtle bg-deep/20">
            {suggestions.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.text}
                  onClick={() => handleSend(s.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-subtle bg-deep/50 hover:bg-elevated hover:border-active transition-all text-xs text-secondary hover:text-primary"
                >
                  <Icon className="w-3.5 h-3.5 text-accent-cyan" />
                  {s.text}
                </button>
              );
            })}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-subtle bg-deep/30">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Copilot about assets, compliance standard, or P-101A troubleshooting..."
              className="flex-1 bg-void/50 border border-subtle rounded-lg py-2.5 px-4 text-sm text-primary placeholder-muted focus:outline-none focus:border-active font-mono"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="btn-primary p-2.5 flex items-center justify-center shrink-0"
              style={{ boxShadow: 'var(--glow-cyan)' }}
            >
              <Send className="w-4 h-4 text-accent-cyan" />
            </button>
          </form>
          <div className="flex justify-between items-center mt-2.5 text-[10px] text-muted">
            <span>Enter to Send · Shift+Enter for newline</span>
            <div className="flex gap-2">
              <span className="font-mono text-muted uppercase">GraphRAG</span>
              <span className="font-mono text-muted uppercase">Neo4j</span>
              <span className="font-mono text-muted uppercase">Qdrant</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Sidebar - Graph Context details */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 glass-card p-4 shrink-0 flex flex-col overflow-y-auto"
      >
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-4 h-4 text-accent-cyan" style={{ color: 'var(--accent-cyan)' }} />
          <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase">Graph Context</h3>
        </div>

        {selectedCitation ? (
          <div className="flex flex-col gap-4 text-xs">
            <div>
              <div className="text-sm font-semibold text-primary">{selectedCitation}</div>
              <div className="text-[10px] text-accent-cyan font-mono mt-0.5">Asset ID: P-101A</div>
            </div>

            <div className="border-t border-subtle pt-3">
              <div className="text-[10px] uppercase font-bold text-muted mb-1.5">Direct Relationships</div>
              <div className="flex flex-col gap-1 text-secondary">
                <div className="flex justify-between">
                  <span>has_component</span>
                  <span className="text-primary font-semibold">Mechanical Seal</span>
                </div>
                <div className="flex justify-between">
                  <span>governed_by</span>
                  <span className="text-primary font-semibold">API Standard 610</span>
                </div>
                <div className="flex justify-between">
                  <span>monitored_by</span>
                  <span className="text-primary font-semibold">Vibration Sensor</span>
                </div>
              </div>
            </div>

            <div className="border-t border-subtle pt-3">
              <div className="text-[10px] uppercase font-bold text-muted mb-2">Evidence Documents</div>
              <div className="flex flex-col gap-1.5">
                {['API-610 Centrifugal Pumps Manual.pdf', 'Incident Report Seal Failure.txt'].map((doc) => (
                  <div key={doc} className="p-2 rounded border border-subtle bg-deep/50 text-[10px] font-mono leading-tight text-secondary">
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-2 text-muted">
            <Search className="w-8 h-8 mb-2 text-muted/50" />
            <p className="text-[11px] leading-relaxed">
              Select or ask about an entity citation in the chat to view its graph topology and evidence.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
