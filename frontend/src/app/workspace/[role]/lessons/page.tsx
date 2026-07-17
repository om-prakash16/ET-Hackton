"use client";

import React, { useState, useEffect } from "react";
import { 
  Lightbulb, Zap, TrendingUp, AlertTriangle, CheckCircle2, 
  Search, Filter, Play, Brain, RefreshCw, FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LessonsLearnedPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, insightsRes, lessonsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/lessons/tenant/dashboard`),
        fetch(`${API_BASE_URL}/api/v1/lessons/tenant/insights`),
        fetch(`${API_BASE_URL}/api/v1/lessons/`)
      ]);
      
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setMetrics(dashData.metrics);
      }
      if (insightsRes.ok) {
        const insightsData = await insightsRes.json();
        setInsights(insightsData.insights);
      }
      if (lessonsRes.ok) {
        const lessonsData = await lessonsRes.json();
        setLessons(lessonsData);
      }
    } catch (err) {
      console.error("Error fetching lessons data:", err);
      // Fallback for UI if backend is offline during UI build
      setMetrics({
        total_lessons: 142,
        critical_lessons: 12,
        preventive_recommendations: 84,
        repeated_failures: 18,
      });
      setInsights([
        { type: "Critical Risk", title: "Bearing failure pattern detected on P-101 class pumps", department: "Maintenance", time: "2 hours ago" }
      ]);
      setLessons([
        {
          id: "1",
          title: "Corrosion in Cooling Water Pipeline C-200",
          summary: "Repeated pinhole leaks observed in cooling water pipelines near the primary heat exchanger.",
          business_impact: "$45,000 in repair costs and partial shutdowns.",
          root_cause: "Localized galvanic corrosion due to dissimilar metals.",
          risk_score: 7.2,
          confidence_score: 0.98,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/lessons/analyze`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.new_insight) {
          setLessons(prev => [data.new_insight, ...prev]);
          setInsights(prev => [
            {
              type: "New Pattern Discovered",
              title: data.new_insight.title,
              department: "System",
              time: "Just now"
            },
            ...prev
          ]);
        }
      }
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center items-center h-full"><RefreshCw className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Lessons Learned Engine</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            AI-driven proactive failure intelligence across historical operations.
          </p>
        </div>
        <Button 
          onClick={triggerAnalysis} 
          disabled={isAnalyzing}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
        >
          {isAnalyzing ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Brain className="w-4 h-4 mr-2" />
          )}
          {isAnalyzing ? "Crunching 5 Years of Data..." : "Run AI Discovery"}
        </Button>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Total Lessons Discovered</div>
              <div className="text-2xl font-bold text-foreground">{metrics.total_lessons}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Critical Patterns Prevented</div>
              <div className="text-2xl font-bold text-destructive">{metrics.critical_lessons}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Preventive Actions Generated</div>
              <div className="text-2xl font-bold text-emerald-500">{metrics.preventive_recommendations}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Repeated Failures Flagged</div>
              <div className="text-2xl font-bold text-orange-500">{metrics.repeated_failures}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Lessons Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Historical Knowledge Base
          </h3>
          
          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <Card key={idx} className="bg-card/50 hover:bg-card border-border/60 transition-colors">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-foreground">{lesson.title}</h4>
                    <Badge variant={lesson.risk_score > 8 ? "destructive" : "warning"}>
                      Risk: {lesson.risk_score}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {lesson.summary}
                  </p>
                  
                  <div className="bg-secondary/40 rounded-lg p-3 text-xs space-y-2 mb-4 border border-border/50">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-foreground w-20 shrink-0">Root Cause:</span>
                      <span className="text-muted-foreground">{lesson.root_cause}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-foreground w-20 shrink-0">Impact:</span>
                      <span className="text-muted-foreground">{lesson.business_impact}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 
                      {(lesson.confidence_score * 100).toFixed(0)}% AI Confidence
                    </div>
                    {lesson.recommendations && (
                      <div className="flex items-center gap-1 text-blue-400">
                        <Zap className="w-3.5 h-3.5" /> {lesson.recommendations.length} Recommendations
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - Active Insights */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Live AI Intelligence
          </h3>
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${
                    insight.type.includes('Risk') || insight.type.includes('Pattern') ? 'bg-destructive' :
                    insight.type.includes('Quality') ? 'bg-orange-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      {insight.type} • {insight.time}
                    </div>
                    <div className="text-sm font-medium text-foreground leading-tight mb-2">
                      {insight.title}
                    </div>
                    <Badge variant="outline" className="text-[10px]">{insight.department}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
