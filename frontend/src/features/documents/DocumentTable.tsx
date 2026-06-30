"use client";
import React from 'react';
import { FileText, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';

export function DocumentTable() {
    // For this hackathon iteration, we use placeholder data that mimics the backend status.
    // In a full implementation, this uses SWR or React Query to poll GET /api/ingest/documents
    
    const docs = [
        { id: '1', name: 'Pump_P101_Manual.pdf', status: 'READY', entities: 12, size: '2.4 MB' },
        { id: '2', name: 'Inspection_Report_Q3.pdf', status: 'PROCESSING', entities: 0, size: '5.1 MB' },
        { id: '3', name: 'OISD_105_Standard.pdf', status: 'UPLOADED', entities: 0, size: '1.2 MB' },
        { id: '4', name: 'Corrupted_Log.txt', status: 'FAILED', entities: 0, size: '0.1 MB' },
    ];

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'READY': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
            case 'PROCESSING': return <Loader2 className="w-5 h-5 text-brand-cyan animate-spin" />;
            case 'FAILED': return <AlertTriangle className="w-5 h-5 text-brand-magenta" />;
            default: return <Loader2 className="w-5 h-5 text-white/40" />;
        }
    };

    return (
        <div className="w-full glass-panel rounded-xl overflow-hidden border border-white/10">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                        <th className="p-4 text-white/60 font-medium">Document Name</th>
                        <th className="p-4 text-white/60 font-medium">Status</th>
                        <th className="p-4 text-white/60 font-medium">Extracted Entities</th>
                        <th className="p-4 text-white/60 font-medium">Size</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map(doc => (
                        <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                            <td className="p-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-brand-purple" />
                                <span>{doc.name}</span>
                            </td>
                            <td className="p-4 flex items-center gap-2">
                                {getStatusIcon(doc.status)}
                                <span className="text-sm">{doc.status}</span>
                            </td>
                            <td className="p-4 text-brand-cyan">{doc.entities > 0 ? doc.entities : '-'}</td>
                            <td className="p-4 text-white/50">{doc.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
