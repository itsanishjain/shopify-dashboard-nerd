import React from "react";
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
import {
  getOrderCountsByDay,
  getOrderStatusDistribution,
  Order,
} from "@/data/orderData";

interface OrdersChartProps {
  data: Order[];
}

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  const dailyData = getOrderCountsByDay();
  const statusData = getOrderStatusDistribution();

  // Colors for status chart
  const COLORS = ["#f59e0b", "#3b82f6", "#6366f1", "#10b981", "#ef4444"];

  return (
    <div className="w-full">
      <Tabs defaultValue="daily" className="w-full" orientation="horizontal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Orders</TabsTrigger>
          <TabsTrigger value="trend">Order Trend</TabsTrigger>
          <TabsTrigger value="status">Status Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="colorDelivered"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="colorProcessing"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="colorCancelled"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  name="Total Orders"
                  fill="url(#colorTotal)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="delivered"
                  name="Delivered"
                  fill="url(#colorDelivered)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="processing"
                  name="Processing"
                  fill="url(#colorProcessing)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="cancelled"
                  name="Cancelled"
                  fill="url(#colorCancelled)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="trend" className="mt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="colorTotalLine"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient
                    id="colorDeliveredLine"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total Orders"
                  stroke="url(#colorTotalLine)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="delivered"
                  name="Delivered"
                  stroke="url(#colorDeliveredLine)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <div className="h-[300px]">
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
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      stroke="rgba(0, 0, 0, 0.2)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} orders`, "Count"]}
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersChart;
