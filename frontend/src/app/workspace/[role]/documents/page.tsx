import React from "react";
import { DocumentCenterPanel } from "@/features/documents/DocumentCenterPanel";

export default function DocumentsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)]">
      <DocumentCenterPanel />
    </div>
  );
}
