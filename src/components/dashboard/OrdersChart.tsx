
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

interface OrdersChartProps {
  data: Order[];
}

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("daily");
  const dailyData = getOrderCountsByDay();
  const statusData = getOrderStatusDistribution();

  // Colors for status chart
  const COLORS = ["#f59e0b", "#3b82f6", "#6366f1", "#10b981", "#ef4444"];

  return (
    <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3 bg-[#1f2937] mb-4">
        <TabsTrigger value="daily" className="data-[state=active]:bg-[#111827] data-[state=active]:text-white">Daily Orders</TabsTrigger>
        <TabsTrigger value="trend" className="data-[state=active]:bg-[#111827] data-[state=active]:text-white">Order Trend</TabsTrigger>
        <TabsTrigger value="status" className="data-[state=active]:bg-[#111827] data-[state=active]:text-white">Status Distribution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  borderColor: "#334155",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  color: "white"
                }}
              />
              <Legend wrapperStyle={{ color: "#94a3b8" }} />
              <Bar 
                dataKey="total" 
                name="Total Orders" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="delivered" 
                name="Delivered" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                fillOpacity={0.7}
              />
              <Bar 
                dataKey="processing" 
                name="Processing" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="cancelled" 
                name="Cancelled" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="trend" className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  borderColor: "#334155",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  color: "white"
                }}
              />
              <Legend wrapperStyle={{ color: "#94a3b8" }} />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total Orders" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4, fill: "#10b981", stroke: "#10b981" }}
                activeDot={{ r: 6, fill: "#10b981", stroke: "white" }}
              />
              <Line 
                type="monotone" 
                dataKey="delivered" 
                name="Delivered" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeOpacity={0.7}
                dot={{ r: 3, fill: "#10b981", strokeOpacity: 0.7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="status" className="pt-4">
        <div className="h-[300px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} orders`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  borderColor: "#334155",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  color: "white"
                }}
              />
              <Legend wrapperStyle={{ color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default OrdersChart;
