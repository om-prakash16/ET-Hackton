"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function JobsPage() {
  return (
    <AdminPageTemplate
      title="Background Jobs"
      description="Manage and configure background jobs for the platform."
      entityName="Job"
      columns={["Job ID","Type","Status","Duration","Started"]}
    />
  );
}
