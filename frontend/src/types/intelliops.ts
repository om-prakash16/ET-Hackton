export interface Document {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'dwg' | 'xlsx' | 'docx' | 'txt';
  status: 'indexed' | 'processing' | 'failed';
  nodes: number;
  uploadedAt: Date;
}

export interface TelemetryReading {
  label: string;
  value: number;
  unit: string;
  delta: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface Investigation {
  id: string;
  assetId: string;
  title: string;
  severity: 'critical' | 'warning' | 'monitoring';
  etaHours: number | null;
  status: string;
  telemetry: TelemetryReading[];
}

export interface Violation {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  framework: string;
  section: string;
  description: string;
  detectedAt: Date;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  score: number;
  status: 'compliant' | 'partial' | 'review-needed';
  violations: Violation[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: Date;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  trend: number[];
  unit?: string;
  status: 'normal' | 'warning' | 'critical';
}
