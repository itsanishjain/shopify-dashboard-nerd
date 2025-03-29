
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { salesData } from "@/data/dashboardData";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Sales = () => {
  // Chart config for shadcn/ui chart
  const salesChartConfig = {
    value: {
      label: "Sales",
      theme: { light: "#10b981", dark: "#10b981" }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={salesChartConfig} className="h-full">
                <BarChart data={salesData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Bar
                    dataKey="value"
                    name="value"
                    radius={[4, 4, 0, 0]}
                    className="cursor-pointer"
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sales;
