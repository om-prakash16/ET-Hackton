"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function FeaturesPage() {
  return (
    <AdminPageTemplate
      title="Feature Flags"
      description="Manage and configure feature flags for the platform."
      entityName="Flag"
      columns={["Feature Name","Key","Status","Rollout %"]}
    />
  );
}
