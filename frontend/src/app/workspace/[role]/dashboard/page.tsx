import React from "react";
import { ROLES, RoleId } from "@/config/roles";
import { notFound } from "next/navigation";
import { 
  KpiWidget, 
  ChartWidget, 
  AiInsightWidget, 
  ActivityFeedWidget, 
  QuickActionsWidget 
} from "@/components/workspace/widgets";
import { Badge } from "@/components/ui/badge";

export default function WorkspaceDashboard({ params }: { params: { role: string } }) {
  const roleId = params.role as RoleId;
  const roleConfig = ROLES[roleId];

  if (!roleConfig) {
    notFound();
  }

  // Helper to determine tailwind grid span classes
  const getSpanClass = (span?: 1 | 2 | 3) => {
    switch (span) {
      case 2: return "lg:col-span-2";
      case 3: return "lg:col-span-3";
      default: return "lg:col-span-1";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{roleConfig.name} Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back. Here is your operational overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-3 py-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Workspace Active
            </span>
          </Badge>
        </div>
      </div>

      {/* Dynamic Widget Rendering based on roles.ts config */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {roleConfig.widgets.map((widget, index) => {
          const spanClass = getSpanClass(widget.span);
          
          if (widget.type === "kpi") {
            return (
              <div key={index} className={spanClass}>
                <KpiWidget title={widget.title} data={widget.data} />
              </div>
            );
          }
          if (widget.type === "chart") {
            return (
              <div key={index} className={spanClass}>
                <ChartWidget title={widget.title} />
              </div>
            );
          }
          if (widget.type === "ai-insight") {
            return (
              <div key={index} className={spanClass}>
                <AiInsightWidget title={widget.title} />
              </div>
            );
          }
          if (widget.type === "activity-feed") {
            return (
              <div key={index} className={spanClass}>
                <ActivityFeedWidget title={widget.title} />
              </div>
            );
          }
          if (widget.type === "quick-actions") {
            return (
              <div key={index} className={spanClass}>
                <QuickActionsWidget title={widget.title} />
              </div>
            );
          }

          return null;
        })}

      </div>
    </div>
  );
}
