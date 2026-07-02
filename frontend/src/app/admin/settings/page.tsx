"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function SettingsPage() {
  return (
    <AdminPageTemplate
      title="Settings"
      description="Manage and configure settings for the platform."
      entityName="Setting"
      columns={["Category","Description","Last Modified"]}
    />
  );
}
