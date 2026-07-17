"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, AlertTriangle, Lightbulb, Wrench, FileText, Download, Share2, MessageSquare, Loader2, Link as LinkIcon, Target, Activity, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TenantLessonsLearnedPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackState, setFeedbackState] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/lessons")
      .then(r => r.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleFeedback = async (lessonId: string, action: string) => {
    try {
      await fetch(`http://localhost:8000/api/v1/recommendations/${lessonId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      setFeedbackState(prev => ({ ...prev, [lessonId]: action }));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" /> Lessons Learned
          </h1>
          <p className="text-zinc-400">AI-generated operational lessons specific to your organization.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Target className="w-4 h-4 mr-2" /> Assign Actions
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-semibold">ID: LSN-{lesson.id || 'AUTO'}</span>
                  <span className="text-xs text-zinc-500">{lesson.created_at || 'Just Now'}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{lesson.title}</h2>
                <p className="text-zinc-400 text-sm">{lesson.summary}</p>
              </div>
              <div className="flex gap-2 flex-col items-end">
                <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                  Risk: {lesson.risk_score}
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                  Confidence: {lesson.confidence_score ? (lesson.confidence_score * 100).toFixed(0) : 95}%
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" /> Root Cause
                </h3>
                <p className="text-zinc-300 text-sm">{lesson.root_cause}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" /> Business Impact
                </h3>
                <p className="text-zinc-300 text-sm">{lesson.business_impact}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-indigo-400" /> Recommendations
                </h3>
                <ul className="space-y-2">
                  {lesson.recommendations?.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-indigo-400 mt-0.5">•</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" /> Preventive Actions
                </h3>
                <ul className="space-y-2">
                  {lesson.preventive_actions?.map((action: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-emerald-400 mt-0.5">•</span> {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                  <FileText className="w-3.5 h-3.5" /> View SOPs
                </button>
                <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                  <LinkIcon className="w-3.5 h-3.5" /> Graph Links
                </button>
              </div>
              <div className="flex gap-2">
                {feedbackState[lesson.id] === 'ACCEPTED' ? (
                  <span className="px-3 py-1.5 flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-lg">
                    <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> AI Updated
                  </span>
                ) : feedbackState[lesson.id] === 'REJECTED' ? (
                  <span className="px-3 py-1.5 flex items-center text-xs font-bold text-rose-400 bg-rose-500/10 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> AI Corrected
                  </span>
                ) : (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleFeedback(lesson.id || 'LSN-1', 'REJECTED')}
                      className="h-8 border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
                    >
                      Reject AI
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleFeedback(lesson.id || 'LSN-1', 'ACCEPTED')}
                      className="h-8 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      Accept AI
                    </Button>
                  </>
                )}
                <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white ml-2">
                  Create Work Order
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
