import { useState } from "react";
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
  Sector,
  ReferenceLine,
  LabelList,
} from "recharts";
import {
  Calendar,
  ShoppingCart,
  DollarSign,
  CreditCard,
  Users,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import ProductPerformanceTable from "@/components/dashboard/ProductPerformanceTable";
import AppEcosystemCard from "@/components/dashboard/AppEcosystemCard";
import TrafficAcquisitionInsights from "@/components/dashboard/TrafficAcquisitionInsights";
import {
  salesData,
  productCategoryData,
  productPerformanceData,
  appEcosystemData,
  revenueData,
  statisticsData,
} from "@/data/dashboardData";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Modern, vibrant colors for the pie chart
const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

// Custom active shape for the pie chart when hovering
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-lg"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ccc"
        className="text-xs"
      >
        {`${payload.name}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        className="text-xs"
      >
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("last30");
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center ml-auto gap-4">
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
                      <stop
                        offset="95%"
                        stopColor="#10b981"
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
                <AreaChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#f43f5e"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <filter id="shadow" height="200%">
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="8"
                        floodOpacity="0.2"
                      />
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#999"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    dy={10}
                  />
                  <YAxis
                    stroke="#999"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "rgba(107, 114, 128, 0.3)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`$${value}k`, undefined]}
                    labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: "#ccc", fontSize: "0.875rem" }}>
                        {value}
                      </span>
                    )}
                  />
                  <ReferenceLine
                    y={0}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    activeDot={{
                      r: 6,
                      stroke: "#6366f1",
                      strokeWidth: 2,
                      fill: "#fff",
                      filter: "url(#shadow)",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    activeDot={{
                      r: 6,
                      stroke: "#f43f5e",
                      strokeWidth: 2,
                      fill: "#fff",
                      filter: "url(#shadow)",
                    }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <div className="grid gap-4">
          <Card className="col-span-12 shadow-glow-sm border-emerald-700/20 bg-emerald-800/5">
            <CardContent className="p-6">
              <TrafficAcquisitionInsights />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ChartCard
            title="Product Categories"
            description="Sales distribution by category"
            chart={
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        stroke="rgba(0, 0, 0, 0.2)"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(240, 240, 245, 0.85)",
                      borderRadius: "4px",
                      border: "1px solid rgba(200, 200, 220, 0.3)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                      color: "#000",
                      fontWeight: "600",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
            className="md:col-span-1"
          />
          <AppEcosystemCard
            apps={appEcosystemData}
            className="md:col-span-2 lg:col-span-2"
          />
        </div>

        <div className="grid gap-4">
          <ProductPerformanceTable products={productPerformanceData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
