"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function BillingPage() {
  return (
    <AdminPageTemplate
      title="Billing"
      description="Manage and configure billing for the platform."
      entityName="Invoice"
      columns={["Invoice ID","Amount","Status","Date"]}
    />
  );
}
