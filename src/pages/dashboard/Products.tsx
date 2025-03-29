
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productPerformanceData } from "@/data/dashboardData";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";

const Products = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          
          <div className="flex items-center gap-2">
            {/* Add any product-specific controls here if needed */}
          </div>
        </div>
        
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductPerformanceTable products={productPerformanceData} />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Products;
