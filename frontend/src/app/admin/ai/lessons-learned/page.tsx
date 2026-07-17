"use client";

import React, { useEffect, useState } from "react";
import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";
import { Lightbulb, Brain, Activity, Target, ShieldAlert, AlertTriangle, ArrowRight, Loader2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LessonsLearnedPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/lessons");
      const data = await res.json();
      setLessons(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/lessons/analyze", {
        method: "POST",
      });
      const data = await res.json();
      if (data.new_insight) {
        setLessons((prev) => [data.new_insight, ...prev]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const headerAction = (
    <Button 
      onClick={handleRunAnalysis} 
      disabled={analyzing}
      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
    >
      {analyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
      {analyzing ? "Running Intelligence Engine..." : "Run Historical Analysis"}
    </Button>
  );

  return (
    <AdminPageTemplate
      title="Lessons Learned & Failure Intelligence Engine"
      description="Continuously analyze operational history, detect patterns, and predict future risks across all assets."
      headerIcon={Lightbulb}
      headerAction={headerAction}
    >
      
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 text-emerald-400 mb-2">
            <Activity className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Total Patterns Discovered</h3>
          </div>
          <p className="text-3xl font-bold text-white">{lessons.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 text-rose-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Critical Risk Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-white">{lessons.filter(l => l.risk_score >= 8.0).length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 text-indigo-400 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Preventive Actions Auto-Generated</h3>
          </div>
          <p className="text-3xl font-bold text-white">{lessons.reduce((acc, l) => acc + (l.preventive_actions?.length || 0), 0)}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {lessons.map((lesson, idx) => (
            <div key={idx} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{lesson.title}</h2>
                    <p className="text-zinc-400 text-sm">{lesson.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center">
                      Risk: {lesson.risk_score}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center">
                      Confidence: {(lesson.confidence_score * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Root Cause</h3>
                    <p className="text-zinc-300 text-sm">{lesson.root_cause}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Business Impact</h3>
                    <p className="text-emerald-400 text-sm">{lesson.business_impact}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Contributing Factors
                  </h3>
                  <ul className="space-y-2">
                    {lesson.contributing_factors?.map((factor: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-zinc-600" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                    <Wrench className="w-4 h-4 text-emerald-400" />
                    Recommended Preventive Actions
                  </h3>
                  <div className="space-y-3">
                    {lesson.preventive_actions?.map((action: string, i: number) => (
                      <div key={i} className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                        <p className="text-sm text-emerald-300">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPageTemplate>
  );
}
