import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { revenueData, productCategoryData } from "@/data/dashboardData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartPie,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Map,
  Users,
  Receipt,
  CalendarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ChartCard from "@/components/dashboard/ChartCard";
import SalesMapChart from "@/components/dashboard/SalesMapChart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSalesByLocation } from "@/data/salesAnalyticsData";

// Sample data for new charts
const revenueGrowthData = [
  { name: "Jan", thisYear: 4200, lastYear: 3400 },
  { name: "Feb", thisYear: 3600, lastYear: 2800 },
  { name: "Mar", thisYear: 2400, lastYear: 2000 },
  { name: "Apr", thisYear: 3200, lastYear: 2600 },
  { name: "May", thisYear: 2200, lastYear: 1800 },
  { name: "Jun", thisYear: 2800, lastYear: 2200 },
  { name: "Jul", thisYear: 4000, lastYear: 3200 },
  { name: "Aug", thisYear: 4600, lastYear: 3700 },
  { name: "Sep", thisYear: 5400, lastYear: 4100 },
  { name: "Oct", thisYear: 6500, lastYear: 5000 },
  { name: "Nov", thisYear: 7600, lastYear: 5700 },
  { name: "Dec", thisYear: 9800, lastYear: 7400 },
];

const profitMarginData = [
  { name: "Jan", margin: 28 },
  { name: "Feb", margin: 32 },
  { name: "Mar", margin: 30 },
  { name: "Apr", margin: 34 },
  { name: "May", margin: 32 },
  { name: "Jun", margin: 35 },
  { name: "Jul", margin: 38 },
  { name: "Aug", margin: 36 },
  { name: "Sep", margin: 40 },
  { name: "Oct", margin: 38 },
  { name: "Nov", margin: 42 },
  { name: "Dec", margin: 44 },
];

const forecastData = [
  { name: "Jan", actual: 4200, forecast: 4200 },
  { name: "Feb", actual: 3600, forecast: 3600 },
  { name: "Mar", actual: 2400, forecast: 2400 },
  { name: "Apr", actual: 3200, forecast: 3200 },
  { name: "May", actual: 2200, forecast: 2200 },
  { name: "Jun", actual: 2800, forecast: 2800 },
  { name: "Jul", actual: 4000, forecast: 4000 },
  { name: "Aug", actual: 4600, forecast: 4600 },
  { name: "Sep", actual: null, forecast: 5200 },
  { name: "Oct", actual: null, forecast: 5800 },
  { name: "Nov", actual: null, forecast: 6500 },
  { name: "Dec", actual: null, forecast: 7200 },
];

const topProducts = [
  { id: 1, name: "Premium Subscription", revenue: 124500, growth: 12.5 },
  { id: 2, name: "Pro Plan Annual", revenue: 98700, growth: 8.3 },
  { id: 3, name: "Enterprise Solution", revenue: 87600, growth: 15.2 },
  { id: 4, name: "Basic Plan", revenue: 54300, growth: -2.1 },
  { id: 5, name: "Add-on Services", revenue: 43200, growth: 5.7 },
];

const seasonalData = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 36 },
  { name: "Mar", value: 48 },
  { name: "Apr", value: 52 },
  { name: "May", value: 61 },
  { name: "Jun", value: 75 },
  { name: "Jul", value: 85 },
  { name: "Aug", value: 83 },
  { name: "Sep", value: 70 },
  { name: "Oct", value: 58 },
  { name: "Nov", value: 52 },
  { name: "Dec", value: 78 },
];

const customerSegmentData = [
  { name: "Enterprise", value: 4500 },
  { name: "SMB", value: 3200 },
  { name: "Startup", value: 1800 },
  { name: "Individual", value: 1200 },
  { name: "Education", value: 800 },
];

const marketingChannelData = [
  { name: "Direct", value: 2800 },
  { name: "Organic Search", value: 1900 },
  { name: "Paid Search", value: 1600 },
  { name: "Social Media", value: 1200 },
  { name: "Email", value: 900 },
  { name: "Referral", value: 750 },
];

const subscriptionVsOneTimeData = [
  { name: "Subscription", value: 7500 },
  { name: "One-time", value: 2500 },
];

