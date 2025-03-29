
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar />
        
        {/* Main content area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
