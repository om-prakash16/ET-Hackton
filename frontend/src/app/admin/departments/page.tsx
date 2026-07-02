"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function DepartmentsPage() {
  return (
    <AdminPageTemplate
      title="Departments"
      description="Manage and configure departments for the platform."
      entityName="Department"
      columns={["Department Name","Head","Members"]}
    />
  );
}
