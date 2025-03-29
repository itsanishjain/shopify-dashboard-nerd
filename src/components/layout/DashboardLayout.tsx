import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    // <SidebarProvider>
    //   <div className="">
    //     {/* <DashboardSidebar /> */}
    //     {/* <SidebarInset> */}
    //     <div className="container py-6 mx-auto bg-red-500">{children}</div>
    //     {/* </SidebarInset> */}
    //   </div>
    // </SidebarProvider>

    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      {/* <Sidebar /> */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
