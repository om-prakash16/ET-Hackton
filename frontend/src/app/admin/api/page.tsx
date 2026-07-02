"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function ApiPage() {
  return (
    <AdminPageTemplate
      title="API Management"
      description="Manage and configure api management for the platform."
      entityName="API Key"
      columns={["Key Name","Owner","Status","Last Used"]}
    />
  );
}
