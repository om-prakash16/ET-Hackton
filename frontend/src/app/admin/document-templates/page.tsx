"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function DocumenttemplatesPage() {
  return (
    <AdminPageTemplate
      title="Document Templates"
      description="Manage and configure document templates for the platform."
      entityName="Template"
      columns={["Template Name","Type","Last Updated"]}
    />
  );
}
