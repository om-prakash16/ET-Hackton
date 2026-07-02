"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AssetcategoriesPage() {
  return (
    <AdminPageTemplate
      title="Asset Categories"
      description="Manage and configure asset categories for the platform."
      entityName="Category"
      columns={["Category Name","Assets Count","Description"]}
    />
  );
}
