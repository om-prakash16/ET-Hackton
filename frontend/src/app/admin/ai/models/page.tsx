"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function ModelsPage() {
  return (
    <AdminPageTemplate
      title="AI Models"
      description="Manage and configure ai models for the platform."
      entityName="Model"
      columns={["Model Name","Provider","Status","Requests"]}
    />
  );
}
