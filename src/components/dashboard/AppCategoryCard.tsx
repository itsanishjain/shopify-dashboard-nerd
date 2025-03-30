
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { getAppCategories } from "@/data/appEcosystemData";

const AppCategoryCard = () => {
  const categories = getAppCategories();
  
  const costData = categories.map(cat => ({
    name: cat.name,
    value: cat.totalCost
  }));
  
  const countData = categories.map(cat => ({
    name: cat.name,
    value: cat.count
  }));

  const colors = [
    "#8B5CF6", // Purple
    "#D946EF", // Pink
    "#F97316", // Orange
    "#0EA5E9", // Blue
    "#10B981", // Green
    "#6366F1"  // Indigo
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">App Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cost">
          <TabsList className="mb-4">
            <TabsTrigger value="cost">Monthly Cost</TabsTrigger>
            <TabsTrigger value="count">App Count</TabsTrigger>
          </TabsList>
          <TabsContent value="cost">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Monthly Cost']}
                    labelFormatter={(label) => `${label} Apps`}
                  />
                  <Bar dataKey="value" fill="#8B5CF6">
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="count">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0EA5E9">
                    {countData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppCategoryCard;
