"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function DocumentsPage() {
  return (
    <AdminPageTemplate
      title="Documents"
      description="Manage and configure documents for the platform."
      entityName="Document"
      columns={["Document ID","Title","Category","Status","Date"]}
    />
  );
}
