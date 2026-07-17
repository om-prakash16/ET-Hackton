import React from "react";
import { MaintenancePanel } from "@/features/maintenance/MaintenancePanel";

export default function MaintenancePage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      <MaintenancePanel />
    </div>
  );
}
