
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
  Sparkles,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const COLORS = ["#22c55e", "#0891b2", "#4f46e5", "#8b5cf6", "#ec4899"];

const Index = () => {
  const [dateRange, setDateRange] = useState("last30");

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6 animate-fade-in"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.h1 
            className="text-3xl font-bold tracking-tight flex items-center gap-2"
            variants={itemVariants}
          >
            <Sparkles className="h-8 w-8 text-primary" />
            <span>Analytics Hub</span>
          </motion.h1>

          <motion.div 
            className="flex items-center ml-auto gap-4"
            variants={itemVariants}
          >
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
          </motion.div>
        </div>

        {/* Bento grid layout - main grid container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
          {/* Stats cards in a row at the top - spans all 12 columns */}
          <motion.div 
            className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
            variants={itemVariants}
          >
            <StatCard
              title="Total Revenue"
              value={statisticsData.totalRevenue.value}
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              change={statisticsData.totalRevenue.change}
              changeLabel={statisticsData.totalRevenue.changeLabel}
              className="backdrop-blur-sm bg-gradient-to-br from-card/70 to-card/50 border-primary/20 shadow-lg"
            />
            <StatCard
              title="Average Order Value"
              value={statisticsData.averageOrderValue.value}
              icon={<CreditCard className="h-5 w-5 text-primary" />}
              change={statisticsData.averageOrderValue.change}
              changeLabel={statisticsData.averageOrderValue.changeLabel}
              className="backdrop-blur-sm bg-gradient-to-br from-card/70 to-card/50 border-primary/20 shadow-lg"
            />
            <StatCard
              title="Conversion Rate"
              value={statisticsData.conversionRate.value}
              icon={<ShoppingCart className="h-5 w-5 text-primary" />}
              change={statisticsData.conversionRate.change}
              changeLabel={statisticsData.conversionRate.changeLabel}
              className="backdrop-blur-sm bg-gradient-to-br from-card/70 to-card/50 border-primary/20 shadow-lg"
            />
            <StatCard
              title="Active Customers"
              value={statisticsData.activeCustomers.value}
              icon={<Users className="h-5 w-5 text-primary" />}
              change={statisticsData.activeCustomers.change}
              changeLabel={statisticsData.activeCustomers.changeLabel}
              className="backdrop-blur-sm bg-gradient-to-br from-card/70 to-card/50 border-primary/20 shadow-lg"
            />
          </motion.div>

          {/* Feature chart - spans 8 columns */}
          <motion.div 
            className="col-span-12 md:col-span-8 md:row-span-2"
            variants={itemVariants}
          >
            <ChartCard
              title="Revenue Overview"
              description="Monthly performance metrics"
              className="h-full backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-primary/20 shadow-lg"
              chart={
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={revenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)', opacity: 0.5 }}
                    />
                    <YAxis 
                      stroke="var(--muted-foreground)" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)', opacity: 0.5 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                      itemStyle={{ padding: "4px 0" }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: 20 }}
                      iconType="circle" 
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />
          </motion.div>

          {/* Product categories pie chart - spans 4 columns */}
          <motion.div 
            className="col-span-12 md:col-span-4"
            variants={itemVariants}
          >
            <ChartCard
              title="Product Categories"
              description="Sales distribution"
              className="h-full backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-primary/20 shadow-lg"
              chart={
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={{ stroke: 'var(--foreground)', strokeWidth: 0.5, opacity: 0.8 }}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{ color: "var(--foreground)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              }
            />
          </motion.div>

          {/* Sales bar chart - spans 5 columns */}
          <motion.div 
            className="col-span-12 md:col-span-5"
            variants={itemVariants}
          >
            <ChartCard
              title="Monthly Sales"
              description="Performance metrics"
              className="h-full backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-primary/20 shadow-lg"
              chart={
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={salesData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)', opacity: 0.5 }}
                    />
                    <YAxis 
                      stroke="var(--muted-foreground)" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)', opacity: 0.5 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                    />
                    <Bar
                      dataKey="value"
                      name="Sales"
                      fill="url(#colorSales)"
                      radius={[4, 4, 0, 0]}
                      className="cursor-pointer"
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              }
            />
          </motion.div>

          {/* App ecosystem - spans 7 columns */}
          <motion.div 
            className="col-span-12 md:col-span-7"
            variants={itemVariants}
          >
            <AppEcosystemCard
              apps={appEcosystemData}
              className="h-full backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-primary/20 shadow-lg"
            />
          </motion.div>

          {/* Product performance table - spans all 12 columns */}
          <motion.div 
            className="col-span-12"
            variants={itemVariants}
          >
            <ProductPerformanceTable 
              products={productPerformanceData} 
              className="backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-primary/20 shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
