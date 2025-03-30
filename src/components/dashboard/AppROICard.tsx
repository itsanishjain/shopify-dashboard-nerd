
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
import { cn } from "@/lib/utils";

const AppROICard = () => {
  const data = getAppCategoryROI();

  return (
    <Card className="col-span-8 matrix-flow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold terminal-text">App Category ROI Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                tickFormatter={(value) => `$${value}`}
                axisLine={{ stroke: 'rgba(16, 185, 129, 0.2)' }}
                tick={{ fill: 'var(--foreground)' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => `${value}%`}
                axisLine={{ stroke: 'rgba(16, 185, 129, 0.2)' }}
                tick={{ fill: 'var(--foreground)' }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "roi") return [`${value}%`, "ROI"];
                  return [`$${value}`, name === "cost" ? "Cost" : "Revenue"];
                }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend wrapperStyle={{ opacity: 0.8 }} />
              <ReferenceLine yAxisId="right" y={0} stroke="rgba(16, 185, 129, 0.3)" />
              <Bar 
                yAxisId="left" 
                dataKey="cost" 
                fill="rgba(249, 115, 22, 0.7)" 
                name="Monthly Cost"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="left" 
                dataKey="revenue" 
                fill="rgba(16, 185, 129, 0.7)" 
                name="Generated Revenue"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="roi" 
                fill="rgba(139, 92, 246, 0.7)" 
                name="ROI %"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppROICard;
