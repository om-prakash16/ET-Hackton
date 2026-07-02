"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function HelpPage() {
  return (
    <AdminPageTemplate
      title="Help Center"
      description="Manage and configure help center for the platform."
      entityName="Article"
      columns={["Article Title","Category","Views","Last Updated"]}
    />
  );
}
