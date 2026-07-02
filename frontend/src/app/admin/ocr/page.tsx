"use client";

import { AdminPageTemplate } from "@/components/ui/AdminPageTemplate";

export default function OcrPage() {
  return (
    <AdminPageTemplate
      title="OCR Center"
      description="Manage and configure ocr center for the platform."
      entityName="Engine"
      columns={["Engine Name","Jobs Processed","Success Rate","Status"]}
    />
  );
}
