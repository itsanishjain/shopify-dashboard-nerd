
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {change && (
                <div
                  className={cn(
                    "flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full",
                    isPositive && "bg-success/20 text-success",
                    isNegative && "bg-destructive/20 text-destructive"
                  )}
                >
                  {isPositive && <ArrowUpIcon className="h-3 w-3 mr-0.5" />}
                  {isNegative && <ArrowDownIcon className="h-3 w-3 mr-0.5" />}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
            {changeLabel && (
              <p className="text-xs text-muted-foreground">{changeLabel}</p>
            )}
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
