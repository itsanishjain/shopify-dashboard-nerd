
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getUserTypeData, getUserTypeRevenue, getUserTypeAOV } from "@/data/customerData";

const CustomerOverviewSection = () => {
  const countData = getUserTypeData();
  const revenueData = getUserTypeRevenue();
  const aovData = getUserTypeAOV();

  const COLORS = ["#10b981", "#6366f1"];

  return (
    <Card className="col-span-12 lg:col-span-6 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">New vs. Returning Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="count" className="w-full">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger 
              value="count" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Customer Count
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="aov" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              Average Order Value
            </TabsTrigger>
          </TabsList>

          <TabsContent value="count" className="h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {countData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-md">
                              <p className="font-medium">{payload[0].name}</p>
                              <p className="text-sm">
                                <span className="font-mono">{payload[0].value}</span> customers 
                                ({payload[0].payload.percentage}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={countData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-md">
                              <p className="font-medium">{payload[0].name}</p>
                              <p className="text-sm">
                                <span className="font-mono">{payload[0].value}</span> customers
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      name="Customers" 
                      fill="url(#customerCountFill)" 
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="customerCountFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.4}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-md">
                            <p className="font-medium">{payload[0].name}</p>
                            <p className="text-sm">
                              <span className="font-mono">${payload[0].value.toLocaleString()}</span> revenue
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Revenue" 
                    fill="url(#revenueGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="aov" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aovData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-md">
                            <p className="font-medium">{payload[0].name}</p>
                            <p className="text-sm">
                              <span className="font-mono">${payload[0].value.toLocaleString()}</span> AOV
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="AOV" 
                    fill="url(#aovGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="aovGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerOverviewSection;
