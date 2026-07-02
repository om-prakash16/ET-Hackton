"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function VectordbPage() {
  return (
    <AdminPageTemplate
      title="Vector Database"
      description="Manage and configure vector database for the platform."
      entityName="Collection"
      columns={["Collection Name","Vectors Count","Dimension","Size"]}
    />
  );
}
