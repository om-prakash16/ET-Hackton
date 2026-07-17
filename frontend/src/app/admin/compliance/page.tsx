"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function CompliancePage() {
  return (
    <AdminPageTemplate
      title="Compliance & Audit"
      description="Manage enterprise governance, safety standards, and compliance audits."
      entityName="Compliance Report"
      columns={["Report ID","Regulatory Standard","Status","Generated Date"]}
    />
  );
}
