
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productPerformanceData } from "@/data/dashboardData";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";

const Products = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductPerformanceTable products={productPerformanceData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Products;
