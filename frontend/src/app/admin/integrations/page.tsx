"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function IntegrationsPage() {
  return (
    <AdminPageTemplate
      title="Integrations"
      description="Manage and configure integrations for the platform."
      entityName="Integration"
      columns={["Service","Status","Sync Frequency","Last Sync"]}
    />
  );
}
