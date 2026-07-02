"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function LicensesPage() {
  return (
    <AdminPageTemplate
      title="Licenses"
      description="Manage and configure licenses for the platform."
      entityName="License"
      columns={["License Key","Type","Assigned To","Expires"]}
    />
  );
}
