import { 
  LayoutDashboard, Building2, Users, Database, ShieldAlert, 
  Settings, Activity, Cpu, FileText, CheckSquare, BarChart3, 
  PenTool, Wrench, Thermometer, Camera, Eye, HardDrive, 
  AlertTriangle, ClipboardCheck, Network, Search
} from "lucide-react-native";

export type RoleId = 
  | "admin" 
  | "plant" 
  | "operations" 
  | "maintenance-manager" 
  | "maintenance" 
  | "reliability" 
  | "quality-manager" 
  | "quality" 
  | "safety" 
  | "production" 
  | "technician" 
  | "auditor" 
  | "contractor" 
  | "viewer";

export interface NavItem {
  label: string;
  icon: any;
  href: string;
  badge?: string;
  badgeType?: "success" | "warning" | "destructive" | "default";
}

export interface WidgetDef {
  type: "kpi" | "chart" | "ai-insight" | "activity-feed" | "quick-actions";
  title?: string;
  data?: any;
  span?: 1 | 2 | 3;
}

export interface RoleConfig {
  id: RoleId;
  name: string;
  navItems: NavItem[];
  widgets: WidgetDef[];
  permissions: string[];
}

export const ROLES: Record<RoleId, RoleConfig> = {
  "admin": {
    id: "admin",
    name: "Organization Admin",
    permissions: ["all"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/admin/dashboard" },
      { label: "Plants", icon: Building2, href: "/workspace/admin/plants" },
      { label: "Users", icon: Users, href: "/workspace/admin/users" },
      { label: "Departments", icon: Network, href: "/workspace/admin/departments" },
      { label: "Asset Health", icon: Activity, href: "/workspace/admin/assets", badge: "Critical", badgeType: "destructive" },
      { label: "Compliance", icon: ShieldAlert, href: "/workspace/admin/compliance" },
      { label: "Maintenance", icon: Wrench, href: "/workspace/admin/maintenance" },
      { label: "AI Insights", icon: Cpu, href: "/workspace/admin/ai" },
    ],
    widgets: [
      { type: "kpi", title: "Total Users", data: { value: "1,248" }, span: 1 },
      { type: "kpi", title: "Active Plants", data: { value: "12" }, span: 1 },
      { type: "kpi", title: "Asset Health Score", data: { value: "88%" }, span: 1 },
      { type: "kpi", title: "Open Incidents", data: { value: "4" }, span: 1 },
      { type: "chart", title: "Organization Activity", span: 2 },
      { type: "ai-insight", title: "AI Recommendations", span: 1 }
    ]
  },
  "plant": {
    id: "plant",
    name: "Plant Head",
    permissions: ["view:plant", "approve:maintenance"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/plant/dashboard" },
      { label: "Plant Overview", icon: Building2, href: "/workspace/plant/overview" },
      { label: "Asset Health", icon: Activity, href: "/workspace/plant/assets" },
      { label: "Production", icon: BarChart3, href: "/workspace/plant/production" },
      { label: "Maintenance", icon: Wrench, href: "/workspace/plant/maintenance" },
      { label: "Incidents", icon: AlertTriangle, href: "/workspace/plant/incidents", badge: "2", badgeType: "warning" },
      { label: "Quality", icon: CheckSquare, href: "/workspace/plant/quality" },
    ],
    widgets: [
      { type: "kpi", title: "OEE", data: { value: "85%" }, span: 1 },
      { type: "kpi", title: "Production Output", data: { value: "12,400 units" }, span: 1 },
      { type: "kpi", title: "Downtime", data: { value: "4.2 hrs" }, span: 1 },
      { type: "kpi", title: "Safety Incidents", data: { value: "0" }, span: 1 },
      { type: "quick-actions", title: "Quick Actions", span: 1 },
      { type: "chart", title: "Plant Performance", span: 2 }
    ]
  },
  "operations": {
    id: "operations",
    name: "Operations Manager",
    permissions: ["view:operations", "manage:shift"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/operations/dashboard" },
      { label: "Live Operations", icon: Activity, href: "/workspace/operations/live" },
      { label: "Equipment Status", icon: HardDrive, href: "/workspace/operations/equipment" },
      { label: "Shift Performance", icon: Users, href: "/workspace/operations/shifts" },
      { label: "Open Incidents", icon: AlertTriangle, href: "/workspace/operations/incidents" },
      { label: "AI Copilot", icon: Cpu, href: "/workspace/operations/copilot" },
    ],
    widgets: [
      { type: "kpi", title: "Availability", data: { value: "94%" }, span: 1 },
      { type: "kpi", title: "Efficiency", data: { value: "91%" }, span: 1 },
      { type: "kpi", title: "Shift Score", data: { value: "A-" }, span: 1 },
      { type: "kpi", title: "Downtime", data: { value: "1.2 hrs" }, span: 1 },
      { type: "chart", title: "Production vs Target", span: 2 }
    ]
  },
  "maintenance-manager": {
    id: "maintenance-manager",
    name: "Maintenance Manager",
    permissions: ["view:maintenance", "assign:engineers", "approve:maintenance"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/maintenance-manager/dashboard" },
      { label: "Work Orders", icon: FileText, href: "/workspace/maintenance-manager/orders", badge: "14", badgeType: "default" },
      { label: "Calendar", icon: CheckSquare, href: "/workspace/maintenance-manager/calendar" },
      { label: "Predictions", icon: Activity, href: "/workspace/maintenance-manager/predictions" },
      { label: "Asset Health", icon: Thermometer, href: "/workspace/maintenance-manager/assets" },
    ],
    widgets: [
      { type: "kpi", title: "Pending Work Orders", data: { value: "14" }, span: 1 },
      { type: "kpi", title: "Completed Today", data: { value: "8" }, span: 1 },
      { type: "kpi", title: "Predictive Alerts", data: { value: "2" }, span: 1 },
      { type: "kpi", title: "PM Compliance", data: { value: "98%" }, span: 1 },
      { type: "activity-feed", title: "Recent Maintenance", span: 2 }
    ]
  },
  "maintenance": {
    id: "maintenance",
    name: "Maintenance Engineer",
    permissions: ["complete:work-order", "generate:rca"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/maintenance/dashboard" },
      { label: "My Jobs", icon: Wrench, href: "/workspace/maintenance/jobs", badge: "3", badgeType: "warning" },
      { label: "Assets", icon: Database, href: "/workspace/maintenance/assets" },
      { label: "Manuals", icon: FileText, href: "/workspace/maintenance/manuals" },
      { label: "AI Copilot", icon: Cpu, href: "/workspace/maintenance/copilot" },
    ],
    widgets: [
      { type: "quick-actions", title: "Quick Actions (QR/Camera)", span: 1 },
      { type: "activity-feed", title: "Today's Tasks", span: 2 },
      { type: "ai-insight", title: "AI Assistant", span: 1 }
    ]
  },
  "reliability": {
    id: "reliability",
    name: "Reliability Engineer",
    permissions: ["analyze:failures", "predict:failures"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/reliability/dashboard" },
      { label: "Failure Analytics", icon: Activity, href: "/workspace/reliability/analytics" },
      { label: "Predictive Maintenance", icon: Wrench, href: "/workspace/reliability/predictive" },
      { label: "AI Predictions", icon: Cpu, href: "/workspace/reliability/ai" },
    ],
    widgets: [
      { type: "kpi", title: "MTBF", data: { value: "480 hrs" }, span: 1 },
      { type: "kpi", title: "MTTR", data: { value: "2.4 hrs" }, span: 1 },
      { type: "kpi", title: "RUL Alerts", data: { value: "5" }, span: 1 },
      { type: "chart", title: "Failure Trends", span: 2 }
    ]
  },
  "quality-manager": {
    id: "quality-manager",
    name: "Quality Manager",
    permissions: ["approve:capa", "assign:ncr"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/quality-manager/dashboard" },
      { label: "NCR", icon: AlertTriangle, href: "/workspace/quality-manager/ncr" },
      { label: "CAPA", icon: ClipboardCheck, href: "/workspace/quality-manager/capa" },
      { label: "Audits", icon: CheckSquare, href: "/workspace/quality-manager/audits" },
    ],
    widgets: [
      { type: "kpi", title: "Open NCRs", data: { value: "12" }, span: 1 },
      { type: "kpi", title: "Pending CAPA", data: { value: "4" }, span: 1 },
      { type: "kpi", title: "Audit Score", data: { value: "96%" }, span: 1 },
      { type: "chart", title: "Quality Trends", span: 2 }
    ]
  },
  "quality": {
    id: "quality",
    name: "Quality Engineer",
    permissions: ["resolve:ncr", "upload:evidence"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/quality/dashboard" },
      { label: "Inspections", icon: CheckSquare, href: "/workspace/quality/inspections" },
      { label: "NCR", icon: AlertTriangle, href: "/workspace/quality/ncr" },
      { label: "AI Assistant", icon: Cpu, href: "/workspace/quality/ai" },
    ],
    widgets: [
      { type: "activity-feed", title: "My Inspections", span: 2 },
      { type: "quick-actions", title: "Upload Evidence", span: 1 }
    ]
  },
  "safety": {
    id: "safety",
    name: "Safety Officer",
    permissions: ["create:incident", "investigate"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/safety/dashboard" },
      { label: "Incidents", icon: ShieldAlert, href: "/workspace/safety/incidents" },
      { label: "Near Miss", icon: AlertTriangle, href: "/workspace/safety/near-miss" },
      { label: "Permit To Work", icon: FileText, href: "/workspace/safety/ptw" },
    ],
    widgets: [
      { type: "kpi", title: "Safety Score", data: { value: "99.8%" }, span: 1 },
      { type: "kpi", title: "Near Misses", data: { value: "3" }, span: 1 },
      { type: "kpi", title: "LTI Days", data: { value: "0" }, span: 1 },
      { type: "chart", title: "Risk Assessment", span: 2 }
    ]
  },
  "production": {
    id: "production",
    name: "Production Manager",
    permissions: ["assign:tasks"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/production/dashboard" },
      { label: "Shift Output", icon: BarChart3, href: "/workspace/production/shifts" },
      { label: "Machines", icon: HardDrive, href: "/workspace/production/machines" },
      { label: "Downtime Logs", icon: Activity, href: "/workspace/production/downtime" },
    ],
    widgets: [
      { type: "kpi", title: "OEE", data: { value: "82%" }, span: 1 },
      { type: "kpi", title: "Yield", data: { value: "98.5%" }, span: 1 },
      { type: "kpi", title: "Throughput", data: { value: "1.2k/hr" }, span: 1 },
      { type: "chart", title: "Production History", span: 2 }
    ]
  },
  "technician": {
    id: "technician",
    name: "Technician",
    permissions: ["complete:jobs", "upload:images"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/technician/dashboard" },
      { label: "My Jobs", icon: Wrench, href: "/workspace/technician/jobs" },
      { label: "QR Scanner", icon: Camera, href: "/workspace/technician/scanner" },
      { label: "AI Assistant", icon: Cpu, href: "/workspace/technician/ai" },
    ],
    widgets: [
      { type: "quick-actions", title: "Actions", span: 1 },
      { type: "activity-feed", title: "Today's Tasks", span: 2 }
    ]
  },
  "auditor": {
    id: "auditor",
    name: "Auditor",
    permissions: ["create:audit", "upload:evidence"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/auditor/dashboard" },
      { label: "Audits", icon: ClipboardCheck, href: "/workspace/auditor/audits" },
      { label: "Evidence", icon: FileText, href: "/workspace/auditor/evidence" },
      { label: "Findings", icon: AlertTriangle, href: "/workspace/auditor/findings" },
    ],
    widgets: [
      { type: "kpi", title: "Active Audits", data: { value: "2" }, span: 1 },
      { type: "kpi", title: "Findings", data: { value: "8" }, span: 1 },
      { type: "activity-feed", title: "Audit Trail", span: 2 }
    ]
  },
  "contractor": {
    id: "contractor",
    name: "Contractor",
    permissions: ["complete:assigned"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/contractor/dashboard" },
      { label: "Assigned Jobs", icon: Wrench, href: "/workspace/contractor/jobs" },
      { label: "Safety Docs", icon: ShieldAlert, href: "/workspace/contractor/safety" },
    ],
    widgets: [
      { type: "kpi", title: "Jobs Today", data: { value: "4" }, span: 1 },
      { type: "activity-feed", title: "Assigned Work Orders", span: 2 }
    ]
  },
  "viewer": {
    id: "viewer",
    name: "Viewer",
    permissions: ["view"],
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/workspace/viewer/dashboard" },
      { label: "Reports", icon: BarChart3, href: "/workspace/viewer/reports" },
      { label: "Documents", icon: FileText, href: "/workspace/viewer/documents" },
      { label: "AI Search", icon: Search, href: "/workspace/viewer/search" },
    ],
    widgets: [
      { type: "chart", title: "Overview", span: 3 }
    ]
  }
};
