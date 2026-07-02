"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AnalyticsPage() {
  return (
    <AdminPageTemplate
      title="Analytics"
      description="Manage and configure analytics for the platform."
      entityName="Dashboard"
      columns={["Dashboard Name","Views","Last Updated"]}
    />
  );
}
