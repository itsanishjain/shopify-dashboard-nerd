
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppEcosystemCard from "@/components/dashboard/AppEcosystemCard";
import { appEcosystemData } from "@/data/dashboardData";

const Apps = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">App Ecosystem</h1>
        <Card>
          <CardHeader>
            <CardTitle>Integrated Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <AppEcosystemCard apps={appEcosystemData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Apps;
