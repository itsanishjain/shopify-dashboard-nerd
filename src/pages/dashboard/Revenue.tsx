
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AreaChart, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { revenueData } from "@/data/dashboardData";
import ChartCard from "@/components/dashboard/ChartCard";

const Revenue = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
        
        <ChartCard
          title="Revenue vs Expenses"
          description="Monthly financial overview"
          chart={
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={revenueData} margin={{ top: 20 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
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
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
