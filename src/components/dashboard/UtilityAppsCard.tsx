
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUtilityAppSavings } from "@/data/appEcosystemData";
import { ClockIcon, DollarSignIcon } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const UtilityAppsCard = () => {
  const utilityApps = getUtilityAppSavings();
  
  // Calculate totals
  const totalHoursSaved = utilityApps.reduce((sum, app) => sum + app.hoursPerWeek, 0);
  const totalMonthlyCost = utilityApps.reduce((sum, app) => sum + app.monthlyCost, 0);
  const totalMonthlySavings = utilityApps.reduce((sum, app) => sum + app.monthlySavings, 0);
  const overallROI = Math.round((totalMonthlySavings - totalMonthlyCost) / totalMonthlyCost * 100);
  
  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Utility Apps Time Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Saved Weekly</p>
                  <h3 className="text-2xl font-bold">{totalHoursSaved} hours</h3>
                </div>
                <ClockIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(totalMonthlyCost)}</h3>
                </div>
                <DollarSignIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated ROI</p>
                  <h3 className="text-2xl font-bold text-green-600">{overallROI}%</h3>
                </div>
                <DollarSignIcon className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App Name</TableHead>
              <TableHead>Hours Saved/Week</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Estimated Value</TableHead>
              <TableHead>ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilityApps.map((app, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.hoursPerWeek} hours</TableCell>
                <TableCell>{formatCurrency(app.monthlyCost)}</TableCell>
                <TableCell>{formatCurrency(app.monthlySavings)}</TableCell>
                <TableCell className="text-green-600">{app.roi}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UtilityAppsCard;
