"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function EmbeddingsPage() {
  return (
    <AdminPageTemplate
      title="Embeddings"
      description="Manage and configure embeddings for the platform."
      entityName="Model"
      columns={["Model Name","Dimension","Status"]}
    />
  );
}
