import { Document, Investigation, ComplianceFramework, Violation, KPIMetric } from '@/types/intelliops';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    name: 'API-610 Centrifugal Pumps Manual.pdf',
    size: '14.2 MB',
    type: 'pdf',
    status: 'indexed',
    nodes: 342,
    uploadedAt: new Date('2026-03-10T08:30:00Z')
  },
  {
    id: 'doc-2',
    name: 'Visakhapatnam Plant P&ID - Section 5.dwg',
    size: '45.1 MB',
    type: 'dwg',
    status: 'indexed',
    nodes: 812,
    uploadedAt: new Date('2026-03-12T14:15:00Z')
  },
  {
    id: 'doc-3',
    name: 'Maintenance Log P-101A (2025-2026).xlsx',
    size: '2.4 MB',
    type: 'xlsx',
    status: 'processing',
    nodes: 120,
    uploadedAt: new Date('2026-06-25T11:00:00Z')
  },
  {
    id: 'doc-4',
    name: 'OISD-105 Safety & Fire Protection Guidelines.pdf',
    size: '8.7 MB',
    type: 'pdf',
    status: 'indexed',
    nodes: 512,
    uploadedAt: new Date('2026-02-18T10:00:00Z')
  },
  {
    id: 'doc-5',
    name: 'Pump Vibration Analysis Report Q3.docx',
    size: '1.2 MB',
    type: 'docx',
    status: 'failed',
    nodes: 0,
    uploadedAt: new Date('2026-06-24T17:45:00Z')
  },
  {
    id: 'doc-6',
    name: 'Incident Report - Mechanical Seal Failure.txt',
    size: '24 KB',
    type: 'txt',
    status: 'indexed',
    nodes: 89,
    uploadedAt: new Date('2026-05-02T09:30:00Z')
  }
];

export const MOCK_INVESTIGATIONS: Investigation[] = [
  {
    id: 'inv-1',
    assetId: 'P-101A',
    title: 'P-101A Mechanical Seal Failure',
    severity: 'critical',
    etaHours: 4,
    status: 'Active Root Cause Investigation',
    telemetry: [
      { label: 'Discharge Pressure', value: 3.2, unit: 'bar', delta: -15, status: 'critical' },
      { label: 'Seal Temperature', value: 82, unit: '°C', delta: 12, status: 'warning' },
      { label: 'Flow Rate', value: 98.2, unit: 'm³/h', delta: 0, status: 'normal' },
      { label: 'Vibration Level', value: 0.8, unit: 'mm/s', delta: 0, status: 'normal' }
    ]
  },
  {
    id: 'inv-2',
    assetId: 'C-502',
    title: 'C-502 High Vibration Warning',
    severity: 'warning',
    etaHours: null,
    status: 'Monitoring/Analyzing',
    telemetry: [
      { label: 'Discharge Pressure', value: 6.8, unit: 'bar', delta: 2, status: 'normal' },
      { label: 'Seal Temperature', value: 45, unit: '°C', delta: 1, status: 'normal' },
      { label: 'Flow Rate', value: 120.5, unit: 'm³/h', delta: -4, status: 'normal' },
      { label: 'Vibration Level', value: 4.8, unit: 'mm/s', delta: 45, status: 'warning' }
    ]
  },
  {
    id: 'inv-3',
    assetId: 'V-201',
    title: 'V-201 Temperature Anomaly',
    severity: 'monitoring',
    etaHours: null,
    status: 'Routine Telemetry Check',
    telemetry: [
      { label: 'Discharge Pressure', value: 1.1, unit: 'bar', delta: 0, status: 'normal' },
      { label: 'Seal Temperature', value: 58, unit: '°C', delta: 8, status: 'warning' },
      { label: 'Flow Rate', value: 0.0, unit: 'm³/h', delta: 0, status: 'normal' },
      { label: 'Vibration Level', value: 0.2, unit: 'mm/s', delta: 0, status: 'normal' }
    ]
  }
];

export const MOCK_VIOLATIONS: Violation[] = [
  {
    id: 'viol-1',
    severity: 'critical',
    title: 'Missing Mandatory Thickness Inspection',
    framework: 'PESO Guidelines',
    section: 'Section 4.2.1',
    description: 'Storage vessel V-201 has exceeded its 5-year non-destructive thickness testing interval.',
    detectedAt: new Date('2026-06-25T02:00:00Z')
  },
  {
    id: 'viol-2',
    severity: 'warning',
    title: 'Mismatched Flushing Fluid Protocol',
    framework: 'API Standard 610',
    section: 'Annex D - Plan 53A',
    description: 'P-101A is operating with standard glycol instead of the synthetic barrier fluid specified in the manual.',
    detectedAt: new Date('2026-06-24T18:30:00Z')
  },
  {
    id: 'viol-3',
    severity: 'info',
    title: 'Periodic Inspection Due',
    framework: 'Factory Act 1948',
    section: 'Section 21 - Safety Measures',
    description: 'Safety valves on primary containment units require routine recalibration verification by next week.',
    detectedAt: new Date('2026-06-25T06:45:00Z')
  }
];

export const MOCK_COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: 'frame-1',
    name: 'API Standard 610',
    score: 100,
    status: 'compliant',
    violations: []
  },
  {
    id: 'frame-2',
    name: 'OISD-105',
    score: 72,
    status: 'partial',
    violations: [MOCK_VIOLATIONS[1]]
  },
  {
    id: 'frame-3',
    name: 'Factory Act 1948',
    score: 98,
    status: 'compliant',
    violations: [MOCK_VIOLATIONS[2]]
  },
  {
    id: 'frame-4',
    name: 'PESO Guidelines',
    score: 85,
    status: 'review-needed',
    violations: [MOCK_VIOLATIONS[0]]
  }
];

export const MOCK_KPI_METRICS: KPIMetric[] = [
  {
    label: 'Documents Ingested',
    value: '14,302',
    trend: [12000, 12500, 13000, 13200, 13600, 13900, 14100, 14302],
    status: 'normal'
  },
  {
    label: 'Knowledge Nodes',
    value: '842.1K',
    trend: [600, 650, 700, 750, 780, 810, 830, 842.1],
    status: 'normal'
  },
  {
    label: 'GraphRAG Confidence',
    value: '98.4%',
    trend: [95, 96, 95.5, 96.8, 97.2, 97.8, 98.1, 98.4],
    status: 'normal'
  },
  {
    label: 'Compliance Score',
    value: '92/100',
    trend: [96, 95, 94, 94, 93, 91, 92, 92],
    status: 'warning'
  }
];
