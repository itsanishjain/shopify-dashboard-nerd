
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Performance = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
        <Card className="matrix-flow">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium terminal-text">Business Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Key performance indicators and business metrics will be displayed here.</p>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Performance;
