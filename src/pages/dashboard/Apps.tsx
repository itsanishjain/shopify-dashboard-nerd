
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppCategoryCard from "@/components/dashboard/AppCategoryCard";
import AppROICard from "@/components/dashboard/AppROICard";
import TopAppsTable from "@/components/dashboard/TopAppsTable";
import UtilityAppsCard from "@/components/dashboard/UtilityAppsCard";

const Apps = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">App Ecosystem</h1>
            <p className="text-muted-foreground mt-1">
              Analyze app performance, ROI, and cost-benefit metrics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <AppCategoryCard />
          <AppROICard />
          <TopAppsTable />
          <UtilityAppsCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Apps;
