
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productPerformanceData, productCategoryData, weeklyProductSales } from "@/data/dashboardData";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";
import ChartCard from "@/components/dashboard/ChartCard";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Products = () => {
  const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#ec4899", "#f97316"];

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
        
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="Product Categories"
            chart={
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                    formatter={(value) => [`${value} items`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />

          <ChartCard
            title="Weekly Product Sales"
            chart={
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyProductSales} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.5} />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="shirts" name="Shirts" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pants" name="Pants" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hoodies" name="Hoodies" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </div>
        
        <Card className="w-full matrix-flow">
          <CardHeader className="pb-3">
            <CardTitle className="terminal-text">Product Performance</CardTitle>
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
