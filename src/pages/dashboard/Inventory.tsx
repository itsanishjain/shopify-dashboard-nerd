
import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <Card className="analytics-card">
          <CardHeader className="analytics-card-header">
            <CardTitle className="chart-title">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Inventory Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-gray-400">Inventory levels and stock management information will be displayed here.</p>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Inventory;
