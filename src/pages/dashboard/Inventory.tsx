
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Inventory levels and stock management information will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
