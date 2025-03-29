
import {
  BarChart3,
  PackageSearch,
  ShoppingCart,
  Users,
  Home,
  PuzzleIcon,
  Layers,
  CircleDollarSign,
  TrendingUp,
  Menu,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const mainLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/dashboard/sales",
      label: "Sales Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: <PackageSearch className="h-5 w-5" />,
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const analyzeLinks = [
    {
      href: "/dashboard/apps",
      label: "App Ecosystem",
      icon: <PuzzleIcon className="h-5 w-5" />,
    },
    {
      href: "/dashboard/inventory",
      label: "Inventory",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      href: "/dashboard/revenue",
      label: "Revenue",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      href: "/dashboard/performance",
      label: "Performance",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  const settingsLinks = [
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Check if a link is active
  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-40 flex items-center justify-center md:hidden hover:bg-background/90 shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </Button>

      {/* Mobile overlay with animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with animation */}
      <motion.div
        className={cn(
          "flex flex-col border-r bg-black text-white fixed md:sticky top-0 h-screen z-40 overflow-hidden",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
        initial={isMobile ? { x: "-100%" } : false}
        animate={{
          x: mobileOpen || !isMobile ? 0 : "-100%",
          width: collapsed ? 70 : 240,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-800 flex-shrink-0">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                key="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span className="whitespace-nowrap overflow-hidden font-bold text-lg text-green-500">
                  ShopNerd
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-gray-400 hover:text-white hover:bg-transparent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Nav links - using flex with space-between to push settings to bottom */}
        <nav className="flex flex-col justify-between h-[calc(100vh-3.5rem)] py-4 scrollbar-thin">
          <div className="space-y-4">
            {/* MAIN section */}
            <div>
              {!collapsed && (
                <div className="px-4 mb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    MAIN
                  </p>
                </div>
              )}
              <ul className="space-y-1 px-2">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive(link.href) 
                          ? "bg-gray-800 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-gray-800",
                        collapsed && "justify-center px-0"
                      )}
                      onClick={() => {
                        if (mobileOpen) setMobileOpen(false);
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center",
                          collapsed && "justify-center w-full"
                        )}
                      >
                        {link.icon}
                      </div>
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ANALYZE section */}
            <div>
              {!collapsed && (
                <div className="px-4 mb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ANALYZE
                  </p>
                </div>
              )}
              <ul className="space-y-1 px-2">
                {analyzeLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive(link.href) 
                          ? "bg-gray-800 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-gray-800",
                        collapsed && "justify-center px-0"
                      )}
                      onClick={() => {
                        if (mobileOpen) setMobileOpen(false);
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center",
                          collapsed && "justify-center w-full"
                        )}
                      >
                        {link.icon}
                      </div>
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SETTINGS section - pushed to bottom */}
          <div className="mt-auto">
            <ul className="space-y-1 px-2">
              {settingsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive(link.href) 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-300 hover:text-white hover:bg-gray-800",
                      collapsed && "justify-center px-0"
                    )}
                    onClick={() => {
                      if (mobileOpen) setMobileOpen(false);
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        collapsed && "justify-center w-full"
                      )}
                    >
                      {link.icon}
                    </div>
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default DashboardSidebar;
