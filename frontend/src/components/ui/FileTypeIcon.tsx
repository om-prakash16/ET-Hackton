import React from 'react';

interface FileTypeIconProps {
  type: 'pdf' | 'dwg' | 'xlsx' | 'docx' | 'txt';
  size?: number;
}

export default function FileTypeIcon({ type, size = 32 }: FileTypeIconProps) {
  // Background and border colors matching design theme
  const colors = {
    pdf: { bg: 'var(--accent-red-dim)', border: 'var(--accent-red)', text: 'PDF' },
    dwg: { bg: 'rgba(99, 102, 241, 0.15)', border: 'var(--accent-indigo)', text: 'DWG' },
    xlsx: { bg: 'var(--accent-emerald-dim)', border: 'var(--accent-emerald)', text: 'XLS' },
    docx: { bg: 'var(--accent-blue-dim)', border: 'var(--accent-blue)', text: 'DOC' },
    txt: { bg: 'rgba(122, 163, 200, 0.1)', border: 'var(--text-muted)', text: 'TXT' }
  };

  const style = colors[type] || colors.txt;

  return (
    <div 
      className="flex flex-col items-center justify-center rounded font-mono font-bold select-none text-[9px] tracking-tighter"
      style={{
        width: size,
        height: size,
        backgroundColor: style.bg,
        border: `1.5px solid ${style.border}`,
        color: 'var(--text-primary)',
        boxShadow: `0 0 10px ${style.border}1a`
      }}
    >
      {style.text}
    </div>
  );
}
