import React from "react";
import { 
  Building2, Users, Database, Cpu, Activity, FileText, 
  TrendingUp, AlertCircle, CheckCircle2, ShieldAlert,
  Server, HardDrive, Zap, Network, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Platform Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Super admin control center for IndusBrain AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-3 py-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              All Systems Operational
            </span>
          </Badge>
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">v2.4.0-enterprise</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building2 className="w-16 h-16 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Organizations</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">248</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-info/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-info" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12,492</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +840 this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-16 h-16 text-accent" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Token Usage</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">42.8M</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-warning/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Database className="w-16 h-16 text-warning" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Knowledge Graph</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <Database className="w-4 h-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1.2B</div>
            <p className="text-xs text-muted-foreground mt-1">
              Edges & Nodes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Processing Queue (Glass Panel) */}
          <Card className="glass border-border/50">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" /> 
                    Live AI Processing Pipeline
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Real-time status of OCR and Embedding queues.</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2"></span>
                  Processing
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {/* Item 1 */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Piping & Instrumentation Diagram (P&ID)</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>Org: Reliance Industries</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-warning">Running OCR</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-32">
                    <span className="text-xs font-mono">68%</span>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-[68%] rounded-full relative">
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <HardDrive className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Historical Maintenance Logs (1998-2023)</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>Org: Tata Steel</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-primary">Generating Embeddings</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-32">
                    <span className="text-xs font-mono">92%</span>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[92%] rounded-full relative">
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <Network className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Asset Hierarchy Sync</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>Org: Adani Power</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-32">
                    <span className="text-xs font-mono text-success">100%</span>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-success w-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Health */}
          <Card className="border-border">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg">Infrastructure Health</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Server className="w-4 h-4" /> Compute</span>
                    <span className="font-mono text-warning">78%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[78%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><HardDrive className="w-4 h-4" /> Storage</span>
                    <span className="font-mono text-primary">42%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[42%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4" /> API Rate Limits</span>
                    <span className="font-mono text-success">12%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[12%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* System Alerts */}
          <Card className="border-danger/30 bg-danger/5">
            <CardHeader className="pb-3 border-b border-danger/10">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-danger">
                <ShieldAlert className="w-4 h-4" /> System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">High API Latency Detected</h4>
                  <p className="text-xs text-muted-foreground mt-1">OpenAI integration endpoint is experiencing 1200ms latency. Auto-scaling triggered.</p>
                  <span className="text-[10px] text-muted-foreground block mt-2">10 mins ago</span>
                </div>
              </div>
              <div className="w-full h-px bg-border/50"></div>
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">OCR Pipeline Stalled</h4>
                  <p className="text-xs text-muted-foreground mt-1">Worker node-04 failed to respond. Attempting restart.</p>
                  <span className="text-[10px] text-muted-foreground block mt-2">1 hr ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Organizations */}
          <Card className="border-border">
            <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">New Organizations</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                <div className="p-3 flex items-center justify-between hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">BP</div>
                    <div>
                      <div className="text-sm font-medium">BP Renewables</div>
                      <div className="text-[10px] text-muted-foreground">Added today</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] h-5">Enterprise</Badge>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">SL</div>
                    <div>
                      <div className="text-sm font-medium">Schlumberger</div>
                      <div className="text-[10px] text-muted-foreground">Added yesterday</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] h-5">Pro</Badge>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-500">EX</div>
                    <div>
                      <div className="text-sm font-medium">ExxonMobil</div>
                      <div className="text-[10px] text-muted-foreground">Added 2 days ago</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] h-5">Enterprise</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
