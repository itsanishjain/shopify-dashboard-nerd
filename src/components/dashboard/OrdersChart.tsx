
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrderCountsByDay, getOrderStatusDistribution, Order } from "@/data/orderData";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface OrdersChartProps {
  data: Order[];
}

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("daily");
  const dailyData = getOrderCountsByDay();
  const statusData = getOrderStatusDistribution();

  // Chart configs for shadcn/ui charts
  const orderChartConfig = {
    total: {
      label: "Total Orders",
      theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" }
    },
    delivered: {
      label: "Delivered",
      theme: { light: "#10b981", dark: "#10b981" }
    },
    processing: {
      label: "Processing",
      theme: { light: "#3b82f6", dark: "#3b82f6" }
    },
    cancelled: {
      label: "Cancelled",
      theme: { light: "#ef4444", dark: "#ef4444" }
    }
  };

  // Colors for status chart
  const COLORS = ["#f59e0b", "#3b82f6", "#6366f1", "#10b981", "#ef4444"];

  return (
    <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">Daily Orders</TabsTrigger>
        <TabsTrigger value="trend">Order Trend</TabsTrigger>
        <TabsTrigger value="status">Status Distribution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="pt-4">
        <div className="h-[300px] w-full">
          <ChartContainer config={orderChartConfig} className="h-full">
            <BarChart
              data={dailyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
              <Bar 
                dataKey="total" 
                name="total" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="delivered" 
                name="delivered" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="processing" 
                name="processing"  
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="cancelled" 
                name="cancelled" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="trend" className="pt-4">
        <div className="h-[300px] w-full">
          <ChartContainer config={orderChartConfig} className="h-full">
            <LineChart
              data={dailyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
              <Line 
                type="monotone" 
                dataKey="total" 
                name="total" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="delivered" 
                name="delivered" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="status" className="pt-4">
        <div className="h-[300px] w-full flex items-center justify-center">
          <ChartContainer config={statusData.reduce((config, item, index) => {
            config[item.name] = {
              label: item.name,
              theme: { light: COLORS[index % COLORS.length], dark: COLORS[index % COLORS.length] }
            };
            return config;
          }, {})} className="h-full">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </PieChart>
          </ChartContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default OrdersChart;
