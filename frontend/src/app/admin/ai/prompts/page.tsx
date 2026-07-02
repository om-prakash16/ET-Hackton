"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function PromptsPage() {
  return (
    <AdminPageTemplate
      title="Prompt Library"
      description="Manage and configure prompt library for the platform."
      entityName="Prompt"
      columns={["Prompt Name","Category","Version","Last Edited"]}
    />
  );
}
