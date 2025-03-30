
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCustomersByLocation, getCustomersBySpendBracket, getCustomersByPurchaseFrequency } from "@/data/customerData";

const COLORS = ["#10b981", "#8B5CF6", "#F59E0B", "#EC4899", "#0EA5E9", "#6366F1"];
const RADIAN = Math.PI / 180;

// Custom label renderer for the pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomerSegmentation = () => {
  const locationData = getCustomersByLocation();
  const spendData = getCustomersBySpendBracket();
  const frequencyData = getCustomersByPurchaseFrequency();

  return (
    <Card className="col-span-12 matrix-flow shadow-glow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">Customer Segmentation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="location" className="w-full">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-background/30 rounded-xl mb-4">
            <TabsTrigger 
              value="location" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Location
            </TabsTrigger>
            <TabsTrigger 
              value="spend" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Spending
            </TabsTrigger>
            <TabsTrigger 
              value="frequency" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-glow transition-all duration-300"
            >
              By Purchase Frequency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {locationData.map((entry, index) => (
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
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="spend" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendData.map((entry, index) => (
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
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="frequency" className="h-[300px]">
            <div className="bg-gradient-to-b from-[#10b981]/10 to-[#10b981]/5 border border-border/50 rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={frequencyData}>
                  <PolarGrid className="stroke-border/30" />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                  <Radar 
                    name="Customers" 
                    dataKey="value" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.5} 
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-2 shadow-md">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p className="text-sm">
                              <span className="font-mono">{payload[0].value}</span> customers
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
