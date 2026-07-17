"use client";

import React, { useEffect, useState } from "react";
import { MonitorSmartphone, Activity, Zap, ServerCrash, ThermometerSun, AlertTriangle, CheckCircle2, Play, Brain, Settings } from "lucide-react";

export default function DigitalTwinDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulation State
  const [simulating, setSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState<any>(null);

  const fetchData = () => {
    fetch("http://localhost:8000/api/v1/digital-twin/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerSimulation = async () => {
    setSimulating(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/digital-twin/simulate-anomaly", { method: "POST" });
      const result = await res.json();
      setSimulationData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Activity className="w-8 h-8 text-blue-500 animate-pulse" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MonitorSmartphone className="w-8 h-8 text-blue-500" /> Digital Twin Command Center
          </h1>
          <p className="text-slate-400">Real-time IoT telemetry fused with Gemini predictive reasoning.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold border border-emerald-500/20">
          <Activity className="w-4 h-4 animate-pulse" /> SCADA Link Active
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <ServerCrash className="w-4 h-4 text-blue-400" /> Assets Online
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.assets_online}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Activity className="w-4 h-4 text-indigo-400" /> Sensors Active
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.sensors_active}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Critical Alerts
          </div>
          <p className="text-3xl font-bold text-rose-400 mb-1">{data.metrics.critical_alerts}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Zap className="w-4 h-4 text-amber-400" /> Energy Usage (kW)
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.energy_consumption_kw}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Asset Telemetry */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MonitorSmartphone className="w-5 h-5 text-blue-500" /> Live Asset Telemetry
            </h2>
          </div>
          
          <div className="space-y-4">
            {data.twins.map((twin: any) => (
              <div key={twin.id} className={`p-5 border rounded-xl transition-all ${
                simulationData && simulationData.twin_id === twin.id 
                  ? 'bg-rose-500/10 border-rose-500/50 animate-pulse' 
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Settings className={`w-5 h-5 ${simulationData && simulationData.twin_id === twin.id ? 'text-rose-500 animate-spin-fast' : 'text-slate-400 animate-spin-slow'}`} />
                      {twin.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">{twin.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-400">Health</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      simulationData && simulationData.twin_id === twin.id 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {simulationData && simulationData.twin_id === twin.id ? '42%' : twin.health + '%'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Vibration</p>
                    <p className={`text-xl font-bold font-mono ${
                      simulationData && simulationData.twin_id === twin.id ? 'text-rose-400' : 'text-white'
                    }`}>
                      {simulationData && simulationData.twin_id === twin.id ? simulationData.simulated_telemetry.vibration_mm : twin.telemetry.vibration_mm} <span className="text-sm text-slate-600">mm/s</span>
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Bearing Temp</p>
                    <p className={`text-xl font-bold font-mono flex items-center gap-2 ${
                      simulationData && simulationData.twin_id === twin.id ? 'text-rose-400' : 'text-white'
                    }`}>
                      <ThermometerSun className="w-4 h-4" />
                      {simulationData && simulationData.twin_id === twin.id ? simulationData.simulated_telemetry.bearing_temp_c : twin.telemetry.bearing_temp_c}°C
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      {twin.telemetry.flow_rate_m3 ? 'Flow Rate' : 'Pressure'}
                    </p>
                    <p className="text-xl font-bold font-mono text-white">
                      {twin.telemetry.flow_rate_m3 || twin.telemetry.pressure_bar} <span className="text-sm text-slate-600">{twin.telemetry.flow_rate_m3 ? 'm³/h' : 'bar'}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prediction Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[550px]">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" /> AI Predictive Intelligence
          </h2>
          <p className="text-xs text-slate-400 mb-6">Gemini continuously analyzes live telemetry against historical failures.</p>
          
          <div className="flex-1 space-y-4">
            
            {simulationData ? (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                  <AlertTriangle className="w-4 h-4 animate-pulse" /> PREDICTIVE ALERT
                </div>
                <h3 className="text-white font-bold mb-2">{simulationData.ai_prediction.event}</h3>
                <p className="text-sm text-slate-300 mb-3">{simulationData.ai_prediction.prediction}</p>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-rose-500/20 text-xs text-slate-400 font-mono mb-3">
                  {simulationData.ai_prediction.knowledge_match}
                </div>
                <div className="text-sm font-bold text-emerald-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  {simulationData.ai_prediction.recommendation}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-xl">
                <Activity className="w-12 h-12 text-slate-700 mb-4" />
                <p className="text-slate-400 text-sm mb-6">Monitoring 1,250 sensors across 142 assets. No catastrophic patterns detected currently.</p>
                
                <button 
                  onClick={triggerSimulation}
                  disabled={simulating}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" /> Simulate SCADA Alert
                </button>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
