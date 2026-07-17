"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Search, Filter, Loader2, CheckCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KnowledgeArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/knowledge")
      .then(r => r.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-emerald-500" /> Knowledge Articles
          </h1>
          <p className="text-slate-400">AI-synthesized organizational memory and standards.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search articles..."
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button variant="outline" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col transition-all hover:border-slate-600">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wide uppercase">
                {article.category}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                article.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {article.status === 'PUBLISHED' && <CheckCircle className="w-3 h-3" />}
                {article.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3 leading-tight">{article.title}</h2>
            <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
              {article.summary}
            </p>
            <div className="border-t border-slate-800 pt-4 mt-auto">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Author: <span className="text-slate-300 font-medium">{article.author}</span></span>
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                  AI Conf: {(article.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
