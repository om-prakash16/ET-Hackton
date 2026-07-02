"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function StoragePage() {
  return (
    <AdminPageTemplate
      title="Storage"
      description="Manage and configure storage for the platform."
      entityName="Bucket"
      columns={["Bucket Name","Size","Object Count","Region"]}
    />
  );
}
