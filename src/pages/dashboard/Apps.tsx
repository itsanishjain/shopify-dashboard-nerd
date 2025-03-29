
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppEcosystemCard from "@/components/dashboard/AppEcosystemCard";
import { appEcosystemData } from "@/data/dashboardData";

const Apps = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">App Ecosystem</h1>
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">Integrated Applications</CardTitle>
          </CardHeader>
          <AppEcosystemCard apps={appEcosystemData} />
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Apps;
