
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chart,
  className,
  icon,
}) => {
  return (
    <Card className={cn("analytics-card", className)}>
      <CardHeader className="analytics-card-header">
        <CardTitle className="chart-title">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
        {description && (
          <p className="chart-description">{description}</p>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">{chart}</CardContent>
    </Card>
  );
};

export default ChartCard;
