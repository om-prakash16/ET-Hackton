import React from 'react';
import { Wrench } from 'lucide-react';

export default function IncidentsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-8rem)] text-muted-foreground">
      <Wrench className="w-16 h-16 mb-4 text-primary opacity-50" />
      <h2 className="text-2xl font-bold text-foreground">Open Incidents (Coming Soon)</h2>
      <p className="mt-2 text-sm text-center max-w-md">
        This module is currently being developed. Please explore the AI Copilot, Dashboard, or Documents modules for the hackathon demonstration.
      </p>
    </div>
  );
}
