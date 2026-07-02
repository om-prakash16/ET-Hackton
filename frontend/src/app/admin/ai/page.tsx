"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AiPage() {
  return (
    <AdminPageTemplate
      title="AI Center"
      description="Manage and configure ai center for the platform."
      entityName="Configuration"
      columns={["Module","Status","Usage","Cost"]}
    />
  );
}
