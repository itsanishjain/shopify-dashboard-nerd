import React from "react";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar - hidden on mobile, visible on desktop */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