const arpuData = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 43 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 44 },
  { name: "May", value: 46 },
  { name: "Jun", value: 48 },
  { name: "Jul", value: 52 },
  { name: "Aug", value: 55 },
  { name: "Sep", value: 58 },
  { name: "Oct", value: 60 },
  { name: "Nov", value: 63 },
  { name: "Dec", value: 65 },
];

const mrrData = [
  { name: "Jan", value: 85000 },
  { name: "Feb", value: 87500 },
  { name: "Mar", value: 91000 },
  { name: "Apr", value: 94500 },
  { name: "May", value: 98000 },
  { name: "Jun", value: 103000 },
  { name: "Jul", value: 108000 },
  { name: "Aug", value: 114000 },
  { name: "Sep", value: 120000 },
  { name: "Oct", value: 127000 },
  { name: "Nov", value: 135000 },
  { name: "Dec", value: 145000 },
];

const retentionData = [
  { name: "Jan", retained: 95, churned: 5 },
  { name: "Feb", retained: 93, churned: 7 },
  { name: "Mar", retained: 94, churned: 6 },
  { name: "Apr", retained: 92, churned: 8 },
  { name: "May", retained: 91, churned: 9 },
  { name: "Jun", retained: 93, churned: 7 },
  { name: "Jul", retained: 95, churned: 5 },
  { name: "Aug", retained: 96, churned: 4 },
  { name: "Sep", retained: 94, churned: 6 },
  { name: "Oct", retained: 95, churned: 5 },
  { name: "Nov", retained: 97, churned: 3 },
  { name: "Dec", retained: 96, churned: 4 },
];

const paymentMethodData = [
  { name: "Credit Card", value: 65 },
  { name: "PayPal", value: 15 },
  { name: "Bank Transfer", value: 10 },
  { name: "Digital Wallet", value: 8 },
  { name: "Other", value: 2 },
];

const taxFeeData = [
  { name: "Base Revenue", value: 85 },
  { name: "Sales Tax", value: 7 },
  { name: "Processing Fees", value: 3 },
  { name: "VAT", value: 5 },
];

// Color schemes
const COLORS = [
  "#10b981",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#f59e0b",
  "#6366f1",
];
const PIE_COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#ec4899", "#f97316"];

