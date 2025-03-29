
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpDown, 
  Smartphone, 
  ShoppingBag, 
  Globe, 
  Store, 
  Clock, 
  Calendar, 
  Percent, 
  CreditCard, 
  ShoppingCart, 
  BarChart4, 
  MapPin
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { salesData, salesOverTimeData, customerAcquisitionData, productCategoryData } from "@/data/dashboardData";
import { getSalesByChannel, getSalesByLocation, getSalesByDevice, getPeakSalesTimes, getDiscountCodePerformance, getAOVData, getOrderStatusData, getAbandonedCheckouts } from "@/data/salesAnalyticsData";
import ChartCard from "@/components/dashboard/ChartCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import SalesHeatmap from "@/components/dashboard/SalesHeatmap";
import DiscountCodeTable from "@/components/dashboard/DiscountCodeTable";
import SalesChannelChart from "@/components/dashboard/SalesChannelChart";
import SalesMapChart from "@/components/dashboard/SalesMapChart";

const Sales = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#ec4899", "#f97316"];

  // Get the sales data based on timeframe
  const getSalesTrendData = () => {
    switch (timeframe) {
      case "weekly":
        return salesOverTimeData.datasets[0].data.slice(0, 7).map((value, index) => ({
          name: salesOverTimeData.labels[index],
          thisWeek: value,
          lastWeek: salesOverTimeData.datasets[1].data[index]
        }));
      case "yearly":
        return salesData.slice(0, 12);
      default:
        return salesData;
    }
  };

  const salesTrendData = getSalesTrendData();
  const salesByChannel = getSalesByChannel();
  const salesByLocation = getSalesByLocation();
  const salesByDevice = getSalesByDevice();
  const peakSalesTimes = getPeakSalesTimes();
  const discountCodeData = getDiscountCodePerformance();
  const aovData = getAOVData();
  const orderStatusData = getOrderStatusData();
  const abandonedCheckouts = getAbandonedCheckouts();

  // Calculate summary metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.value, 0);
  const totalOrders = orderStatusData.reduce((sum, item) => sum + item.count, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const abandonedRate = abandonedCheckouts.rate;

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
          
          <Tabs defaultValue={timeframe} className="w-[250px]" onValueChange={(value) => setTimeframe(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Week</TabsTrigger>
              <TabsTrigger value="monthly">Month</TabsTrigger>
              <TabsTrigger value="yearly">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Summary Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${totalRevenue.toLocaleString()}</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    +12.4%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">vs. previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Orders</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{totalOrders.toLocaleString()}</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    +8.1%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">vs. previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Average Order Value</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    +3.2%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">vs. previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Abandoned Checkout Rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{abandonedRate}%</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    -1.5%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">vs. previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend Chart */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2 matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorLastPeriod" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
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
                  <Line 
                    type="monotone" 
                    dataKey={timeframe === "weekly" ? "thisWeek" : "value"} 
                    name="Current Period" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, fill: "#10b981" }}
                    fill="url(#colorRevenue)"
                  />
                  {timeframe === "weekly" && (
                    <Line 
                      type="monotone" 
                      dataKey="lastWeek" 
                      name="Previous Period" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4, fill: "#0ea5e9" }}
                      fill="url(#colorLastPeriod)"
                      strokeDasharray="5 5"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Average Order Value (AOV) Trend */}
          <Card className="lg:col-span-1 matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">AOV Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={aovData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorAOV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                    formatter={(value) => [`$${value}`, 'AOV']}
                  />
                  <Bar 
                    dataKey="value" 
                    name="AOV" 
                    fill="url(#colorAOV)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sales Breakdown */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* By Channel */}
          <ChartCard
            title="Sales by Channel"
            chart={
              <SalesChannelChart data={salesByChannel} colors={COLORS} />
            }
          />

          {/* By Device */}
          <ChartCard
            title="Sales by Device"
            chart={
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <defs>
                    {COLORS.map((color, index) => (
                      <linearGradient key={`gradient-${index}`} id={`colorDevice${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={salesByDevice}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesByDevice.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#colorDevice${index})`} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#222",
                      borderColor: "#333",
                      color: "#fff",
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />

          {/* By Location - Map preview */}
          <ChartCard
            title="Sales by Location"
            chart={
              <div className="h-[220px] flex flex-col">
                <SalesMapChart data={salesByLocation} />
                <div className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Full Map
                  </Button>
                </div>
              </div>
            }
          />
        </div>

        {/* Order Status Overview + Discount Code Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Status Overview */}
          <Card className="matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">Order Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderStatusData.map((status, index) => (
                  <div key={status.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm">{status.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{status.count} orders</span>
                        <span className="text-sm font-medium">${status.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{totalOrders} orders</span>
                      <span className="text-sm font-medium">${totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discount Code Performance */}
          <Card className="matrix-flow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="terminal-text">Discount Code Performance</CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Top 5 Codes
              </Badge>
            </CardHeader>
            <CardContent>
              <DiscountCodeTable data={discountCodeData.slice(0, 5)} />
            </CardContent>
          </Card>
        </div>

        {/* Peak Sales Times + Abandoned Checkouts */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Peak Sales Times - Heatmap */}
          <Card className="md:col-span-8 matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">Peak Sales Times</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesHeatmap data={peakSalesTimes} />
            </CardContent>
          </Card>

          {/* Abandoned Checkouts */}
          <Card className="md:col-span-4 matrix-flow">
            <CardHeader>
              <CardTitle className="terminal-text">Abandoned Checkouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Abandonment Rate</span>
                    <span className="text-sm font-medium">{abandonedCheckouts.rate}%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500"
                      style={{ width: `${abandonedCheckouts.rate}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Abandoned Value</div>
                      <div className="text-lg font-medium">${abandonedCheckouts.value.toLocaleString()}</div>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Recovered Value</div>
                      <div className="text-lg font-medium">${abandonedCheckouts.recovered.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Recovery Rate</div>
                      <div className="text-lg font-medium">{abandonedCheckouts.recoveryRate}%</div>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Potential Lost</div>
                      <div className="text-lg font-medium">${abandonedCheckouts.potentialLost.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Sales;
