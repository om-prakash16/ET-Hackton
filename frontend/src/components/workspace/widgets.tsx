import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Cpu, Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KpiData {
  value: string | number;
}

export function KpiWidget({ title, data }: { title?: string; data?: KpiData }) {
  return (
    <Card className="hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Activity className="w-4 h-4 text-primary opacity-50" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{data?.value || "N/A"}</div>
      </CardContent>
    </Card>
  );
}

export function ChartWidget({ title }: { title?: string }) {
  return (
    <Card className="flex flex-col h-full border-border/50 bg-secondary/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[200px] flex items-center justify-center relative">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <p className="text-xs text-muted-foreground z-10 flex items-center gap-2">
          <Activity className="w-4 h-4" /> Loading Visualization...
        </p>
      </CardContent>
    </Card>
  );
}

export function AiInsightWidget({ title }: { title?: string }) {
  return (
    <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Cpu className="w-16 h-16 text-primary" />
      </div>
      <CardHeader className="pb-3 border-b border-primary/10">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4 text-purple-500" /> {title || "AI Insights"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-3 relative z-10">
          <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-warning" /></div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Predicted Anomaly</h4>
            <p className="text-xs text-muted-foreground mt-1">Based on thermal telemetry, Pump P-204a has an 82% probability of cavitation failure in the next 14 hours.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityFeedWidget({ title }: { title?: string }) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold">{title || "Recent Activity"}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          <div className="p-3 hover:bg-muted/30 transition-colors flex justify-between items-center">
            <div>
              <p className="text-sm text-foreground">Completed inspection on Valve V-102</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">2 hours ago</p>
            </div>
            <Badge variant="outline" className="text-[10px] h-5 bg-success/10 text-success border-success/20">Done</Badge>
          </div>
          <div className="p-3 hover:bg-muted/30 transition-colors flex justify-between items-center">
            <div>
              <p className="text-sm text-foreground">Generated RCA for Incident #4992</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Yesterday</p>
            </div>
            <Badge variant="outline" className="text-[10px] h-5">Review</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActionsWidget({ title }: { title?: string }) {
  return (
    <Card className="glass">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-semibold">{title || "Quick Actions"}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-2">
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-muted-foreground hover:text-primary">
          Upload
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-muted-foreground hover:text-primary">
          Scan QR
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-muted-foreground hover:text-primary">
          Ask AI
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-border/50 bg-secondary/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-muted-foreground hover:text-primary">
          Report
        </button>
      </CardContent>
    </Card>
  );
}
