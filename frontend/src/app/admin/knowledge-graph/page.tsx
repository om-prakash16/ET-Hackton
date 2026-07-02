"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function KnowledgegraphPage() {
  return (
    <AdminPageTemplate
      title="Knowledge Graph"
      description="Manage and configure knowledge graph for the platform."
      entityName="Node"
      columns={["Node ID","Label","Connections","Last Updated"]}
    />
  );
}
