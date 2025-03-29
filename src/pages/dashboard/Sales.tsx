
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { salesData, salesOverTimeData, customerAcquisitionData, productCategoryData } from "@/data/dashboardData";
import ChartCard from "@/components/dashboard/ChartCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sales = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
          
          <Tabs defaultValue="monthly" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Week</TabsTrigger>
              <TabsTrigger value="monthly">Month</TabsTrigger>
              <TabsTrigger value="yearly">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-3 lg:col-span-2 matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">Monthly Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData} margin={{ top: 20 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    name="Sales"
                    fill="url(#colorSales)"
                    radius={[4, 4, 0, 0]}
                    className="cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <ChartCard
            title="Sales Trends"
            chart={
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={salesOverTimeData.datasets[0].data.map((value, index) => ({
                  name: salesOverTimeData.labels[index],
                  thisWeek: value,
                  lastWeek: salesOverTimeData.datasets[1].data[index]
                }))}>
                  <defs>
                    <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
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
                  <Line 
                    type="monotone" 
                    dataKey="thisWeek" 
                    name="This Week" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, fill: "#10b981" }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lastWeek" 
                    name="Last Week" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, fill: "#0ea5e9" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />

          <ChartCard
            title="Customer Acquisition"
            chart={
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={customerAcquisitionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerAcquisitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                    formatter={(value) => [`${value} customers`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Sales;
