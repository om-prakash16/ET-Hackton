import React from "react";
import { CopilotPanel } from "@/features/copilot/CopilotPanel";

export default function CopilotPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-[calc(100vh-4rem)]">
      <CopilotPanel />
    </div>
  );
}
