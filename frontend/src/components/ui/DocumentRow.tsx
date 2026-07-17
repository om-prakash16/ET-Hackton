import React from 'react';
import { Document } from '@/types/intelliops';
import FileTypeIcon from './FileTypeIcon';
import { MoreHorizontal } from 'lucide-react';

interface DocumentRowProps {
  doc: Document;
  onSelect: (doc: Document) => void;
}

export default function DocumentRow({ doc, onSelect }: DocumentRowProps) {
  // Status Badge configurations
  const statusBadges = {
    indexed: <span className="badge badge-success text-[10px]">Indexed</span>,
    processing: <span className="badge badge-processing text-[10px]">Processing</span>,
    failed: <span className="badge badge-critical text-[10px]">Failed</span>
  };

  return (
    <div 
      onClick={() => onSelect(doc)}
      className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-subtle bg-deep/30 hover:bg-elevated/40 hover:border-active hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <FileTypeIcon type={doc.type} />
        <div>
          <div className="text-sm font-semibold text-primary">{doc.name}</div>
          <div className="text-xs text-muted mt-0.5">{doc.size}</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div>
          {statusBadges[doc.status]}
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs font-mono font-medium text-muted-foreground">{doc.nodes} nodes</div>
          <div className="text-[10px] text-muted">knowledge links</div>
        </div>
        <button className="text-muted hover:text-primary transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

