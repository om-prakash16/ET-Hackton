import React, { useState, useEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
const GridLayoutAny = GridLayout as any;
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { KPICardWidget } from './widgets/KPICardWidget';
import { AIBriefingWidget } from './widgets/AIBriefingWidget';
import { AssetHealthWidget } from './widgets/AssetHealthWidget';
import { MaintenanceTrendWidget } from './widgets/MaintenanceTrendWidget';
import { RecentFailuresWidget } from './widgets/RecentFailuresWidget';
import { RefreshCw, Save } from 'lucide-react';

export function DashboardPanel() {
  const [layout, setLayout] = useState([
    { i: 'AIBriefing', x: 0, y: 0, w: 12, h: 2 },
    { i: 'KPIGrid', x: 0, y: 2, w: 12, h: 2 },
    { i: 'AssetHealth', x: 0, y: 4, w: 6, h: 4 },
    { i: 'MaintenanceTrend', x: 6, y: 4, w: 6, h: 4 },
    { i: 'RecentFailures', x: 0, y: 8, w: 12, h: 3 },
  ]);

  const [isDraggable, setIsDraggable] = useState(true);
  const [telemetryBuffer, setTelemetryBuffer] = useState<any[]>([]);
  const [liveAlerts, setLiveAlerts] = useState<any[]>([]);
  
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/api/v1/telemetry/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'telemetry') {
        setTelemetryBuffer(prev => {
          const newBuffer = [...prev, data];
          return newBuffer.slice(-100);
        });
      } else if (data.type === 'alert') {
        setLiveAlerts(prev => [data, ...prev].slice(0, 10));
      }
    };
    
    wsRef.current = ws;
    return () => ws.close();
  }, []);

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const saveLayout = async () => {
    // Integrate with POST /api/v1/dashboard/layout
    alert('Dashboard layout saved successfully!');
  };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full pb-20">
      {/* Dashboard Toolbar */}
      <div className="flex items-center justify-between bg-deep/50 border border-subtle p-3 rounded-xl backdrop-blur-md">
        <h2 className="text-lg font-bold text-primary px-2">Industrial Command Center</h2>
        <div className="flex items-center gap-2">
          <button 
            className="btn-ghost flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg"
            onClick={() => setIsDraggable(!isDraggable)}
          >
            {isDraggable ? 'Lock Layout' : 'Unlock Layout'}
          </button>
          <button 
            className="bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/20 transition-all flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg font-semibold"
            onClick={saveLayout}
          >
            <Save className="w-3.5 h-3.5" />
            Save Layout
          </button>
        </div>
      </div>

      {/* Grid Engine */}
      <GridLayoutAny
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={isDraggable}
        isResizable={isDraggable}
        draggableHandle=".widget-drag-handle"
        margin={[16, 16]}
      >
        <div key="AIBriefing" className="glass-card overflow-hidden">
          <AIBriefingWidget liveAlerts={liveAlerts} />
        </div>
        <div key="KPIGrid" className="glass-card overflow-hidden">
          <KPICardWidget />
        </div>
        <div key="AssetHealth" className="glass-card overflow-hidden">
          <AssetHealthWidget liveData={telemetryBuffer} />
        </div>
        <div key="MaintenanceTrend" className="glass-card overflow-hidden">
          <MaintenanceTrendWidget />
        </div>
        <div key="RecentFailures" className="glass-card overflow-hidden">
          <RecentFailuresWidget />
        </div>
      </GridLayoutAny>
    </div>
  );
}
