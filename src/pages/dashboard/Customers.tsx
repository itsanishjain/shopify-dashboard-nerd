
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Customers = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Card className="analytics-card">
          <CardHeader className="analytics-card-header">
            <CardTitle className="chart-title">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Customer Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-gray-400">Customer information and analytics will be displayed here.</p>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Customers;
