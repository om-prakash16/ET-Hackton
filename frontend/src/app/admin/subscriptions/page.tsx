"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function SubscriptionsPage() {
  return (
    <AdminPageTemplate
      title="Subscriptions"
      description="Manage and configure subscriptions for the platform."
      entityName="Subscription"
      columns={["Plan","Organization","Status","Renewal Date"]}
    />
  );
}
