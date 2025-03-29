
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  className,
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-primary terminal-text">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {change && (
              <div className="flex items-center mt-2">
                <div
                  className={cn(
                    "flex items-center text-xs font-medium",
                    isPositive && "text-success",
                    isNegative && "text-destructive"
                  )}
                >
                  {isPositive && <ArrowUpIcon className="h-3 w-3 mr-1" />}
                  {isNegative && <ArrowDownIcon className="h-3 w-3 mr-1" />}
                  {Math.abs(change)}%
                </div>
                {changeLabel && (
                  <p className="text-xs text-muted-foreground ml-1">{changeLabel}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/60">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
