"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function DocumentcategoriesPage() {
  return (
    <AdminPageTemplate
      title="Document Categories"
      description="Manage and configure document categories for the platform."
      entityName="Category"
      columns={["Name","Description","Documents Count"]}
    />
  );
}
