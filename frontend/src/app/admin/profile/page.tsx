"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function ProfilePage() {
  return (
    <AdminPageTemplate
      title="Profile Settings"
      description="Manage and configure profile settings for the platform."
      entityName="Preference"
      columns={["Setting","Value"]}
    />
  );
}
