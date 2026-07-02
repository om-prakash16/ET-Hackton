"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function BackupPage() {
  return (
    <AdminPageTemplate
      title="Backup & Restore"
      description="Manage and configure backup & restore for the platform."
      entityName="Backup"
      columns={["Backup ID","Type","Size","Status","Date"]}
    />
  );
}
