import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/intelliops';
import { motion } from 'framer-motion';
import { Cpu, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Basic markdown-lite parser for bold and code backticks
  const renderContent = (text: string) => {
    if (!text) return null;
    
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```|`.*?`|\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).replace(/^[a-zA-Z]+\n/, ''); // Strip lang spec
        return (
          <pre key={index} className="bg-void p-3 rounded-lg border border-subtle font-mono text-xs my-2 overflow-x-auto text-muted-foreground">
            <code>{code}</code>
          </pre>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-void border border-subtle font-mono text-xs text-accent-cyan mx-0.5">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 w-full my-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-subtle bg-deep/50"
             style={{ boxShadow: 'var(--glow-cyan)' }}>
          <Cpu className="w-4 h-4 text-accent-cyan" style={{ color: 'var(--accent-cyan)' }} />
        </div>
      )}

      <div 
        className={`max-w-[80%] rounded-xl p-4 border text-sm flex flex-col gap-2 ${
          isUser 
            ? 'bg-blue-500/10 border-blue-500/30 rounded-tr-none text-primary' 
            : 'bg-elevated/80 border-subtle rounded-tl-none text-primary'
        }`}
        style={{
          borderLeft: !isUser ? '3px solid var(--accent-cyan)' : undefined
        }}
      >
        <div className="leading-relaxed whitespace-pre-wrap">
          {renderContent(message.content)}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 border-t border-subtle/50 pt-2">
            <span className="text-[10px] text-muted uppercase font-semibold mr-1 self-center">Sources:</span>
            {message.sources.map((src) => (
              <span key={src} className="px-2 py-0.5 rounded text-[10px] font-semibold badge-info uppercase">
                {src}
              </span>
            ))}
          </div>
        )}

        <div className={`text-[9px] text-muted self-end mt-1`}>
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-blue-500/20 bg-blue-500/10">
          <User className="w-4 h-4 text-blue-400" />
        </div>
      )}
    </motion.div>
  );
}

