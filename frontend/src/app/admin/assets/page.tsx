"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AssetsPage() {
  return (
    <AdminPageTemplate
      title="Assets"
      description="Manage and configure assets for the platform."
      entityName="Asset"
      columns={["Asset ID","Name","Category","Status"]}
    />
  );
}
