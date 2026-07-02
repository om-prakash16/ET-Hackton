"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function AgentsPage() {
  return (
    <AdminPageTemplate
      title="AI Agents"
      description="Manage and configure ai agents for the platform."
      entityName="Agent"
      columns={["Agent Name","Type","Status","Tasks Completed"]}
    />
  );
}
