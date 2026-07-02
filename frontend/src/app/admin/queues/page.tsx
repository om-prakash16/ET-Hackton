"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function QueuesPage() {
  return (
    <AdminPageTemplate
      title="Queues"
      description="Manage and configure queues for the platform."
      entityName="Queue"
      columns={["Queue Name","Pending","Processed","Failed"]}
    />
  );
}
