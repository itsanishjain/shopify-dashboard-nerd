
import React from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Card className="analytics-card">
          <CardHeader className="analytics-card-header">
            <CardTitle className="chart-title">
              <Settings2 className="mr-2 h-5 w-5 text-primary" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-gray-400">Account and application settings will be displayed here.</p>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Settings;
