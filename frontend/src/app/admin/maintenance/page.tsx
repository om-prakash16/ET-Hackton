"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function MaintenancePage() {
  return (
    <AdminPageTemplate
      title="Maintenance"
      description="Predictive maintenance jobs, asset health alerts, and repair schedules."
      entityName="Maintenance Job"
      columns={["Job ID","Asset Name","Priority","Status","Assigned To"]}
    />
  );
}
