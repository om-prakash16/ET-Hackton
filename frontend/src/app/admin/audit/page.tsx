"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AuditPage() {
  return (
    <AdminPageTemplate
      title="Audit Logs"
      description="Manage and configure audit logs for the platform."
      entityName="Log Entry"
      columns={["Action","User","Resource","IP Address","Timestamp"]}
    />
  );
}
