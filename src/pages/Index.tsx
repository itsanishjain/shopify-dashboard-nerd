import React, { useState } from "react";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ShoppingCart,
  DollarSign,
  CreditCard,
  Users,
  Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";
import AppEcosystemCard from "@/components/dashboard/AppEcosystemCard";
import {
  salesData,
  productCategoryData,
  productPerformanceData,
  appEcosystemData,
  revenueData,
  statisticsData,
} from "@/data/dashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ["#22c55e", "#0891b2", "#4f46e5", "#8b5cf6", "#ec4899"];

const Index = () => {
  const [dateRange, setDateRange] = useState("last30");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight terminal-text text-glow">
            Merchant Dashboard
          </h1>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="month">Month to date</SelectItem>
                <SelectItem value="year">Year to date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Compare</span>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={statisticsData.totalRevenue.value}
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            change={statisticsData.totalRevenue.change}
            changeLabel={statisticsData.totalRevenue.changeLabel}
          />
          <StatCard
            title="Average Order Value"
            value={statisticsData.averageOrderValue.value}
            icon={<CreditCard className="h-5 w-5 text-primary" />}
            change={statisticsData.averageOrderValue.change}
            changeLabel={statisticsData.averageOrderValue.changeLabel}
          />
          <StatCard
            title="Conversion Rate"
            value={statisticsData.conversionRate.value}
            icon={<ShoppingCart className="h-5 w-5 text-primary" />}
            change={statisticsData.conversionRate.change}
            changeLabel={statisticsData.conversionRate.changeLabel}
          />
          <StatCard
            title="Active Customers"
            value={statisticsData.activeCustomers.value}
            icon={<Users className="h-5 w-5 text-primary" />}
            change={statisticsData.activeCustomers.change}
            changeLabel={statisticsData.activeCustomers.changeLabel}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Sales Overview"
            description="Monthly sales performance"
            chart={
              <ResponsiveContainer width="100%" height={300}>
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

          <ChartCard
            title="Revenue vs Expenses"
            description="Monthly financial overview"
            chart={
              <ResponsiveContainer width="100%" height={300}>
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

        <div className="grid gap-4 md:grid-cols-3">
          <ChartCard
            title="Product Categories"
            description="Sales distribution by category"
            chart={
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
            className="md:col-span-1"
          />
          <AppEcosystemCard
            apps={appEcosystemData}
            className="md:col-span-2"
          />
        </div>

        <div className="grid gap-4">
          <ProductPerformanceTable products={productPerformanceData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
