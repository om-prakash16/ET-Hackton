"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function SecurityPage() {
  return (
    <AdminPageTemplate
      title="Security Center"
      description="Manage and configure security center for the platform."
      entityName="Policy"
      columns={["Policy Name","Severity","Status","Last Triggered"]}
    />
  );
}
