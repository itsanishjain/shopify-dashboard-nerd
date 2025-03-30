import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  LineChart,
  Line,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Users,
  MousePointerClick,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import {
  trafficSourcesData,
  conversionFunnelData,
  campaignPerformanceData,
} from "@/data/dashboardData";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for the funnel chart data
interface FunnelData {
  stage: string;
  value: number;
  percentage: number;
}

// Reusable glass-style tooltip with more green tones
const glassStyle = {
  backgroundColor: "rgba(17, 24, 39, 0.75)",
  borderRadius: "0.5rem",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
  color: "#fff",
  padding: "12px 16px",
};

// Updated green-focused color palette for charts
const COLORS = [
  "#10b981", // Main green (Emerald)
  "#059669", // Dark green
  "#34d399", // Light green
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky blue
];

const TrafficAcquisitionInsights = () => {
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  // Custom tooltip for the funnel chart
  const CustomFunnelTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as FunnelData;
      return (
        <div style={glassStyle}>
          <p className="font-semibold mb-1">{data.stage}</p>
          <p className="text-sm">Users: {formatNumber(data.value)}</p>
          <p className="text-sm">Percentage: {data.percentage}%</p>
          {data.stage !== "Visitors" && (
            <p className="text-sm">
              Drop-off: {(100 - data.percentage).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Format the time on site (seconds to mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="col-span-12 shadow-glow-sm border-emerald-700/20 bg-emerald-800/5">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text flex items-center gap-2">
          <Globe className="h-5 w-5 text-emerald-500" />
          Traffic & Acquisition Insights
        </CardTitle>
        <CardDescription>
          Analyze visitor sources, conversion funnel, and campaign performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic" className="w-full">
          <div className="mb-6">
            {/* Mobile view - dropdown */}
            <div className="md:hidden">
              <Select
                defaultValue="traffic"
                onValueChange={(value) => {
                  // Find the corresponding tab trigger and programmatically click it
                  const tabTrigger = document.querySelector(
                    `[data-value="${value}"]`
                  );
                  if (tabTrigger) {
                    (tabTrigger as HTMLElement).click();
                  }
                }}
              >
                <SelectTrigger className="w-full bg-emerald-900/10 border border-emerald-800/20">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Traffic Sources</SelectItem>
                  <SelectItem value="funnel">Conversion Funnel</SelectItem>
                  <SelectItem value="campaigns">
                    Campaign Performance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop view - tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-3 bg-emerald-900/10 border border-emerald-800/20">
              <TabsTrigger
                value="traffic"
                data-value="traffic"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Traffic Sources
              </TabsTrigger>
              <TabsTrigger
                value="funnel"
                data-value="funnel"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Conversion Funnel
              </TabsTrigger>
              <TabsTrigger
                value="campaigns"
                data-value="campaigns"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Campaign Performance
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Traffic Sources Tab */}
          <TabsContent value="traffic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Visitors
                      </p>
                      <h3 className="text-2xl font-bold mt-1 terminal-text">
                        {formatNumber(
                          trafficSourcesData.reduce(
                            (sum, item) => sum + item.visitors,
                            0
                          )
                        )}
                      </h3>
                    </div>
                    <Users className="h-5 w-5 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Avg. Conversion Rate
                      </p>
                      <h3 className="text-2xl font-bold mt-1 terminal-text">
                        {(
                          trafficSourcesData.reduce(
                            (sum, item) => sum + item.conversionRate,
                            0
                          ) / trafficSourcesData.length
                        ).toFixed(1)}
                        %
                      </h3>
                    </div>
                    <MousePointerClick className="h-5 w-5 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-emerald-800/5 backdrop-blur-sm border-emerald-700/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                      </p>
                      <h3 className="text-2xl font-bold mt-1 terminal-text">
                        $
                        {formatNumber(
                          trafficSourcesData.reduce(
                            (sum, item) => sum + item.revenue,
                            0
                          )
                        )}
                      </h3>
                    </div>
                    <ShoppingCart className="h-5 w-5 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="h-80 overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%" minWidth={600}>
                  <BarChart
                    data={trafficSourcesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barGap={8}
                  >
                    <defs>
                      <linearGradient id="barFill1" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={COLORS[0]}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[0]}
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                      <linearGradient id="barFill2" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={COLORS[1]}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[1]}
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="source"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tickFormatter={(value) => formatNumber(value)}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <Tooltip
                      contentStyle={glassStyle}
                      formatter={(value, name) => {
                        if (name === "visitors")
                          return [formatNumber(value as number), "Visitors"];
                        if (name === "conversionRate")
                          return [`${value}%`, "Conversion Rate"];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="visitors"
                      fill="url(#barFill1)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      style={{ cursor: "default" }}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="conversionRate"
                      fill="url(#barFill2)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                      animationBegin={300}
                      style={{ cursor: "default" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Visitors</TableHead>
                      <TableHead className="text-right">Sessions</TableHead>
                      <TableHead className="text-right">Conv. Rate</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Bounce Rate</TableHead>
                      <TableHead className="text-right">Avg. Time</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trafficSourcesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.source}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.visitors)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.sessions)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.conversionRate}%
                        </TableCell>
                        <TableCell className="text-right">
                          ${formatNumber(item.revenue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.bounceRate}%
                        </TableCell>
                        <TableCell className="text-right">
                          {formatTime(item.avgTimeOnSite)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            {item.trend > 0 ? (
                              <Badge
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              >
                                <ArrowUpRight className="mr-1 h-3 w-3" />
                                {item.trend}%
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-rose-500/10 text-rose-500 border-rose-500/20"
                              >
                                <ArrowDownRight className="mr-1 h-3 w-3" />
                                {Math.abs(item.trend)}%
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="funnel">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-96 overflow-x-auto min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={400}>
                  <FunnelChart>
                    <Tooltip content={<CustomFunnelTooltip />} />
                    <Funnel
                      dataKey="value"
                      data={conversionFunnelData as FunnelData[]}
                      isAnimationActive
                      animationDuration={1500}
                    >
                      <LabelList
                        position="right"
                        fill="#fff"
                        stroke="none"
                        dataKey="stage"
                      />
                      <LabelList
                        position="left"
                        fill="#fff"
                        stroke="none"
                        dataKey={(entry: FunnelData) => `${entry.percentage}%`}
                      />
                      {conversionFunnelData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                <Card className="backdrop-blur-sm bg-emerald-800/5 border-emerald-700/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      Funnel Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {conversionFunnelData.map((item, index) => {
                      // Calculate drop-off from previous stage
                      const prevPercentage =
                        index > 0
                          ? conversionFunnelData[index - 1].percentage
                          : 100;
                      const dropOff = prevPercentage - item.percentage;

                      return (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">
                              {item.stage}
                            </span>
                            <span className="text-sm">
                              {formatNumber(item.value)} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                          {index > 0 && (
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <ArrowDownRight className="h-3 w-3 mr-1 text-rose-500" />
                              <span>
                                Drop-off: {dropOff.toFixed(1)}% (
                                {formatNumber(
                                  conversionFunnelData[index - 1].value -
                                    item.value
                                )}{" "}
                                users)
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-emerald-800/5 border-emerald-700/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Conversion Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Add to Cart → Checkout
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {(
                          conversionFunnelData[2].value -
                          conversionFunnelData[3].value
                        ).toLocaleString()}{" "}
                        visitors abandoned their cart. Consider email reminders
                        and checkout optimization.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Checkout → Purchase
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {(
                          conversionFunnelData[3].value -
                          conversionFunnelData[4].value
                        ).toLocaleString()}{" "}
                        visitors left during checkout. Review payment options
                        and simplify the process.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Campaign Performance Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              <div className="h-80 overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%" minWidth={600}>
                  <LineChart
                    data={campaignPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient1"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS[0]}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[0]}
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                      <linearGradient
                        id="lineGradient2"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS[1]}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[1]}
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                      <linearGradient
                        id="lineGradient3"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS[2]}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[2]}
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <Tooltip
                      contentStyle={glassStyle}
                      formatter={(value, name) => {
                        if (name === "convRate" || name === "ctr")
                          return [
                            `${value}%`,
                            name === "convRate"
                              ? "Conversion Rate"
                              : "Click-through Rate",
                          ];
                        if (name === "roas") return [`${value}x`, "ROAS"];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="convRate"
                      name="Conversion Rate"
                      stroke={COLORS[0]}
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                      activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
                      animationDuration={1500}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="ctr"
                      name="Click-through Rate"
                      stroke={COLORS[1]}
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                      activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="roas"
                      name="ROAS"
                      stroke={COLORS[2]}
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                      activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
                      animationDuration={1500}
                      animationBegin={600}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead className="text-right">Impressions</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                      <TableHead className="text-right">CTR</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">Conv. Rate</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">ROAS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignPerformanceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.impressions)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.clicks)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.ctr}%
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(item.conversions)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.convRate}%
                        </TableCell>
                        <TableCell className="text-right">
                          ${formatNumber(item.revenue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.roas}x
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrafficAcquisitionInsights;
