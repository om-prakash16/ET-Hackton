"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, Users, Database, Cpu, Activity, FileText, 
  TrendingUp, AlertCircle, CheckCircle2, ShieldAlert,
  Server, HardDrive, Zap, Network, ArrowUpRight, Plus,
  CreditCard, CheckCircle, PauseCircle, Ticket, Radio, Bot, ListRestart, Link as LinkIcon, History,
  ScanText, Share2, Layers, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState<string>("Super Admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("indusbrain_user_role");
      if (role) setUserRole(role);
    }
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up p-4 lg:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            {userRole === "Super Admin" ? "Platform Control Center" : `${userRole} Dashboard`}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {userRole === "Super Admin" ? "Super Admin overview of infrastructure, AI, and organization health." : `Overview and insights tailored for ${userRole} operations.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-3 py-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Platform Availability: 99.99%
            </span>
          </Badge>
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">v2.4.0-enterprise</span>
        </div>
      </div>

      {/* KPI Cards Grid - Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building2 className="w-16 h-16 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Organizations</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">248</div>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-xs text-warning flex items-center gap-1">
                12 Pending
              </p>
              <p className="text-xs text-danger flex items-center gap-1">
                3 Rejected
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-info/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-info" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Platform Users</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12,492</div>
            <p className="text-xs text-success flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" />
              +840 this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-16 h-16 text-emerald-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue (MRR)</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$485.2k</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
              <span>184 Active Subs</span>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span>12k Licenses</span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-warning/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <HardDrive className="w-16 h-16 text-warning" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Usage</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">142 TB</div>
            <p className="text-xs text-muted-foreground mt-2">
              Global Platform Allocation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards Grid - System & AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" /> Platform AI Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42.8M <span className="text-sm text-muted-foreground font-normal">/mo</span></div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Network className="w-4 h-4 text-info" /> Knowledge Graph
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.2B <span className="text-sm text-muted-foreground font-normal">Nodes</span></div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-primary" /> Global API Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">184M <span className="text-sm text-muted-foreground font-normal">/day</span></div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-danger" /> Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4 <span className="text-sm text-muted-foreground font-normal">Active</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Workflow Visualization */}
          <Card className="border-border bg-zinc-900 overflow-hidden flex flex-col shadow-sm">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-white text-sm">AI Processing Pipeline</h3>
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5">
                Live Topology
              </Badge>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative z-10 flex flex-wrap justify-center gap-4 max-w-2xl">
                {[
                  { label: "Document Upload", icon: FileText, color: "blue" },
                  { label: "OCR Processing", icon: ScanText, color: "amber" },
                  { label: "Classification", icon: Bot, color: "purple" },
                  { label: "Entity Extraction", icon: Network, color: "emerald" },
                  { label: "Knowledge Graph", icon: Share2, color: "blue" },
                  { label: "Embeddings", icon: Layers, color: "purple" },
                  { label: "Vector DB", icon: Database, color: "emerald" },
                  { label: "AI Copilot", icon: Sparkles, color: "amber" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg w-28 h-24 group hover:border-${step.color}-500/50 transition-colors`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-400 mb-2`} />
                      <span className="text-[10px] font-semibold text-zinc-300 text-center">{step.label}</span>
                    </div>
                    {idx < 7 && (
                      <div className="w-6 h-0.5 bg-zinc-800 mx-2 relative hidden sm:block">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-zinc-700 rotate-45"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* AI Processing Queue (Glass Panel) */}
          <Card className="glass border-border/50">
            <CardHeader className="border-b border-border/50 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" /> 
                  Live Background Queues
                </CardTitle>
                <CardDescription>Real-time status of OCR, Embedding, and Background Jobs.</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2"></span>
                Processing
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {/* OCR Jobs */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">OCR Jobs Queue</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>45,290 Documents Pending</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-warning">High Load</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Manage Queue</Button>
                </div>

                {/* Embedding Queue */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <Database className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Vector Embedding Queue</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>12.4M Chunks</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-primary">Processing Normally</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Manage Queue</Button>
                </div>

                {/* Background Jobs */}
                <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                      <History className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">General Background Jobs</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>Sync, Backup, Reporting</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="text-success">Healthy</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">View Jobs</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Health */}
          <Card className="border-border">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg">System Health & Monitoring</CardTitle>
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
                    <span className="text-muted-foreground flex items-center gap-2"><Server className="w-4 h-4" /> Database (PostgreSQL)</span>
                    <span className="font-mono text-primary">62%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[62%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4" /> Redis Cache</span>
                    <span className="font-mono text-success">34%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[34%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Quick Actions (Super Admin specific) */}
          {userRole === "Super Admin" && (
            <Card className="border-border bg-card">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-sm font-semibold">Super Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors">
                    <Plus className="w-5 h-5 text-muted-foreground" />
                    Create Organization
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-success/10 hover:text-success hover:border-success/50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-muted-foreground" />
                    Approve Org
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-danger/10 hover:text-danger hover:border-danger/50 transition-colors">
                    <PauseCircle className="w-5 h-5 text-muted-foreground" />
                    Suspend Org
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-info/10 hover:text-info hover:border-info/50 transition-colors">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    Assign Subscription
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-colors">
                    <Ticket className="w-5 h-5 text-muted-foreground" />
                    Create License
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-warning/10 hover:text-warning hover:border-warning/50 transition-colors">
                    <Radio className="w-5 h-5 text-muted-foreground" />
                    Broadcast Alert
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                    Configure AI
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 items-center justify-center text-xs bg-background/50 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/50 transition-colors">
                    <ListRestart className="w-5 h-5 text-muted-foreground" />
                    Restart OCR
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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

        </div>
      </div>
    </div>
  );
}
