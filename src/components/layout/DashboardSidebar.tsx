
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  PackageSearch, 
  ShoppingCart, 
  Users, 
  Settings, 
  Home,
  PuzzleIcon,
  Layers,
  CircleDollarSign,
  TrendingUp,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar();
  
  return (
    <>
      {/* Mobile toggle button - only visible when sidebar is closed on mobile */}
      {isMobile && !openMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      
      <Sidebar>
        <SidebarHeader className="p-4 flex items-center gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg terminal-text">ShopNerd</span>
            </div>
            <SidebarTrigger className="p-2 rounded-md hover:bg-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6h-6"></path>
                <path d="M6 12h12"></path>
                <path d="M18 18h-6"></path>
              </svg>
            </SidebarTrigger>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel className="terminal-text text-xs opacity-70">MAIN</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <a href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Sales Analytics">
                    <a href="/sales" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Sales Analytics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Products">
                    <a href="/products" className="flex items-center gap-2">
                      <PackageSearch className="h-4 w-4" />
                      <span>Products</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Orders">
                    <a href="/orders" className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Orders</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Customers">
                    <a href="/customers" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Customers</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="terminal-text text-xs opacity-70">ANALYZE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="App Ecosystem">
                    <a href="/apps" className="flex items-center gap-2">
                      <PuzzleIcon className="h-4 w-4" />
                      <span>App Ecosystem</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Inventory">
                    <a href="/inventory" className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span>Inventory</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Revenue">
                    <a href="/revenue" className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4" />
                      <span>Revenue</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Performance">
                    <a href="/performance" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Performance</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SidebarMenuButton asChild className="w-full" tooltip="Settings">
            <a href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
