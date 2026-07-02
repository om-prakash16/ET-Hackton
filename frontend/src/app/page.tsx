import Link from "next/link";
import { 
  Brain, ChevronDown, Globe, Play, CheckCircle2, Search, Bell, Info, User, 
  TrendingUp, FileText, Clock, ShieldCheck, Users, Network, MessageSquare, 
  Wrench, Shield, Zap, Quote, ArrowRight, Activity, AlertTriangle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IndusBrain AI | Unified Asset & Operations Brain",
  description: "Enterprise-grade AI for industrial knowledge intelligence. Connect your documents, systems, and people to deliver answers, insights, and actions—instantly.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indusbrain.com",
    title: "IndusBrain AI | Unified Asset & Operations Brain",
    description: "Enterprise-grade AI for industrial knowledge intelligence.",
    siteName: "IndusBrain AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndusBrain AI | Unified Asset & Operations Brain",
    description: "Enterprise-grade AI for industrial knowledge intelligence.",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none">IndusBrain <span className="text-primary">AI</span></span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide mt-1">Unified Asset & Operations Brain</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">Product <ChevronDown className="w-4 h-4 opacity-50" /></button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">Solutions <ChevronDown className="w-4 h-4 opacity-50" /></button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">Resources <ChevronDown className="w-4 h-4 opacity-50" /></button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">Industries <ChevronDown className="w-4 h-4 opacity-50" /></button>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">Company <ChevronDown className="w-4 h-4 opacity-50" /></button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="w-4 h-4 opacity-70" /> EN <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
          <div className="w-px h-5 bg-border"></div>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
          <Button asChild variant="default">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden border-b border-border/50">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <Badge variant="glass" className="mb-8 px-3 py-1 rounded-full text-primary border-primary/30 bg-primary/10">
              <span className="text-[11px] font-bold tracking-wider uppercase">AI For Industrial Intelligence</span>
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl xl:text-[68px] font-bold text-foreground leading-[1.1] tracking-tight mb-8">
              One Unified Brain for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Assets, Operations</span> & Industrial Knowledge
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              IndusBrain AI connects your documents, systems and people to deliver answers, insights and actions—instantly. Reduce downtime, ensure compliance and empower every decision with trusted industrial intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <Button asChild size="lg" className="w-full sm:w-auto px-8 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Link href="/register">Book a demo <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 bg-background/50 backdrop-blur-md">
                <Play className="w-4 h-4 mr-2" /> Explore platform
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</div>
              <div className="w-1 h-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quick setup</div>
              <div className="w-1 h-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Enterprise ready</div>
            </div>
          </div>

          {/* Right Dashboard Graphic */}
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-card/90 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden p-4 relative z-10">
              {/* Fake Dashboard Nav */}
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-foreground">IndusBrain <span className="text-primary">AI</span></span>
                </div>
                <div className="flex-1 max-w-sm mx-4">
                  <div className="bg-secondary/50 rounded-lg border border-border/50 px-3 py-1.5 flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Search anything...</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"><User className="w-3 h-3 text-primary" /></div>
                </div>
              </div>

              {/* Fake Dashboard Body */}
              <div className="flex gap-4">
                {/* Fake Sidebar */}
                <div className="w-36 hidden sm:flex flex-col gap-2">
                  <div className="bg-primary/10 text-primary border border-primary/20 rounded-md px-3 py-2 flex items-center gap-2 text-[11px] font-medium"><Brain className="w-3.5 h-3.5" /> Home</div>
                  <div className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 flex items-center gap-2 text-[11px]"><MessageSquare className="w-3.5 h-3.5" /> Knowledge Copilot</div>
                  <div className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 flex items-center gap-2 text-[11px]"><Wrench className="w-3.5 h-3.5" /> Maintenance</div>
                  <div className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 flex items-center gap-2 text-[11px]"><ShieldCheck className="w-3.5 h-3.5" /> Compliance</div>
                  <div className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 flex items-center gap-2 text-[11px]"><FileText className="w-3.5 h-3.5" /> Documents</div>
                </div>

                {/* Fake Content */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-secondary/30 rounded-lg border border-border p-3">
                      <div className="text-[10px] text-muted-foreground mb-1">Total Assets</div>
                      <div className="text-lg font-bold text-foreground mb-1">12,842</div>
                      <div className="text-[10px] text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 8.5% vs last month</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg border border-border p-3">
                      <div className="text-[10px] text-muted-foreground mb-1">Work Orders</div>
                      <div className="text-lg font-bold text-foreground mb-1">1,284</div>
                      <div className="text-[10px] text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 12.3% vs last month</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg border border-border p-3">
                      <div className="text-[10px] text-muted-foreground mb-1">Open Incidents</div>
                      <div className="text-lg font-bold text-foreground mb-1">24</div>
                      <div className="text-[10px] text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 4.2% vs last month</div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg border border-border p-3 relative overflow-hidden">
                      <div className="text-[10px] text-muted-foreground mb-1">Compliance Score</div>
                      <div className="text-lg font-bold text-foreground mb-1">92%</div>
                      <div className="text-[10px] text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 6.7% vs last month</div>
                      {/* Fake circular progress */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-border border-t-emerald-500"></div>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 rounded-lg border border-border p-3 h-32">
                      <div className="text-[11px] font-medium text-foreground mb-2">Maintenance Overview</div>
                      {/* Fake Line Chart */}
                      <div className="relative h-20 w-full mt-4">
                        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                          <polyline fill="none" stroke="#8b5cf6" strokeWidth="1.5" points="0,20 10,15 20,25 30,10 40,15 50,5 60,20 70,10 80,15 90,5 100,10" />
                          <polyline fill="none" stroke="#3b82f6" strokeWidth="1.5" points="0,25 10,28 20,22 30,26 40,20 50,24 60,18 70,22 80,16 90,20 100,15" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-secondary/30 rounded-lg border border-border p-3 h-32 flex items-center">
                      <div className="flex-1 flex flex-col justify-center items-center relative">
                        {/* Fake Donut Chart */}
                        <div className="w-16 h-16 rounded-full border-4 border-border border-t-primary border-r-purple-500 border-b-emerald-500 border-l-orange-500 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-foreground">2,568</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5 justify-center">
                        <div className="text-[11px] font-medium text-foreground mb-1">Knowledge Queries</div>
                        <div className="flex items-center gap-2 text-[9px]"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> <span className="text-muted-foreground">Maintenance</span></div>
                        <div className="flex items-center gap-2 text-[9px]"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> <span className="text-muted-foreground">Operations</span></div>
                        <div className="flex items-center gap-2 text-[9px]"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> <span className="text-muted-foreground">Safety</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="mt-2 bg-secondary/50 rounded-xl border border-border/50 p-2.5 flex items-center gap-3 relative">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-muted-foreground flex-1">Ask anything about your assets, documents, operations...</span>
                    <button className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center"><ArrowRight className="w-3 h-3 text-primary-foreground" /></button>
                  </div>
                </div>
              </div>

            </div>

            {/* Glowing orb behind dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] z-0 rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-16 border-b border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">Trusted by forward-thinking industrial organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake logos styled with text for demonstration */}
            <div className="flex items-center gap-2"><span className="text-xl font-black text-foreground tracking-tighter">TATA STEEL</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-yellow-500 rounded-full"></div><span className="text-xl font-bold text-foreground">Reliance</span></div>
            <div className="flex items-center gap-2"><span className="text-2xl font-bold text-primary tracking-tight lowercase">adani</span></div>
            <div className="flex items-center gap-2"><span className="text-2xl font-black text-foreground italic tracking-tighter">JSW</span><span className="text-sm text-muted-foreground">Steel</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-primary rounded"></div><span className="text-xl font-bold text-foreground tracking-tight">NTPC</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 border-2 border-red-500 rounded-full"></div><span className="text-xl font-bold text-foreground tracking-widest">ONGC</span></div>
            <div className="flex items-center gap-2"><span className="text-xl font-light text-foreground tracking-widest lowercase">vedanta</span></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-x divide-border">
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tight">35%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Time saved in search & information retrieval</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                <Clock className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tight">18-22%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Reduction in unplanned downtime</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tight">92%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Improvement in compliance readiness</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tight">25%</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Knowledge retention before retirement</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-4 border border-pink-500/20">
                <TrendingUp className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-2 tracking-tight">3-5x</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">ROI within the first year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold text-xs tracking-widest uppercase mb-4">Powerful Capabilities</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">AI that understands your industrial world</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <Card className="bg-secondary/20 border-border/80 flex flex-col hover:border-primary/50 transition-colors group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 border border-primary/20 group-hover:scale-110 transition-transform">
                  <Network className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold mb-3">Unified Knowledge Graph</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">Connect documents, assets, systems and people into a living knowledge graph that evolves with your operations.</p>
                <Link href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/80 flex flex-col hover:border-purple-500/50 transition-colors group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-foreground font-bold mb-3">Expert Knowledge Copilot</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">Ask questions in natural language and get accurate, cited answers from across your industrial knowledge.</p>
                <Link href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/80 flex flex-col hover:border-orange-500/50 transition-colors group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 border border-orange-500/20 group-hover:scale-110 transition-transform">
                  <Wrench className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-foreground font-bold mb-3">Maintenance Intelligence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">Predict failures, optimize maintenance schedules and reduce downtime with AI-powered recommendations.</p>
                <Link href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/80 flex flex-col hover:border-emerald-500/50 transition-colors group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-foreground font-bold mb-3">Compliance Intelligence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">Stay audit-ready with AI that maps regulations, identifies gaps and prepares compliance evidence automatically.</p>
                <Link href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/80 flex flex-col hover:border-pink-500/50 transition-colors group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-5 border border-pink-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-foreground font-bold mb-3">Lessons Learned Engine</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">Turn past incidents and near-misses into proactive insights to prevent recurrence and improve safety.</p>
                <Link href="#" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Testimonial & Data Stats */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-8">
          
          {/* Testimonial */}
          <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-between relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-24 h-24 text-primary/5" />
            <div className="relative z-10 mb-10">
              <Quote className="w-8 h-8 text-purple-500 mb-6" />
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                "IndusBrain AI has transformed how we access and use industrial knowledge. Our teams spend less time searching and more time solving real problems."
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden border-2 border-border">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Arun Kumar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-foreground font-bold text-lg">Arun Kumar</h4>
                <p className="text-muted-foreground text-sm">Head of Reliability, Large Manufacturing Plant</p>
              </div>
            </div>
          </div>

          {/* Data Stats Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <Card className="bg-card border-border rounded-3xl flex flex-col justify-center items-center text-center p-8">
              <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-2">10,000+</h3>
              <p className="text-muted-foreground text-sm">Documents<br/>ingested daily</p>
            </Card>
            <Card className="bg-card border-border rounded-3xl flex flex-col justify-center items-center text-center p-8">
              <h3 className="text-4xl lg:text-5xl font-bold text-purple-500 mb-2">50+</h3>
              <p className="text-muted-foreground text-sm">Industrial data<br/>sources supported</p>
            </Card>
            <Card className="bg-card border-border rounded-3xl flex flex-col justify-center items-center text-center p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-pink-500 mb-2">Enterprise<br/>Grade</h3>
              <p className="text-muted-foreground text-sm">Security &<br/>Compliance</p>
            </Card>
            <Card className="bg-card border-border rounded-3xl flex flex-col justify-center items-center text-center p-8">
              <h3 className="text-4xl lg:text-5xl font-bold text-emerald-500 mb-2">24/7</h3>
              <p className="text-muted-foreground text-sm">Continuous learning<br/>& improvement</p>
            </Card>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="w-full rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">Ready to unlock the power of your industrial knowledge?</h2>
            <p className="text-blue-100 text-lg">Join leading organizations using IndusBrain AI to drive operational excellence.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-slate-50 font-bold px-8 shadow-lg">
              <Link href="/register">Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold px-8 hover:text-white">
              <Link href="/contact">Talk to an expert</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-foreground">IndusBrain <span className="text-primary">AI</span></span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                AI for Industrial Knowledge Intelligence. Empowering safer, smarter and more efficient operations.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-muted-foreground hover:text-primary-foreground transition-all">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.2-1-3 2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-1 1.5-1 2.8V22"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Knowledge Copilot</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Maintenance Intelligence</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Compliance Intelligence</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documents</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">Solutions</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Asset Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reliability & Maintenance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Quality & Compliance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Operations Excellence</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Knowledge Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Whitepapers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-xs text-muted-foreground">
            <p>© 2024 IndusBrain AI. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-orange-400 flex flex-col">
                  <div className="h-1/3 bg-orange-500"></div>
                  <div className="h-1/3 bg-white"></div>
                  <div className="h-1/3 bg-green-500"></div>
                </div>
                India <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
