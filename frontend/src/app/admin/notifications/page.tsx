"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function NotificationsPage() {
  return (
    <AdminPageTemplate
      title="Notifications"
      description="Manage and configure notifications for the platform."
      entityName="Notification"
      columns={["Title","Type","Sent To","Date"]}
    />
  );
}
