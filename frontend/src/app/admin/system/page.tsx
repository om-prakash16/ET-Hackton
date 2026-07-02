"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function SystemPage() {
  return (
    <AdminPageTemplate
      title="System Monitoring"
      description="Manage and configure system monitoring for the platform."
      entityName="Metric"
      columns={["Service","Status","Uptime","CPU/Memory"]}
    />
  );
}
