
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { revenueData } from "@/data/dashboardData";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const Revenue = () => {
  // Chart config for shadcn/ui chart
  const revenueChartConfig = {
    revenue: {
      label: "Revenue",
      theme: { light: "#10b981", dark: "#10b981" }
    },
    expenses: {
      label: "Expenses",
      theme: { light: "#ef4444", dark: "#ef4444" }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={revenueChartConfig} className="h-full">
                <AreaChart data={revenueData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartLegend>
                    <ChartLegendContent />
                  </ChartLegend>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="revenue"
                    fillOpacity={1}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="expenses"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
