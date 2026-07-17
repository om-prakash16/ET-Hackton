"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function CriticalPage() {
  return (
    <AdminPageTemplate
      title="Critical Alerts"
      description="Real-time monitoring of critical factory anomalies and high-severity alarms."
      entityName="Alert"
      columns={["Alert ID","Severity","Asset","Timestamp","Status"]}
    />
  );
}
