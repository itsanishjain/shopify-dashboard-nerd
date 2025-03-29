
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { salesData } from "@/data/dashboardData";
import { TrendingUp } from "lucide-react";
import ChartCard from "@/components/dashboard/ChartCard";

const Sales = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
        
        <ChartCard
          title="Monthly Sales Overview"
          description="Sales performance by month"
          chart={
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
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default Sales;
