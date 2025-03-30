
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  ReferenceLine 
} from "recharts";
import { getAppCategoryROI } from "@/data/appEcosystemData";

const AppROICard = () => {
  const data = getAppCategoryROI();

  return (
    <Card className="col-span-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">App Category ROI Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${value}`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "roi") return [`${value}%`, "ROI"];
                  return [`$${value}`, name === "cost" ? "Cost" : "Revenue"];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cost" fill="#F97316" name="Monthly Cost" />
              <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Generated Revenue" />
              <ReferenceLine yAxisId="right" y={0} stroke="#000" />
              <Bar yAxisId="right" dataKey="roi" fill="#8B5CF6" name="ROI %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppROICard;
