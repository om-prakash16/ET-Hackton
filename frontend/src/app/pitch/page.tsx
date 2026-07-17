"use client";

import React, { useState, useEffect } from "react";
import { 
  Brain, FileWarning, Network, TrendingDown, Database, Zap
} from "lucide-react";

const SLIDES = [
  {
    id: "title",
    title: "IndusBrain AI",
    subtitle: "Industrial Knowledge Intelligence Platform",
    description: "Built by Team Nexis for the ET AI Hackathon 2.0",
    icon: Brain,
    color: "blue",
    points: []
  },
  {
    id: "problem",
    title: "The Industry Problem",
    subtitle: "Data Silos & Catastrophic Downtime",
    description: "Heavy industries lose millions of dollars every year due to fragmented data.",
    icon: FileWarning,
    color: "red",
    points: [
      "Critical knowledge is trapped in unstructured OEM manuals and PDFs.",
      "Engineers waste up to 35% of their time just searching for information.",
      "Manual root cause analysis delays repairs and introduces severe safety risks."
    ]
  },
  {
    id: "solution",
    title: "The Solution: GraphRAG Copilot",
    subtitle: "A Unified Enterprise Brain",
    description: "IndusBrain bridges the gap between legacy paperwork and modern AI.",
    icon: Network,
    color: "purple",
    points: [
      "Universal OCR Pipeline digitizes decades of physical blueprints and logs.",
      "GraphRAG combines Vector Search with a physical asset Knowledge Graph.",
      "100% Explainable AI: Every answer cites the exact page in the OEM manual."
    ]
  },
  {
    id: "architecture",
    title: "Enterprise Architecture",
    subtitle: "Secure, Multi-Tenant, and Scalable",
    description: "Built for massive industrial scale.",
    icon: Database,
    color: "emerald",
    points: [
      "Strict Role-Based Access Control (RBAC) separates Operators from Global Admins.",
      "Isolated multi-tenant data silos for B2B deployments.",
      "Live Integration Hub synchronizes with existing IoT SCADA systems."
    ]
  },
  {
    id: "impact",
    title: "Business Impact & ROI",
    subtitle: "Why IndusBrain matters to the bottom line.",
    description: "Turning AI into actionable financial savings.",
    icon: TrendingDown,
    color: "amber",
    points: [
      "60% Reduction in Mean Time to Resolution (MTTR).",
      "Automated compliance tracking to prevent massive regulatory fines.",
      "Permanent retention of retiring engineers' 'tribal knowledge'."
    ]
  },
  {
    id: "conclusion",
    title: "Thank You",
    subtitle: "We are Team Nexis.",
    description: "Ready to revolutionize industrial operations.",
    icon: Zap,
    color: "blue",
    points: []
  }
];

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? prev : prev + 1));
      }, 5000); // 5 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-[#050914] text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-${slide.color}-500/20 blur-[120px] rounded-full transition-colors duration-1000 opacity-50`}></div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-8">
        <div key={currentSlide} className="max-w-4xl w-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
          
          <div className={`w-24 h-24 rounded-2xl bg-${slide.color}-500/20 border border-${slide.color}-500/30 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(var(--${slide.color}-500),0.3)]`}>
            <Icon className={`w-12 h-12 text-${slide.color}-400`} />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            {slide.title}
          </h1>
          
          <h2 className={`text-2xl md:text-3xl font-medium text-${slide.color}-400 mb-6`}>
            {slide.subtitle}
          </h2>
          
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl">
            {slide.description}
          </p>
          
          {slide.points.length > 0 && (
            <div className="grid gap-4 w-full text-left max-w-3xl">
              {slide.points.map((point, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-4 backdrop-blur-sm">
                  <div className={`w-3 h-3 rounded-full bg-${slide.color}-500 shadow-[0_0_10px_rgba(var(--${slide.color}-500),0.8)]`} />
                  <span className="text-lg md:text-xl font-medium text-zinc-100">{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
