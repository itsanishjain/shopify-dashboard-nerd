
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Performance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
        <Card>
          <CardHeader>
            <CardTitle>Business Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Key performance indicators and business metrics will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