const Revenue = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");
  const salesByLocation = getSalesByLocation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight terminal-text">
            Revenue Analytics
          </h1>

          <Tabs
            defaultValue={timeframe}
            className="w-[250px]"
            onValueChange={(value) => setTimeframe(value)}
          >
            <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl">
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
              >
                Year
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6 overflow-auto gap-1 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <ChartPie className="h-4 w-4" />
              <span className="hidden sm:inline">Breakdown</span>
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Growth</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border matrix-flow shadow-glow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Revenue (YTD)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">$1,245,789</span>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500 border-green-500/20"
                      >
                        +15.3%
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      vs. last year
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-[#0ea5e9]/10 to-[#0ea5e9]/5 border matrix-flow shadow-glow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Current MRR
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">$145,000</span>
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                      >
                        +7.4%
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      vs. last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-[#8b5cf6]/10 to-[#8b5cf6]/5 border matrix-flow shadow-glow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Current ARPU
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">$65</span>
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                      >
                        +3.2%
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      vs. last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-[#f97316]/10 to-[#f97316]/5 border matrix-flow shadow-glow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Profit Margin
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">44%</span>
                      <Badge
                        variant="outline"
                        className="bg-orange-500/10 text-orange-500 border-orange-500/20"
                      >
                        +4.5%
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      vs. last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={revenueData} margin={{ top: 20 }}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorExpenses"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#333"
                    />
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
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Revenue Forecast"
                description="Based on historical data patterns"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={forecastData} margin={{ top: 20 }}>
                      <defs>
                        <linearGradient
                          id="colorActual"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorForecast"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#333"
                        opacity={0.2}
                      />
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
                        dataKey="actual"
                        name="Actual Revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        name="Forecast"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />

              <ChartCard
                title="Seasonal Revenue Patterns"
                description="Monthly revenue trends"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={seasonalData} margin={{ top: 20 }}>
                      <defs>
                        <linearGradient
                          id="colorSeasonal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f97316"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f97316"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#333"
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        name="Revenue"
                        stroke="#f97316"
                        fillOpacity={1}
                        fill="url(#colorSeasonal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ChartCard
                title="Revenue by Product Category"
                description="Distribution across categories"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
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
              />

              <ChartCard
                title="Revenue by Marketing Channel"
                description="Acquisition source breakdown"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marketingChannelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {marketingChannelData.map((entry, index) => (
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
              />

              <ChartCard
                title="Customer Segment Contribution"
                description="Revenue by customer type"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
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
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Subscription vs. One-time Purchase"
                description="Revenue distribution by purchase type"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subscriptionVsOneTimeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f97316" />
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
              />

              <ChartCard
                title="Tax & Fee Breakdown"
                description="Revenue components analysis"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={taxFeeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {taxFeeData.map((entry, index) => (
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
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="flex items-center justify-center h-full flex-col gap-4 text-muted-foreground">
                  <Map className="h-16 w-16 opacity-40" />
                  <p>Interactive map view is being updated</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
                    {salesByLocation.slice(0, 4).map((location, index) => (
                      <Card
                        key={index}
                        className="bg-background/40 backdrop-blur-md"
                      >
                        <CardContent className="p-4">
                          <div className="text-sm font-medium">
                            {location.name}
                          </div>
                          <div className="text-lg font-bold">
                            ${location.value.toLocaleString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <ChartCard
              title="Revenue Growth Rate Comparison"
              description="This year vs. last year"
              chart={
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueGrowthData} margin={{ top: 20 }}>
                    <defs>
                      <linearGradient
                        id="colorThisYear"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorLastYear"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#333"
                      opacity={0.2}
                    />
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
                    <Bar
                      dataKey="thisYear"
                      name="This Year"
                      fill="url(#colorThisYear)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="lastYear"
                      name="Last Year"
                      fill="url(#colorLastYear)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              }
            />

            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Profit Margin Analysis"
                description="Margin percentage over time"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={profitMarginData} margin={{ top: 20 }}>
                      <defs>
                        <linearGradient
                          id="colorMargin"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#333"
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                        formatter={(value) => [`${value}%`, "Profit Margin"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="margin"
                        name="Profit Margin"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />

              <ChartCard
                title="Retention & Churn Impact"
                description="Revenue retention visualization"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={retentionData} margin={{ top: 20 }}>
                      <defs>
                        <linearGradient
                          id="colorRetained"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorChurned"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ef4444"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ef4444"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#333"
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                        formatter={(value) => [`${value}%`, ""]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="retained"
                        name="Retained Revenue"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorRetained)"
                      />
                      <Area
                        type="monotone"
                        dataKey="churned"
                        name="Churned Revenue"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorChurned)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Revenue-Generating Products</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-right">
                          ${product.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              product.growth >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {product.growth >= 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <ChartCard
              title="Payment Method Distribution"
              description="Revenue by payment method"
              chart={
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {paymentMethodData.map((entry, index) => (
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
                      formatter={(value) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              }
            />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard
                title="Average Revenue Per User (ARPU)"
                description="Monthly ARPU trend"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={arpuData} margin={{ top: 20 }}>
                      <defs>
                        <linearGradient
                          id="colorArpu"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#333"
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          borderColor: "#333",
                          color: "#fff",
                        }}
                        formatter={(value) => [`$${value}`, "ARPU"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="ARPU"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />

              <ChartCard
                title="Customer Segment Contribution"
                description="Revenue by customer type"
                chart={
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
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
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <ChartCard
              title="Monthly Recurring Revenue (MRR)"
              description="Monthly growth trend"
              chart={
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mrrData} margin={{ top: 20 }}>
                    <defs>
                      <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0ea5e9"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#333"
                      opacity={0.2}
                    />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#222",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "MRR",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="MRR"
                      stroke="#0ea5e9"
                      fillOpacity={1}
                      fill="url(#colorMrr)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            />

            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Export Revenue Report</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
